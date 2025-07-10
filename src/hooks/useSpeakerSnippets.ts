// given a conversation, return the conversation snippets for only that speaker
import { useMemo } from "react";
import type { Conversation } from "../types/Conversation";

export const useSpeakerSnippets = (
  conversation: Conversation | null,
  participant_name: string
): Conversation | null => {
  return useMemo(() => {
    if (!conversation) return null;

    // If no participant is selected, return the full conversation
    if (!participant_name) {
      return conversation;
    }

    return {
      ...conversation,
      snippets: conversation.snippets.filter(
        (snippet) => snippet.speaker_name === participant_name
      ),
    };
  }, [conversation, participant_name]);
};
