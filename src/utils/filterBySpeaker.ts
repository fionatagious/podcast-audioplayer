import type { Conversation } from "../types/Conversation";

export function filterBySpeaker(
  speaker_name: string
): (speaker_lines: Conversation) => Conversation {
  return (speaker_lines: Conversation) => {
    const filteredSnippets = speaker_lines.snippets.filter(
      (snippet) => snippet.speaker_name === speaker_name
    );
    return { ...speaker_lines, snippets: filteredSnippets };
  };
}
