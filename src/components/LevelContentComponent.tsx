import { useEffect, useState } from "react";
import ReadJson, { KanjiData } from "../logic/ReadJson";
import { LinearProgressWithLabel } from "../elements/ProgressBars";
import { useNavigate } from "react-router-dom";
import DisplayAllKanjis from "./DisplayKanjisComponent";
import "../media/MainPage.css";
import KanjiInfo from "./KanjiInfoComponent";
import { useUser } from "../elements/UserProvider";
import { KanjiGrades, KanjiLevelProgress, gradeAsNumber } from "../utility/types";
import { isReviewTimeReached, calculateLevelProgress } from "../utility/utility";
import { StartButton } from "../elements/Buttons";
import DataBaseService from "../firebase/database";

interface LevelContentProps {
  level: number;
  userLevelProgress: KanjiLevelProgress | null;
}

function LevelContent(props: LevelContentProps) {
  const [kanjis, setKanjis] = useState<KanjiData[]>([]);
  const [selectedKanji, setSelectedKanji] = useState<KanjiData | null>(null);
  const navigate = useNavigate();

  const { userId } = useUser();
  
  async function fetchKanji(level: number, shuffle: boolean) {
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
    fetchKanji(props.level, false);
  }, [props.level]);
  

  function handleStartReview() {
    const kanjiGradeMap: Map<KanjiData, KanjiGrades> = new Map();

    if (!props.userLevelProgress) {
      return;
    }

    let index = 0;
    for(let kanji in props.userLevelProgress) {
      kanjiGradeMap.set(kanjis[index++], props.userLevelProgress[kanji].kanjiGrade);
    }

    navigate(`/main`, { state: { kanjiGradeMap: kanjiGradeMap } });
  }

  function handleStartLevel() {
    //to make it easier later on we create a map
    const kanjiGradeMap = new Map();
    kanjis.forEach((kanji) => {
      kanjiGradeMap.set(kanji, KanjiGrades.Unknown);
    });
    navigate(`/main`, { state: { kanjiGradeMap: kanjiGradeMap } });
  }

  function handleKanjiClick(kanji: KanjiData): void {
    setSelectedKanji(kanji);
  }

  return (
    <section className="level-content-container">
      <LinearProgressWithLabel value={calculateLevelProgress(props.userLevelProgress)} level={props.level} />
      <div className="start-button-container">
        {userId ? 
        <StartButton onClick={handleStartReview}>
          Start Level Review
        </StartButton>
        : <></>}
        <StartButton onClick={handleStartLevel}>
          Start Level Training
        </StartButton>
      </div>
      <DisplayAllKanjis
        kanjis={kanjis}
        progress={props.userLevelProgress}
        onClick={handleKanjiClick}
      />
      {selectedKanji ? (
        <KanjiInfo kanji={selectedKanji} progress={props.userLevelProgress} />
      ) : (
        <></>
      )}
    </section>
  );
}
  
export default LevelContent;