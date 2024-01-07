import { useEffect, useRef, useState } from 'react';
import '../media/MainPage.css';
import KanjiProvider from '../logic/KanjiProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import DataBaseService from "../firebase/database";
import { KanjiGrades, downGrade, upGrade } from '../utility/types';
import { useUser } from '../elements/UserProvider';
import { KanjiData } from '../logic/ReadJson';
import { NextButton, PeekButton } from '../elements/Buttons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

function MainPage() {
  const selectionType = 'KanToEn'; // standart type might change
  const [currentWord, setCurrentWord] = useState(['']);
  const [currentInput, setCurrentInput] = useState(''); //aka answer
  const [inputClassName, setInputClassName] = useState('vocab-input');
  const [label, setLabel] = useState('');
  const [isAnswerWrong, setIsAnswerWrong] = useState(false);
  const [kanjiCounter, setKanjiCounter] = useState(0);
  
  const location = useLocation();
  const navigate = useNavigate();
  
  const [kanjiGradeMap, setKanjiGradeMap] = useState<Map<KanjiData, KanjiGrades>>(new Map());

  const { userId } = useUser();
  
  const kanjiProviderRef = useRef<KanjiProvider | null>(null);

  const init =() => {
    setKanjiGradeMap(location.state?.kanjiGradeMap || new Map());
    const kanjis = Array.from(kanjiGradeMap.keys());
  
    if(!kanjiProviderRef.current) {
      kanjiProviderRef.current = new KanjiProvider(kanjis, selectionType);
    }else {
      kanjiProviderRef.current.setKanji(kanjis);
      kanjiProviderRef.current.setSelectionType(selectionType);
    }
  
    const { prompt, label } = kanjiProviderRef.current.getNextPrompt();
    setCurrentWord(prompt);
    setLabel(label);
    setIsAnswerWrong(false);
  };
  
  useEffect(() => {
    init();
  }, [kanjiGradeMap]);


  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>){
    if(e.key === 'Enter') {
      const providerRef = kanjiProviderRef.current;
      if(!providerRef) return;
      if(providerRef.isTranslationCorrect(currentInput)) {
        handleCorrectAnswer(providerRef);
      } else {
        handleWrongAnswer(providerRef);
      }
    }
  }

  function handleCorrectAnswer(providerRef: KanjiProvider) {
    // current kanji correct
    if(!providerRef.isCurrentInNotKnownList()) {
      providerRef.addCurrentToKnownList();
      const current = providerRef.getCurrentKanji()!;

      // udpate map making it easier for the overview page
      kanjiGradeMap.set(current, upGrade(kanjiGradeMap.get(current)!));

      if (userId){
        // udpate database immediately, in case user disonnects
        DataBaseService.saveUserKanjiGrade(
          userId,
          current.wk_level,
          current.character,
          kanjiGradeMap.get(current)!
          ).catch((error) => {
            console.log(error);
          });
      }
      
    }
    // get next kanji
    const { prompt, label } = providerRef!.getNextPrompt();
    setKanjiCounter(kanjiCounter + 1);

    //finished with the lesson
    if (prompt.length === 0) {
      navigate("main/overview", {state: { kanjiGradeMap: kanjiGradeMap, correctKanjis: providerRef.getKnownList(), wrongKanjis: providerRef.getNotKnownList() }} );
    }

    setCurrentInput("");
    setIsAnswerWrong(false);
    setCurrentWord(prompt);
    setLabel(label);
  }

  function handleWrongAnswer(providerRef: KanjiProvider) {
    // trigger the invalid animation
    setInputClassName("vocab-input-invalid");
    // reset the animation after a short delay
    setTimeout(() => {
      setInputClassName("vocab-input");
    }, 300);
    // make peek answer button appear
    setIsAnswerWrong(true);

    providerRef.addCurrentToNotKnownList();
    providerRef.addCurrentToKanjiList();

    const current = providerRef.getCurrentKanji()!;

    // udpate map making it easier for the overview page
    kanjiGradeMap.set(current, downGrade(kanjiGradeMap.get(current)!));

    if (!userId) return;
    // udpate immediately, in case the user disconnects 
    DataBaseService.saveUserKanjiGrade(
      userId,
      current.wk_level,
      current.character,
      kanjiGradeMap.get(current)!
    ).catch((error) => {
      console.log(error);
    });
  }

  function handlePeekAnswer() {
    let answer = kanjiProviderRef.current?.getCurrentAnswer();
    if(answer && answer[0]){
      setCurrentInput(answer[0]);
    }
  }

  function handleSkip() {
    const { prompt, label } = kanjiProviderRef.current!.skipAndGetNext();
    setCurrentInput("");
    setIsAnswerWrong(false);
    setCurrentWord(prompt);
    setLabel(label);
  }

  function displayOtherMeanings(){
    return currentWord.length > 1 ? currentWord.slice(1).join(', ') : '';
  }

  return (
    <div className="main-page">
      <div className="header-counter">
        {kanjiCounter + '/' + kanjiGradeMap.size}
      </div>
      <div className="vocab-field">
        <header>{currentWord[0]}</header>
      </div>
      <div className="meanings-field">
        {displayOtherMeanings()}
      </div>
      <div className="answer-area">
        {!isAnswerWrong ? <div/> : <PeekButton onClick={handlePeekAnswer}>?</PeekButton>}
        <input className={inputClassName} type='text' maxLength={30} placeholder={'answer'} value={currentInput} autoFocus={true} onKeyDown={handleKeyDown} onChange={(e) => setCurrentInput(e.target.value)}/>
        {kanjiCounter < kanjiGradeMap.size ? <NextButton onClick={handleSkip}><FontAwesomeIcon icon={faChevronRight}/></NextButton> : <div/>}
      </div>
      <div className="label-field">
        Translate to {label}
      </div>
      <div className="foot-container"/>
    </div>
  );
}

export default MainPage;