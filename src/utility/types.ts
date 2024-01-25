/**
 * Enum for the different Levels a Kanji is known to the user
 */
export enum KanjiGrades {
  Unknown = "Unknown",
  Familiar = "Familiar",
  Colleague = "Colleague",
  Friendly = "Friendly",
  NeverForgotten = "NeverForgotten",
  Infused = "Infused",
}

export function gradeAsNumber(grade: KanjiGrades) {
  switch (grade) {
    case KanjiGrades.Unknown:
      return 0;
    case KanjiGrades.Familiar:
      return 1;
    case KanjiGrades.Colleague:
      return 2;
    case KanjiGrades.Friendly:
      return 3;
    case KanjiGrades.NeverForgotten:
      return 4;
    case KanjiGrades.Infused:
      return 5;
    default:
      return -1;
  }
}

/**
 * Function to upgrade the Kanji grade.
 */
export function upGrade(grade: KanjiGrades): KanjiGrades {
  switch (grade) {
    case KanjiGrades.Unknown:
      return KanjiGrades.Familiar;
    case KanjiGrades.Familiar:
      return KanjiGrades.Colleague;
    case KanjiGrades.Colleague:
      return KanjiGrades.Friendly;
    case KanjiGrades.Friendly:
      return KanjiGrades.NeverForgotten;
    case KanjiGrades.NeverForgotten:
      return KanjiGrades.Infused;
    case KanjiGrades.Infused:
      // No further upgrade
      return KanjiGrades.Infused;
    default:
      return grade;
  }
}

/**
 * Function to downgrade the Kanji grade.
 */
export function downGrade(grade: KanjiGrades): KanjiGrades {
  switch (grade) {
    case KanjiGrades.Infused:
      return KanjiGrades.NeverForgotten;
    case KanjiGrades.NeverForgotten:
      return KanjiGrades.Friendly;
    case KanjiGrades.Friendly:
      return KanjiGrades.Colleague;
    case KanjiGrades.Colleague:
      return KanjiGrades.Familiar;
    case KanjiGrades.Familiar:
      return KanjiGrades.Unknown;
    case KanjiGrades.Unknown:
      // No further downgrade
      return KanjiGrades.Unknown;
    default:
      return grade;
  }
}

/**
 * Represents the progress for a user in a level for one kanji
 */
export interface KanjiLevelProgress {
  [character: string]: {
    kanjiGrade: KanjiGrades;
    reviewTime: number;
    correctCount?: number;
    wrongCount?: number;
  };
}

/**
 * Numbers one through sixty in japanese and English
 */
export const oneToSixty: string[][] = [
  ["1", "いち", "ichi", "one"],
  ["2", "に", "ni", "two"],
  ["3", "さん", "san", "three"],
  ["4", "し", "よん", "shi", "yon", "four"],
  ["5", "ご", "go", "five"],
  ["6", "ろく", "roku", "six"],
  ["7", "しち", "なな", "shichi", "nana", "seven"],
  ["8", "はち", "hachi", "eight"],
  ["9", "きゅう", "く", "kyū", "ku", "nine"],

  ["10", "じゅう", "jū", "ten"],
  ["11", "じゅういち", "jūichi", "eleven"],
  ["12", "じゅうに", "jūni", "twelve"],
  ["13", "じゅうさん", "jūsan", "thirteen"],
  ["14", "じゅうし", "じゅうよん", "jūshi", "jūyon", "fourteen"],
  ["15", "じゅうご", "jūgo", "fifteen"],
  ["16", "じゅうろく", "jūroku", "sixteen"],
  ["17", "じゅうしち", "じゅうなな", "jūshichi", "jūnana", "seventeen"],
  ["18", "じゅうはち", "jūhachi", "eighteen"],
  ["19", "じゅうきゅう", "じゅうく", "jūkyū", "jūku", "nineteen"],

  ["20", "にじゅう", "nijū", "twenty"],
  ["21", "にじゅういち", "nijūichi", "twentyone"],
  ["22", "にじゅうに", "nijūni", "twentytwo"],
  ["23", "にじゅうさん", "nijūsan", "twentythree"],
  ["24", "にじゅうよん", "nijūyon", "twentyfour"],
  ["25", "にじゅうご", "nijūgo", "twentyfive"],
  ["26", "にじゅうろく", "nijūroku", "twentysix"],
  ["27", "にじゅうなな", "nijūnana", "twentyseven"],
  ["28", "にじゅうはち", "nijūhachi", "twentyeight"],
  ["29", "にじゅうきゅう", "nijūkyū", "twentynine"],

  ["30", "さんじゅう", "sanjū", "thirty"],
  ["31", "さんじゅういち", "sanjūichi", "thirtyone"],
  ["32", "さんじゅうに", "sanjūni", "thirtytwo"],
  ["33", "さんじゅうさん", "sanjūsan", "thirtythree"],
  ["34", "さんじゅうし", "さんじゅうよん", "sanjūshi", "sanjūyon", "thirtyfour"],
  ["35", "さんじゅうご", "sanjūgo", "thirtyfive"],
  ["36", "さんじゅうろく", "sanjūroku", "thirty-six"],
  ["37", "さんじゅうしち", "さんじゅうなな", "sanjūshichi", "sanjūnana", "thirtyseven"],
  ["38", "さんじゅうはち", "sanjūhachi", "thirty-eight"],
  ["39", "さんじゅうきゅう", "さんじゅうく", "sanjūkyū", "sanjūku", "thirty-nine"],

  ["40", "よんじゅう", "yonjū", "fourty"],
  ["41", "よんじゅういち", "yonjūichi", "fourtyone"],
  ["42", "よんじゅうに", "yonjūni", "fourtytwo"],
  ["43", "よんじゅうさん", "yonjūsan", "fourtythree"],
  ["44", "よんじゅうし", "よんじゅうよん", "yonjūshi", "yonjūyon", "fourtyfour"],
  ["45", "よんじゅうご", "yonjūgo", "fourtyfive"],
  ["46", "よんじゅうろく", "yonjūroku", "fourtysix"],
  ["47", "よんじゅうしち", "よんじゅうなな", "yonjūshichi", "yonjūnana", "fourtyseven"],
  ["48", "よんじゅうはち", "yonjūhachi", "fourtyeight"],
  ["49", "よんじゅうきゅう", "よんじゅうく", "yonjūkyū", "yonjūku", "fourtynine"],

  ["50", "ごじゅう", "gojū", "fifty"],
  ["51", "ごじゅういち", "gojūichi", "fiftyone"],
  ["52", "ごじゅうに", "gojūni", "fiftytwo"],
  ["53", "ごじゅうさん", "gojūsan", "fiftythree"],
  ["54", "ごじゅうし", "ごじゅうよん", "gojūshi", "gojūyon", "fiftyfour"],
  ["55", "ごじゅうご", "gojūgo", "fiftyfive"],
  ["56", "ごじゅうろく", "gojūroku", "fiftysix"],
  ["57", "ごじゅうしち", "ごじゅうなな", "gojūshichi", "gojūnana", "fiftyseven"],
  ["58", "ごじゅうはち", "gojūhachi", "fiftyeight"],
  ["59", "ごじゅうきゅう", "ごじゅうく", "gojūkyū", "gojūku", "fiftynine"],

  ["60", "ろくじゅう", "rokujū", "sixty"],
];
