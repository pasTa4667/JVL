import { useEffect, useState } from "react";
import { StartButton, StartReviewButton } from "../elements/Buttons";
import { KanjiGrades, KanjiLevelProgress } from "../utility/types";
import { DisplayReviewKanjis } from "./DisplayKanjisComponent";
import { KanjiData } from "../logic/ReadJson";
import DataBaseService from "../firebase/database";
import { useNavigate } from "react-router-dom";
import { useUser } from "../elements/UserProvider";

interface OverviewPanelProps {
  userLevelProgress: (KanjiLevelProgress | null)[];
  onLevelClick: (level: number) => void;
}

function OverviewPanel(props: OverviewPanelProps) {
  const [iconClicked, setIconClicked] = useState(false);
  const [reviewKanjiData, setReviewKanjiData] = useState<KanjiData[]>([]);

  const { userId } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    if(!props.userLevelProgress) {
      setReviewKanjiData([]);
      return;
    }

    const fetchKanjiData = async () => {
      const data: KanjiData[] = [];
      try {
        await Promise.all(
          props.userLevelProgress.map(async (progress) => {
            for (let kanji in progress) {
              data.push(await DataBaseService.getKanjiData(kanji));
            }
          })
        );
        setReviewKanjiData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchKanjiData();
  }, [props.userLevelProgress]);

  function handleStartReviewClick() {
    const kanjiGradeMap: Map<KanjiData, KanjiGrades> = new Map();
    if (!props.userLevelProgress) {
      return;
    }

    let index = 0;
    props.userLevelProgress.forEach((progress) => {
      if (progress) {
        for (let kanji in progress) {
          kanjiGradeMap.set(
            reviewKanjiData[index++],
            progress[kanji].kanjiGrade
          );
        }
      }
    });

    navigate(`/main`, {
      state: { kanjiGradeMap: kanjiGradeMap },
    });
  }

  const addPossibleLevel = () => {
    let level = 1;
    if(props.userLevelProgress && userId) {
      level = props.userLevelProgress.findIndex((progress) => progress === null) + 1;
    }

    return (
      <div style={{ display: "flex", width: "100%"}}>
        <StartButton onClick={() => props.onLevelClick(level)}> Level {level}</StartButton>
      </div>
    );
  }

  return (
    <div className="overview-container">
        <div className="review-container">
          {userId
          ? <StartReviewButton onClick={handleStartReviewClick} value={`Start Review With ${reviewKanjiData.length} Kanji`} onIconClick={() => setIconClicked(!iconClicked)}/>
          : <></>}
          {iconClicked && userId
          ? <DisplayReviewKanjis progressArray={props.userLevelProgress}/>
          : <></>}
          <div className="suggested-label"> Suggested Next Level </div>
          {addPossibleLevel()}
        </div>
    </div>
  );
}

export default OverviewPanel;
