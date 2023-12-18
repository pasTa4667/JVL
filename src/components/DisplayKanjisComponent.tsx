import { useEffect, useState } from "react";
import { KanjiData } from "../logic/ReadJson";
import "../media/SelectionPage.css";
import { GradeProgressBarKanji } from "../elements/ProgressBar";
import { KanjiGrades, KanjiLevelProgress } from "../utility/types";

interface KanjiProps {
  kanjis: KanjiData[];
  progress: KanjiLevelProgress | undefined;
  onClick: (kanji: KanjiData) => void;
}


function DisplayKanjis(props: KanjiProps) {
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const [grades, setGrades] = useState<KanjiGrades[]>([]);

  const handleClick = (index: number) => {
    // Set the clicked index in the state
    props.onClick(props.kanjis[index]);
    setClickedIndex(index);
  };

  useEffect(() => {
    if(props.progress) {
      const grades = [];
      for(let character in props.progress){
        grades.push(props.progress[character].kanjiGrade);
      }
      setGrades(grades);
    } else {
      setGrades([]);
    }
  },[props.progress]);

  const elements = props.kanjis.map((kanji, index) => (
    <div>
      <div
        key={index}
        className={`kanji ${clickedIndex === index ? "clicked" : ""}`}
        onClick={() => handleClick(index)}
      >
        {kanji.character}
      </div>
      <GradeProgressBarKanji grade={grades[index] ?? KanjiGrades.Unknown}/>
    </div>
  ));

  return <div className="kanji-container">{elements}</div>;
}

export default DisplayKanjis; 