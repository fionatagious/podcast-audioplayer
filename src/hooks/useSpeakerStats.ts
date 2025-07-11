// This hook calculates aggregate values per speaker:
// - total number of words per speaker
// - total duration per speaker in seconds
// - total duration per speaker to minutes and seconds in human-readable format

import { useMemo } from "react";
import { formatDuration } from "../utils/formatDuration";
import type { Conversation } from "../types/Conversation";

interface CalculationResult {
  wordCountBySpeakerSorted: Record<string, number>;
  durationBySpeakerFormatted: Record<string, string>;
}

export const useSpeakerStats = (
  conversation: Conversation | null
): CalculationResult => {
  // Memoize the calculations to prevent recalculating on every render
  return useMemo(() => {
    if (!conversation) {
      return { wordCountBySpeakerSorted: {}, durationBySpeakerFormatted: {} };
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

    // sort the word count by speaker in descending order
    const wordCountBySpeakerEntries = Object.entries(wordCountBySpeaker).sort(
      ([, a], [, b]) => b - a
    );
    const wordCountBySpeakerSorted: Record<string, number> = {};
    wordCountBySpeakerEntries.forEach(([speaker, count]) => {
      wordCountBySpeakerSorted[speaker] = count;
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

    // sort the duration by speaker in descending order
    const durationBySpeakerEntries = Object.entries(durationBySpeaker).sort(
      ([, a], [, b]) => b - a
    );
    // format the duration to MM:SS, e.g. 1000 seconds -> 16:40
    const durationBySpeakerFormatted: Record<string, string> = {};
    durationBySpeakerEntries.forEach(([speaker_name, duration]) => {
      durationBySpeakerFormatted[speaker_name] = formatDuration(duration);
    });

    return { wordCountBySpeakerSorted, durationBySpeakerFormatted };
  }, [conversation]);
};
