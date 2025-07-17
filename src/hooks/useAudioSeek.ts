import type { RefObject } from "react";

export const useAudioSeek = (audioRef: RefObject<HTMLAudioElement | null>) => {
  const seekTo = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  return { seekTo };
};
