import { KanjiGrades, KanjiLevelProgress, gradeAsNumber, oneToSixty } from "./types";

/**
 * Adds the hours given to the current time and returns it in milliseconds.
 */
export function calculateNextReviewDate(hoursUntilReview: number): number {
    const now = new Date();
    const nextReviewTime = now.getTime() + hoursUntilReview * 60 * 60 * 1000;
    return nextReviewTime;
}

/**
 * Converts Timestamp in milliseconds to hours:minutes
 */
export function convertTimestampToReadableTime(timestamp: number): string {
  const diff = timestamp - new Date().getTime();
  // Convert the timestamp to hours, minutes, and seconds
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  // Construct a readable time string
  return `${hours < 0 ? 0 : hours}h:${minutes < 0 ? 0 : minutes}m`;
}

/**
 * Determines wether the review time is reached
 */
export function isReviewTimeReached(timestamp: number): boolean {
  return  timestamp - new Date().getTime() <= 0;
}

/**
 * Determines the the progress of a level in percentage
 */
export function calculateLevelProgress(userProgress: KanjiLevelProgress | null) {
  if (userProgress) {
    let kanjiCount = 0;
    let progressCount = 0;
    for(let kanji in userProgress) {
      kanjiCount++;
      const progress = userProgress![kanji] ?? null; 
      progressCount += gradeAsNumber(progress ? progress.kanjiGrade : KanjiGrades.Unknown);
    }

    return (progressCount * 100) / (kanjiCount * 5);
  }
  return 0;
}


/**
 * Returns the possible numbers from a string input (japanese and english)
 */
export function translateToNumbers(num: string) {
  if(!num) return;

  const numbers  = new Set<number>();
  oneToSixty.forEach((writings) => writings.filter((writing) => {
    if(writing.includes(num)) {
      numbers.add(Number(writings[0]));
    }
  }));

  return Array.from(numbers).sort();
}