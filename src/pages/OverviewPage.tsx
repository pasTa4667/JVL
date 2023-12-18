import { useLocation, useNavigate } from "react-router-dom";
import { KanjiData } from "../logic/ReadJson";
import { useEffect, useState } from "react";
import { KanjiGrades } from "../utility/types";
import "../media/OverviewPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesDown, faAnglesUp, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@mui/material";

function OverviewPage (){
    const location = useLocation();
    const navigate = useNavigate();

    const [kanjiGradeMap, setKanjiGradeMap] = useState<Map<KanjiData, KanjiGrades>>(new Map());

    let notKnownList: KanjiData[] = [];
    let knownList: KanjiData[] = [];

    useEffect(() => {
        setKanjiGradeMap(location.state?.kanjiGradeMap || new Map());
        notKnownList = location.state?.wrongKanji || [];
        knownList = location.state?.correctKanji || [];

    }, [kanjiGradeMap]);

    const renderKanjis = (grade: string) => {
      const elements: JSX.Element[] = [];

      const test = [];
      let i = 0;
      while (i < 20) {
        test.push(i++);
      }

      // kanjiGradeMap.forEach((kanjiGrade, kanji) => {
      //     if(grade === kanjiGrade){
      //         if(notKnownList.includes(kanji)){
      //             elements.push(
      //               <div className="kanji-wrong">
      //                 {kanji.character}{"\u00A0"}
      //                 <FontAwesomeIcon icon={faAnglesUp} color="green" />
      //               </div>
      //             );
      //         } else {
      //             elements.push(
      //               <div className="kanji-correct">
      //                 {kanji.character}{"\u00A0"}
      //                 <FontAwesomeIcon icon={faAnglesDown} color="darkRed" />
      //               </div>
      //             );
      //         }
      //     }
      // });

      test.forEach((i) => {
        if (i % 2 === 0) {
          elements.push(
            <div className="kanji-wrong">
              {i}
              {"\u00A0"}
              <FontAwesomeIcon icon={faAnglesUp} color="green" />
            </div>
          );
        } else {
          elements.push(
            <div className="kanji-correct">
              {i}
              {"\u00A0"}
              <FontAwesomeIcon icon={faAnglesDown} color="darkRed" />
            </div>
          );
        }
      });

      return <div className="grade-kanji-container">{elements}</div>;
    }

    const renderGrades = () => {
        const elements: JSX.Element[] = [];

        for (const grade of Object.values(KanjiGrades)) {
            elements.unshift(
              <div className="grade-section">
                <div className="grade-section-header">
                  <div className="header-title">{grade}</div>
                </div>
                {renderKanjis(grade)}
              </div>
            );
        }

        function handleNextClick(): void {
            navigate("/");
        }

        return (
          <div className="overview-page">
            {elements}
            <Button sx={{width: 50, height: 60, alignSelf: "center", borderRadius: 20}} variant="contained" color="secondary" onClick={handleNextClick}>
              {" "}
              <FontAwesomeIcon icon={faChevronRight} fontSize="20"/>
            </Button>
          </div>
        );
    }

    return (
        renderGrades()
    );
}

export default OverviewPage;