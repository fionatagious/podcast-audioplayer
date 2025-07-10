import { useState, useEffect } from "react";

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

interface UseConversationDataResult {
  conversation: Conversation | null;
  loading: boolean;
  error: string | null;
}

export const useConversationData = (): UseConversationDataResult => {
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // fetch the conversation JSON data
  const getConversation = async () => {
    try {
      const response = await fetch("./data/conversation.json", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      console.log("Response received:", response);
      const data = await response.json();
      console.log("Parsed conversation data:", data);
      return data;
    } catch (error) {
      console.error("Error fetching conversation data:", error);
      throw error;
    }
  };

  useEffect(() => {
    getConversation()
      .then((data) => {
        setConversation(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return { conversation, loading, error };
};
