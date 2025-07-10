import "./App.css";
// custom hooks
import { useConversationData } from "./hooks/useConversationData";
import { useSpeakerStats } from "./hooks/useSpeakerStats";
// components
import Heading from "./components/Heading";
import Subheading from "./components/Subheading";
import Label from "./components/Label";
import AudioPlayer from "./components/AudioPlayer";

function App() {
  // Fetch conversation data and handle loading and error states
  const { conversation, loading, error } = useConversationData();

  // Calculate stats by speaker
  const { wordCountBySpeaker, durationBySpeakerFormatted } =
    useSpeakerStats(conversation);

  if (loading) {
    return <div>Loading conversation data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
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
          <Label labelName="Date">
            <p>{new Date(conversation.time).toLocaleDateString()}</p>
          </Label>
          <Label labelName="Time">
            <p>
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
      <Subheading>Conversation audio</Subheading>
      {conversation && (
        <AudioPlayer
          src={`../data${conversation.audio_url}`}
          duration={conversation.duration}
        />
      )}

      <Subheading>How many words each speaker said</Subheading>
      {wordCountBySpeaker && (
        <div className="flex flex-col gap-2 text-left">
          {Object.keys(wordCountBySpeaker).map((speaker_name: string) => (
            <span key={speaker_name}>
              {speaker_name}: {wordCountBySpeaker[speaker_name]}{" "}
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

      <Subheading>Transcript</Subheading>
      {conversation && (
        <div className="flex flex-col gap-2 text-left">
          {conversation.snippets.map((snippet) => (
            <div className="flex" key={snippet.id}>
              <p className="min-w-[160px]">{snippet.speaker_name}:&nbsp;</p>
              <p className="flex text-left">
                {snippet.words.map((word) => word[0]).join(" ")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
