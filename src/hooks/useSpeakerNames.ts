// get speaker names from conversation snippets
import { useMemo } from "react";
import type { Conversation } from "../types/Conversation";

export const useSpeakerNames = (
  conversation: Conversation | null
): string[] => {
  return useMemo(() => {
    if (!conversation) return [];

    const speakerNames = new Set<string>();
    conversation.snippets.forEach((snippet) => {
      speakerNames.add(snippet.speaker_name);
    });
    return Array.from(speakerNames);
  }, [conversation]);
};
