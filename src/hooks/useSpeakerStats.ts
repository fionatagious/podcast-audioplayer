// This hook calculates aggregate values per speaker:
// - total number of words per speaker
// - total duration per speaker in seconds
// - total duration per speaker to minutes and seconds in human-readable format

import { useMemo } from "react";
import { formatDuration } from "../utils/formatDuration";

interface Snippet {
  audio_end_offset: number;
  audio_start_offset: number;
  conversation_id: number;
  duration: number;
  id: number;
  speaker_id: string;
  speaker_name: string;
  words: [string, number, number][];
  time: string;
}

interface Conversation {
  id: number;
  duration: number;
  audio_url: string;
  title: string;
  location: { name: string; lng_lat: number[] };
  time: string;
  snippets: Snippet[];
}

interface CalculationResult {
  wordCountBySpeaker: Record<string, number>;
  durationBySpeakerFormatted: Record<string, string>;
}

export const useSpeakerStats = (
  conversation: Conversation | null
): CalculationResult => {
  // Memoize the calculations to prevent recalculating on every render
  return useMemo(() => {
    if (!conversation) {
      return { wordCountBySpeaker: {}, durationBySpeakerFormatted: {} };
    }

    // total number of words per speaker
    const wordCountBySpeaker: Record<string, number> = {};
    conversation.snippets.forEach((snippet) => {
      snippet.words.forEach(() => {
        const speaker = snippet.speaker_name;
        if (wordCountBySpeaker[speaker]) {
          wordCountBySpeaker[speaker] += 1;
        } else {
          wordCountBySpeaker[speaker] = 1;
        }
      });
    });

    // total duration per speaker in seconds
    const durationBySpeaker: Record<string, number> = {};
    conversation.snippets.forEach((snippet) => {
      const speaker = snippet.speaker_name;
      if (durationBySpeaker[speaker]) {
        durationBySpeaker[speaker] += snippet.duration;
      } else {
        durationBySpeaker[speaker] = snippet.duration;
      }
    });

    // total duration per speaker to minutes and seconds in human-readable format
    // e.g. 1000 seconds -> 16 minutes 40 seconds
    const durationBySpeakerFormatted: Record<string, string> = {};
    Object.keys(durationBySpeaker).forEach((speaker_name: string) => {
      // format the duration for each speaker
      durationBySpeakerFormatted[speaker_name] = formatDuration(
        durationBySpeaker[speaker_name]
      );
    });

    return { wordCountBySpeaker, durationBySpeakerFormatted };
  }, [conversation]);
};
