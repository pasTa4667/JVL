import { KanjiData } from "./ReadJson";

/**
 * Class in charge of managing the kanji and their answers. 
 */

export default class KanjiProvider {
  private kanjiList;
  private notKnownKanjiList: KanjiData[] = [];
  private knownKanjiList: KanjiData[] = [];
  private currentKanji: KanjiData | undefined;
  private selectionType;
  // even if there is just one answer, we work with arrays
  private currentAnswer: string[] = [];

  constructor(kanjiList: KanjiData[], selectionType: string) {
    this.kanjiList = kanjiList;
    this.currentKanji = kanjiList[0];
    this.selectionType = selectionType;
  }

  public getNextPrompt() {
    this.currentKanji = this.kanjiList.shift();

    if (!this.currentKanji) {
      return { prompt: [], label: "" };
    }

    let tempType;

    if (this.selectionType === "Mix") {
      const randomCase = Math.floor(Math.random() * 4) + 1;
      switch (randomCase) {
        case 1:
          tempType = "EnToOn";
          break;
        case 2:
          tempType = "EnToKun";
          break;
        case 3:
          tempType = "KunToEn";
          break;
        case 4:
          tempType = "OnToEn";
          break;
        case 5:
          tempType = "KanToEn";
          break;
        case 6:
          tempType = "KanToOn";
          break;
        case 7:
          tempType = "KanToKun";
          break;
      }
    }

    switch (!tempType ? this.selectionType : tempType) {
      case "EnToOn":
        this.currentAnswer = this.removeExcessChars(
          this.currentKanji.wk_readings_on
        );
        return {
          prompt: this.removeExcessChars(this.currentKanji.wk_meanings),
          label: "On",
        };

      case "EnToKun":
        this.currentAnswer = this.removeExcessChars(
          this.currentKanji.wk_readings_kun
        );
        return {
          prompt: this.removeExcessChars(this.currentKanji.wk_meanings),
          label: "Kun",
        };

      case "KunToEn":
        this.currentAnswer = this.removeExcessChars(
          this.currentKanji.wk_meanings
        );
        return {
          prompt: this.removeExcessChars(this.currentKanji.wk_readings_kun),
          label: "English",
        };

      case "OnToEn":
        this.currentAnswer = this.removeExcessChars(
          this.currentKanji.wk_meanings
        );
        return {
          prompt: this.removeExcessChars(this.currentKanji.wk_readings_on),
          label: "English",
        };

      case "KanToEn":
        this.currentAnswer = this.removeExcessChars(
          this.currentKanji.wk_meanings
        );
        return {
          prompt: this.removeExcessChars([this.currentKanji.character]),
          label: "English",
        };

      case "KanToOn":
        this.currentAnswer = this.removeExcessChars(
          this.currentKanji.wk_readings_on
        );
        return {
          prompt: this.removeExcessChars([this.currentKanji.character]),
          label: "On",
        };

      case "KanToKun":
        this.currentAnswer = this.removeExcessChars(
          this.currentKanji.wk_readings_kun
        );
        return {
          prompt: this.removeExcessChars([this.currentKanji.character]),
          label: "Kun",
        };

      default:
        return { prompt: [], label: "" };
    }
  }

  /**
   * Shouldnt be used, use getCurrentKanji() instead.
   */
  public getNextKanji() {
    this.currentKanji = this.kanjiList.shift();
    if (!this.currentKanji) {
      return [];
    }
    return this.currentKanji;
  }

  public getCurrentKanji() {
    return this.currentKanji;
  }

  public addToKanjiList(kanji: KanjiData) {
    this.kanjiList.push(kanji);
  }

  public addCurrentToKanjiList() {
    if (this.currentKanji && !this.kanjiList.includes(this.currentKanji)) {
      this.kanjiList.push(this.currentKanji);
    }
  }

  public addToKnownList(kanji: KanjiData) {
    this.knownKanjiList.push(kanji);
  }

  public addCurrentToKnownList() {
    if (this.currentKanji) {
      this.knownKanjiList.push(this.currentKanji);
    }
  }

  public addToNotKnownList(kanji: KanjiData) {
    this.notKnownKanjiList.push(kanji);
  }

  public addCurrentToNotKnownList() {
    if (this.currentKanji && !this.notKnownKanjiList.includes(this.currentKanji)) {
      this.notKnownKanjiList.push(this.currentKanji);
    }
  }

  public isCurrentInNotKnownList(){
    if (this.currentKanji) {
      return this.notKnownKanjiList.includes(this.currentKanji);
    }
    return false;
  }

  public getNotKnownList() {
    return this.notKnownKanjiList;
  }

  public getKnownList(){
    return this.knownKanjiList;
  }

  public setKanji(kanji: KanjiData[]) {
    this.kanjiList = kanji;
    this.currentKanji = kanji[0];
  }

  public setSelectionType(newType: string) {
    this.selectionType = newType;
  }

  public isTranslationCorrect(input: string) {
    return this.currentAnswer
      .map((a) => a.toLowerCase())
      .includes(input.toLowerCase());
  }

  public getCurrentAnswer() {
    return this.currentAnswer;
  }

  public skipAndGetNext() {
    if(this.currentKanji){
      this.kanjiList.push(this.currentKanji);
      return this.getNextPrompt();
    }
    return { prompt: [], label: ''};
  }

  /**
   * Removes the chars, included in the json, we don't need
   */
  private removeExcessChars(words: string[]): string[] {
    return words.map((word) => word.replace(/[\^!]/g, ""));
  }
}