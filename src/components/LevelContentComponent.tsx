import { useEffect, useState } from "react";
import ReadJson, { KanjiData } from "../logic/ReadJson";
import { LinearProgressWithLabel } from "../elements/ProgressBars";
import { useNavigate } from "react-router-dom";
import DataBaseService from '../firebase/database';
import DisplayKanjis from "./DisplayKanjisComponent";
import "../media/MainPage.css";
import KanjiInfo from "./KanjiInfoComponent";
import { useUser } from "../elements/UserProvider";
import { KanjiGrades, KanjiLevelProgress, gradeAsNumber } from "../utility/types";
import { isReviewTimeReached } from "../utility/utility";
import { StartButton } from "../elements/Buttons";

interface LevelContentProps {
  key: number;
  level: number;
}


function LevelContent(props: LevelContentProps) {
  const [kanjis, setKanjis] = useState<KanjiData[]>([]);
  const [userLevelProgress, setUserProgress] = useState<KanjiLevelProgress>();
  const [selectedKanji, setSelectedKanji] = useState<KanjiData | null>(null);
  const navigate = useNavigate();

  const { userId } = useUser();
  
  async function fetchData(level: number, shuffle: boolean) {
    try {
      const kanjiData = await ReadJson.getKanjiLevel(level, shuffle);
      if (kanjiData.length > 0) {
          setKanjis(kanjiData);
          console.log("added kanji");
      }
    } catch (error) {
      console.error("Error fetching kanji:", error);
    }
  }
  
  useEffect(() => {
    fetchData(props.level, false);
  }, [props.level]);

  useEffect(() => {
    if(!userId) return;
    const fetchData = async () => {
      try {
        const userLevelData = await DataBaseService.getUserLevelProgress(
          userId,
          props.level
        );
        setUserProgress(userLevelData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 5000);
    return () => clearInterval(intervalId);
  }, [userId, props.level]);


  function handleStartReview() {
    const kanjiGradeMap: Map<KanjiData, KanjiGrades> = new Map();

    for(let i = 0; i < kanjis.length; i++){
      const current = kanjis[i];
      if(isReviewTimeReached(userLevelProgress![current.character].reviewTime)) {
        kanjiGradeMap.set(current, userLevelProgress![current.character].kanjiGrade);
      }
    }

    navigate(`/main`, { state: { kanjiGradeMap: kanjiGradeMap, level: props.level } });
  }

  function handleStartLevel() {
    //to make it easier later on we create a map
    const kanjiGradeMap = new Map();
    kanjis.forEach((kanji) => {
      kanjiGradeMap.set(kanji, KanjiGrades.Unknown);
    });
    navigate(`/main`, { state: { kanjiGradeMap: kanjiGradeMap, level: props.level } });
  }

  function handleKanjiClick(kanji: KanjiData): void {
    setSelectedKanji(kanji);
  }

  function calculateLevelProgress(){
    if(!userLevelProgress){
      return 0;
    }
    const amount = 100 / (5 * kanjis.length);

    let percent = 0; 

    kanjis.forEach((kanji) => {
      percent += gradeAsNumber(userLevelProgress[kanji.character].kanjiGrade) * amount;
    });

    return percent;
  }

  return (
    <div className="level-content-container">
      <div style={{ width: "100%" }}>
        <LinearProgressWithLabel value={calculateLevelProgress()} />
      </div>
      <div className="start-button-container">
        <StartButton onClick={handleStartReview}>
          Start Review
        </StartButton>
        <StartButton onClick={handleStartLevel}>
          Start Level Training
        </StartButton>
      </div>
      <DisplayKanjis kanjis={kanjis} progress={userLevelProgress} onClick={handleKanjiClick} />
      {selectedKanji ? <KanjiInfo kanji={selectedKanji} progress={userLevelProgress}/> : <></>}
    </div>
  );
}
  
export default LevelContent;