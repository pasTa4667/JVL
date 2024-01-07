import { useEffect, useState } from "react";
import { KanjiData } from "../logic/ReadJson";
import "../media/SelectionPage.css";
import { GradeProgressBarKanji } from "../elements/ProgressBars";
import { KanjiGrades, KanjiLevelProgress } from "../utility/types";
import { isReviewTimeReached } from "../utility/utility";

interface KanjiProps {
  kanjis: KanjiData[];
  progress: KanjiLevelProgress | null;
  onClick: (kanji: KanjiData) => void;
}


function DisplayAllKanjis(props: KanjiProps) {
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

export default DisplayAllKanjis;


interface ReviewKanjiProps {
  progressArray: (KanjiLevelProgress | null)[];
}

export function DisplayReviewKanjis(props: ReviewKanjiProps) {
  const [grades, setGrades] = useState<KanjiGrades[]>([]);

  useEffect(() => {
    if (props.progressArray) {
      const grades: KanjiGrades[] = [];

      props.progressArray.forEach((progress) => {
        if(progress) {
          for (let character in progress) {
            grades.push(progress[character].kanjiGrade);
          }
        }
      });

      setGrades(grades);
    } else {
      setGrades([]);
    }
  }, [props.progressArray]);

  function fillElements() {
    const elements: JSX.Element[] = [];
    let index = 0;

    props.progressArray.forEach((progress) => {
      if(progress) {
        for (let character in progress) {
          if(isReviewTimeReached(progress[character].reviewTime)) {
            elements.push(
              <div>
                <div key={index++} className={"kanji"}>
                  {character}
                </div>
                <GradeProgressBarKanji
                  grade={grades[index++] ?? KanjiGrades.Unknown}
                />
              </div>
            );
          }
        }
      }
    });

    return elements;

  }

  return <div className="kanji-container-2">{fillElements()}</div>;
}
