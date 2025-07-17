// convert number of seconds to a formatted string that includes minutes and seconds
// e.g. 65 seconds -> "1:05", 3600 seconds -> "1:00:00"
export function formatDuration(seconds: number): string {
  if (seconds < 0) {
    return "0 sec";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const remainingSecondsRounded = Math.round(remainingSeconds);
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}:${
    remainingMinutes < 10 ? `0${remainingMinutes}` : `${remainingMinutes}`
  }:${
    remainingSecondsRounded < 10
      ? `0${remainingSecondsRounded}`
      : remainingSecondsRounded
  }`;
}
