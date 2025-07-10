export interface Snippet {
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
