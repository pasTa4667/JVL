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
