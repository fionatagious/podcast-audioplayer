import "./App.css";
import { useState } from "react";
// custom hooks
import { useConversationData } from "./hooks/useConversationData";
import { useSpeakerStats } from "./hooks/useSpeakerStats";
import { useSpeakerNames } from "./hooks/useSpeakerNames";
import { useSpeakerSnippets } from "./hooks/useSpeakerSnippets";
// components
import Heading from "./components/Heading";
import Subheading from "./components/Subheading";
import Label from "./components/Label";
import AudioPlayer from "./components/AudioPlayer";
import Dropdown from "./components/Dropdown";
// utils
import { formatDuration } from "./utils/formatDuration";
// types
import type { Snippet } from "./types/Snippet";
import type { Conversation } from "./types/Conversation";

function App() {
  // Fetch conversation data and handle loading and error states
  const { conversation, loading, error } = useConversationData();

  // Filter conversation by selected speaker
  const [selectedSpeaker, setSelectedSpeaker] = useState<string>("");
  const speakerNames = useSpeakerNames(conversation as Conversation);
  const filteredConversation = useSpeakerSnippets(
    conversation,
    selectedSpeaker
  );
  const handleSpeakerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSpeaker = event.target.value;
    setSelectedSpeaker(selectedSpeaker);
  };

  // Calculate stats by speaker
  const { wordCountBySpeaker, durationBySpeakerFormatted } = useSpeakerStats(
    conversation as Conversation
  );

  if (loading) {
    return <div>Loading conversation data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {/* Heading and description */}
      {conversation && (
        <>
          <Heading>{conversation.title}</Heading>
          <p className="my-6">
            This conversation features the voices of various Cortico and MIT
            Media Lab staff and students reflecting on their time living in the
            Boston area.
          </p>
          <Label labelName="Location">
            <p>{conversation.location.name}</p>
          </Label>
          <Label labelName="Date/Time">
            <p>
              {new Date(conversation.time).toLocaleDateString()}&nbsp;
              {new Date(conversation.time).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </p>
          </Label>
          <Label labelName="Coordinates">
            <p>
              {conversation.location.lng_lat[0]},&nbsp;
              {conversation.location.lng_lat[1]}
            </p>
          </Label>
        </>
      )}

      {/* Audio player */}
      {conversation && (
        <AudioPlayer
          src={`../data${conversation.audio_url}`}
          duration={conversation.duration}
        />
      )}

      <Subheading>Transcript</Subheading>
      {/* Dropdown to filter conversation by speaker */}
      <div className="flex flex-row gap-2 items-center">
        <p>Use the dropdown to filter the conversation by a speaker</p>
        <Dropdown
          options={speakerNames}
          value={selectedSpeaker}
          onChange={handleSpeakerChange}
        />
      </div>

      {/* Transcript of conversation */}
      {filteredConversation &&
        filteredConversation.snippets.map((snippet: Snippet) => (
          <div className="flex" key={snippet.id}>
            <p className="min-w-[100px] text-xs">
              {formatDuration(snippet.audio_start_offset)}
            </p>
            <Label
              className="flex min-w-[140px] text-left"
              labelName={snippet.speaker_name}
            />
            &nbsp;
            <p className="flex text-left mb-3">
              {snippet.words.map((word) => word[0]).join(" ")}
            </p>
          </div>
        ))}

      <Subheading>How many words each speaker said</Subheading>
      {wordCountBySpeaker && (
        <div className="flex flex-col gap-2 text-left">
          {Object.keys(wordCountBySpeaker).map((speaker_name: string) => (
            <span key={speaker_name}>
              {speaker_name}: {wordCountBySpeaker[speaker_name]}
            </span>
          ))}
        </div>
      )}

      <Subheading>How long each speaker spoke</Subheading>
      {durationBySpeakerFormatted && (
        <div className="flex flex-col gap-2 text-left">
          {Object.keys(durationBySpeakerFormatted).map(
            (speaker_name: string) => (
              <span key={speaker_name}>
                {speaker_name}: {durationBySpeakerFormatted[speaker_name]}
              </span>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default App;
