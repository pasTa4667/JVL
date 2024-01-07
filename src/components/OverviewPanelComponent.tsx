import { useEffect, useState } from "react";
import { StartReviewButton } from "../elements/Buttons";
import { KanjiGrades, KanjiLevelProgress } from "../utility/types";
import { DisplayReviewKanjis } from "./DisplayKanjisComponent";
import { KanjiData } from "../logic/ReadJson";
import DataBaseService from "../firebase/database";
import { useNavigate } from "react-router-dom";
import { useUser } from "../elements/UserProvider";

interface OverviewPanelProps {
  userLevelProgress: (KanjiLevelProgress | null)[];
}

function OverviewPanel(props: OverviewPanelProps) {
    const [iconClicked, setIconClicked] = useState(false);
    const [reviewKanjiData, setReviewKanjiData] = useState<KanjiData[]>([]);

    const navigate = useNavigate();

    function handleStartReviewClick() {
      const kanjiGradeMap: Map<KanjiData, KanjiGrades> = new Map();
      if (!props.userLevelProgress) {
        return;
      }

      let index = 0;
      props.userLevelProgress.forEach((progress) => {
        if(progress) {
          for(let kanji in progress) {
            kanjiGradeMap.set(reviewKanjiData[index++], progress[kanji].kanjiGrade);
          }
        }
      });

      navigate(`/main`, {
        state: { kanjiGradeMap: kanjiGradeMap },
      });
    }

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

    return (
        <div className="overview-container">
            <div className="review-container">
                <StartReviewButton onClick={handleStartReviewClick} value={`Start Review With ${reviewKanjiData.length} Kanji`} onIconClick={() => setIconClicked(!iconClicked)}/>
                {iconClicked && props.userLevelProgress 
                ? <DisplayReviewKanjis progressArray={props.userLevelProgress}/>
                : <></>}
            </div>
        </div>
    );
}

export default OverviewPanel;
