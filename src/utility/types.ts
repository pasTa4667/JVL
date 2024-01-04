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

