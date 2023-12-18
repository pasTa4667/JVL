export type KanjiData = {
    character: string
    strokes: number;
    grade: number;
    freq: number;
    jlpt_old: number;
    jlpt_new: number;
    meanings: string[];
    readings_on: string[];
    readings_kun: string[];
    wk_level: number;
    wk_meanings: string[];
    wk_readings_on: string[];
    wk_readings_kun: string[];
    wk_radicals: string[];
};


export default class ReadJson {
  private static allKanji: KanjiData[] = [];
  // we know its 60 levels and it won't change in the near future
  public static readonly levelCount = 60;

  public static async readKanjiFile(): Promise<KanjiData[]> {
    try {
      const response = await fetch('kanji-wanikani.json',{
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData: any = await response.json();
      const parsedData: KanjiData[] = Object.keys(jsonData).map(key => {
        return {
          character: key,
          strokes: jsonData[key].strokes,
          grade: jsonData[key].grade,
          freq: jsonData[key].freq,
          jlpt_old: jsonData[key].jlpt_old,
          jlpt_new: jsonData[key].jlpt_new,
          meanings: jsonData[key].meanings,
          readings_on: jsonData[key].readings_on,
          readings_kun: jsonData[key].readings_kun,
          wk_level: jsonData[key].wk_level,
          wk_meanings: jsonData[key].wk_meanings,
          wk_readings_on: jsonData[key].wk_readings_on,
          wk_readings_kun: jsonData[key].wk_readings_kun,
          wk_radicals: jsonData[key].wk_radicals
        };
      });
      return parsedData;
    } catch (error) {
      console.error('Error while reading:', error);
      return []; 
    }
  }

  /**
  * Returns a certain level of kanji, starting from level one.
  */
  public static async getKanjiLevel(level: number, shuffle?: boolean): Promise<KanjiData[]> {
    try {
      if(this.allKanji.length === 0){
        this.allKanji = await this.readKanjiFile();
      }
      
      const filteredKanji = this.allKanji.filter((kanji) => kanji.wk_level === level);

      if (shuffle) {
        // Shuffle the filtered kanji array using Fisher-Yates shuffle algorithm
        for (let i = filteredKanji.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [filteredKanji[i], filteredKanji[j]] = [filteredKanji[j], filteredKanji[i]];
        }
      }

      return filteredKanji;
    } catch (error) {
      console.error('Error while fetching kanji:', error);
      return [];
    }
  }


}

