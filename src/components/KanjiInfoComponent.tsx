import { useEffect, useState } from "react";
import { KanjiData } from "../logic/ReadJson";
import { KanjiGrades, KanjiLevelProgress } from "../utility/types";
import { convertTimestampToReadableTime } from "../utility/utility";

interface InfoProps {
  kanji: KanjiData;
  progress: KanjiLevelProgress | null;
}

function KanjiInfo(props: InfoProps) {
  let kanji = props.kanji;
  const [infoText, setInfoText] = useState<JSX.Element>();
  const [activeButton, setActiveButton] = useState(0);

  useEffect(() => {
    handleShowInfoText(activeButton);
    kanji = props.kanji;
  }, [props.kanji]);


  function handleShowInfoText(buttonNumber: number) {
    setActiveButton(buttonNumber);
    switch (buttonNumber) {
      case 0:
        setInfoText(formatRegularInfo(kanji));
        return;
      case 1:
        setInfoText(formatWanikaniInfo(kanji));
        return;
      case 2:
        // only clickable when there is actually progress, threrefore !
        setInfoText(formatStats(props.progress![kanji.character]));
        return;
      default:
        setInfoText(<div>Something went wrong there!</div>);
        return;
    }
  }

  return (
    <div style={{ display: "flex", gap: "0px", flexDirection: "column" }}>
      <div className="info-header">
        <button
          className={"info-button " + (activeButton === 0 ? "active" : "")}
          onClick={() => handleShowInfoText(0)}
        >
          Regular
        </button>
        <button
          className={"info-button " + (activeButton === 1 ? "active" : "")}
          onClick={() => handleShowInfoText(1)}
        >
          Wanikani
        </button>
        {props.progress ? 
        <button
          className={"info-button " + (activeButton === 2 ? "active" : "")}
          onClick={() => handleShowInfoText(2)}
        >
          Stats
        </button> 
        : <></>}
      </div>
      {infoText}
    </div>
  );
}

export default KanjiInfo;


function formatRegularInfo(kanji: KanjiData) {

  return (
    <div className="kanji-info-container">
      <div className="info-description">
        <p title="Refers to the number of Strokes needed to write this Kanji">
          Strokes:
        </p>
        <p title="Grade level at which this Kanji is taught in the Japanese Education System">
          Grade:
        </p>
        <p title="How often this Kanji appears in written text">
          Frequency:
        </p>
        <p title="New Japanese Language Proficiency Test Level (Lower = Harder)">
          JLPT New:
        </p>
        <p title="Old Japanese Language Proficiency Test Level (Lower = Harder)">
          JLPT Old:
        </p>
        <p>Meaning(s):</p>
        <p>Reading(s) Kun:</p>
        <p>Reading(s) On:</p>
      </div>
      <div className="info-content">
        <p>{kanji.strokes}</p>
        <p>{kanji.grade}</p>
        <p>{kanji.freq}</p>
        <p>{kanji.jlpt_new}</p>
        <p>{kanji.jlpt_old}</p>
        <p>{kanji.meanings.join(", ")}</p>
        <p>{kanji.readings_kun.join(", ")}</p>
        <p>{kanji.readings_on.join(", ")}</p>
      </div>
    </div>
  );
}

function formatWanikaniInfo(kanji: KanjiData) {
  return (
    <div className="kanji-info-container">
      <div className="info-description">
        <p>Level:</p>
        <p>Radicals:</p>
        <p>Meaning(s):</p>
        <p>Reading(s) Kun:</p>
        <p>Reading(s) On:</p>
      </div>
      <div className="info-content">
        <p>{kanji.wk_level}</p>
        <p>{kanji.wk_radicals.join(', ')}</p>
        <p>{kanji.wk_meanings.join(', ')}</p>
        <p>{kanji.wk_readings_kun.join(", ")}</p>
        <p>{kanji.wk_readings_on.join(", ")}</p>
      </div>
    </div>
  );
}

function formatStats(progress: { kanjiGrade: KanjiGrades, 
                                 reviewTime: number, 
                                 correctCount?: number, 
                                 wrongCount?: number }) {
  return (
    <div className="kanji-info-container">
      <div className="info-description">
        <p>Next Review In:</p>
        <p>Current Grade:</p>
        <p>Times Correctly Translated:</p>
        <p>Times Not Correctly Translated:</p>
      </div>
      <div className="info-content">
        <p>{convertTimestampToReadableTime(progress.reviewTime)}</p>
        <p>{progress.kanjiGrade}</p>
        <p>{progress.correctCount ?? "No Data yet"}</p>
        <p>{progress.wrongCount ?? "No Data yet"}</p>
      </div>
    </div>
  );
}

