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
// types
import type { Snippet } from "./types/Snippet";
// utils
import { formatDuration } from "./utils/formatDuration";

function App() {
  // Fetch conversation data and handle loading and error states
  const { conversation, loading, error } = useConversationData();

  // Filter conversation by selected speaker
  const [selectedSpeaker, setSelectedSpeaker] = useState<string>("");
  const speakerNames = useSpeakerNames(conversation);
  const filteredConversation = useSpeakerSnippets(
    conversation,
    selectedSpeaker
  );
  const handleSpeakerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSpeaker = event.target.value;
    setSelectedSpeaker(selectedSpeaker);
  };

  // Calculate stats by speaker
  const { wordCountBySpeakerSorted, durationBySpeakerFormatted } =
    useSpeakerStats(conversation);

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
          <p className="my-6 text-lg">
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
      <hr className="my-6" />

      <Subheading>Transcript</Subheading>
      {/* Dropdown to filter conversation by speaker */}
      <div className="flex flex-row gap-2 items-center my-4 bg-orange-100 justify-between px-2 rounded-md">
        <p className="text-lg">
          To view only the snippets of a specific participant, use this dropdown
          to filter the conversation by participant:
        </p>
        <Dropdown
          options={speakerNames}
          value={selectedSpeaker}
          onChange={handleSpeakerChange}
        />
      </div>

      {/* Transcript of conversation */}
      {filteredConversation &&
        filteredConversation.snippets.map((snippet: Snippet) => (
          <div className="flex items-start" key={snippet.id}>
            <p className="min-w-[100px] text-md font-mono text-indigo-900">
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

      <hr className="my-6" />
      <Subheading>Speaker Stats</Subheading>
      <h3>How many words each speaker said</h3>
      {wordCountBySpeakerSorted && (
        <div className="flex flex-col gap-2 max-w-[200px]">
          {Object.keys(wordCountBySpeakerSorted).map((speaker_name: string) => (
            <div key={speaker_name} className="flex justify-between">
              <Label labelName={speaker_name} className="min-w-80" />
              <span>{wordCountBySpeakerSorted[speaker_name]}</span>
            </div>
          ))}
        </div>
      )}

      <h3>How long each speaker spoke</h3>
      {durationBySpeakerFormatted && (
        <div className="flex flex-col gap-2 max-w-[200px]">
          {Object.keys(durationBySpeakerFormatted).map(
            (speaker_name: string) => (
              <div key={speaker_name} className="flex justify-between">
                <Label labelName={speaker_name} className="min-w-80" />
                <span>{durationBySpeakerFormatted[speaker_name]}</span>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default App;
