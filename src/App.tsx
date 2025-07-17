import "./App.css";
import { useState, useRef } from "react";
// custom hooks
import { useConversationData } from "./hooks/useConversationData";
import { useSpeakerStats } from "./hooks/useSpeakerStats";
import { useSpeakerNames } from "./hooks/useSpeakerNames";
import { useSpeakerSnippets } from "./hooks/useSpeakerSnippets";
import { useAudioSeek } from "./hooks/useAudioSeek";
// components
import Heading from "./components/Heading";
import Heading2 from "./components/Heading2";
import Heading3 from "./components/Heading3";
import Paragraph from "./components/Paragraph";
import Label from "./components/Label";
import AudioPlayer from "./components/AudioPlayer";
import Dropdown from "./components/Dropdown";
import MapEmbed from "./components/MapEmbed";
// types
import type { Snippet } from "./types/Snippet";
// utils
import { formatDuration } from "./utils/formatDuration";
import { getSpeakerColorFromPalette } from "./utils/colorsHash";

function App() {
  // Fetch conversation data and handle loading and error states
  const { conversation, loading, error } = useConversationData();

  // Audio ref for seeking
  const audioRef = useRef<HTMLAudioElement>(null);
  const { seekTo } = useAudioSeek(audioRef);

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

  // Handle timestamp click to seek to specific time
  const handleTimestampClick = (time: number) => {
    seekTo(time);
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
    <div className="m-auto p-4 sm:max-w-70vw ">
      {/* Heading and high-level description */}
      {conversation && (
        <>
          <Heading>{conversation.title}</Heading>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col gap-2">
              <Paragraph size="text-lg" className="my-6">
                This conversation features the voices of various Cortico and MIT
                Media Lab staff and students reflecting on their time living in
                the Boston area.
              </Paragraph>
              <Label labelName="Date/Time">
                <Paragraph>
                  {new Date(conversation.time).toLocaleDateString()}&nbsp;
                  {new Date(conversation.time).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                </Paragraph>
              </Label>
              <Label labelName="Location">
                <Paragraph>{conversation.location.name}</Paragraph>
              </Label>
              <Label labelName="Coordinates">
                <Paragraph>
                  {conversation.location.lng_lat[0]},&nbsp;
                  {conversation.location.lng_lat[1]}
                </Paragraph>
              </Label>
            </div>
            <MapEmbed
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11791.957568232869!2d-71.09678013942005!3d42.36406534183426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e370aeb68b7f17%3A0xe23345d0fe2cd49a!2sKendall%20Square%2C%20Cambridge%2C%20MA!5e0!3m2!1sen!2sus!4v1752273204400!5m2!1sen!2sus"
              title="Kendall Square map"
              className="my-6 flex shrink"
            />
          </div>
        </>
      )}

      {/* Audio player */}
      {conversation && (
        <AudioPlayer
          src={`../data${conversation.audio_url}`}
          duration={conversation.duration}
          onSeek={seekTo}
          audioRef={(ref) => {
            audioRef.current = ref;
          }}
        />
      )}
      <hr className="my-6" />

      {/* Transcript of conversation */}
      <Heading2>Transcript</Heading2>
      {/* Dropdown to filter conversation by speaker */}
      <div className="flex flex-col sm:flex-row gap-2 items-center my-4 bg-orange-100 justify-between px-2 rounded-md">
        <Paragraph size="text-lg" className="p-2">
          To view only the snippets of a specific participant, use this dropdown
          to filter the conversation by participant:
        </Paragraph>
        <Dropdown
          options={speakerNames}
          value={selectedSpeaker}
          onChange={handleSpeakerChange}
        />
      </div>

      {filteredConversation &&
        filteredConversation.snippets.map((snippet: Snippet) => (
          <div
            className="flex items-start border-l-4 pl-4 py-2 my-2"
            key={snippet.id}
            style={{
              borderLeftColor: getSpeakerColorFromPalette(snippet.speaker_name),
            }}
          >
            <div className="flex flex-col min-w-[125px] sm:flex-row sm:min-w-[240px]">
              <Paragraph
                color="text-indigo-900"
                fontFamily="font-mono"
                className="text-left sm:min-w-[100px] cursor-pointer hover:underline"
                onClick={() => handleTimestampClick(snippet.audio_start_offset)}
                title={`Jump to ${formatDuration(snippet.audio_start_offset)}`}
              >
                {formatDuration(snippet.audio_start_offset)}
              </Paragraph>
              <Label labelName={snippet.speaker_name} />
            </div>
            &nbsp;
            <Paragraph className="mb-3">
              {snippet.words.map((word) => word[0]).join(" ")}
            </Paragraph>
          </div>
        ))}

      <hr className="my-6" />
      {/* Speaker stats */}
      <Heading2>Speaker Stats</Heading2>
      <Heading3>How many words each speaker said</Heading3>
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

      <Heading3>How long each speaker spoke</Heading3>
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
