import type { Snippet } from "./Snippet";

export interface Conversation {
  id: number;
  duration: number;
  audio_url: string;
  title: string;
  location: { name: string; lng_lat: number[] };
  time: string;
  snippets: Snippet[];
}
