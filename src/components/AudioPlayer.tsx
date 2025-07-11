import { useState, useRef, useEffect } from "react";
import { formatDuration } from "../utils/formatDuration";
import Button from "./Button";
import Link from "./Link";
import ProgressBar from "./ProgressBar";
import VolumeSlider from "./VolumeSlider";
import PlayIcon from "../icons/PlayIcon";
import PauseIcon from "../icons/PauseIcon";
import VolumeIcon from "../icons/VolumeIcon";
import MuteIcon from "../icons/MuteIcon";
import DownloadIcon from "../icons/DownloadIcon";

type AudioPlayerProps = React.AudioHTMLAttributes<HTMLAudioElement> & {
  src: string;
  duration: number; // Duration in seconds
  children?: React.ReactNode;
  className?: string;
};

const AudioPlayer = ({
  src,
  duration,
  children,
  className,
  ...rest
}: AudioPlayerProps) => {
  // Store audio ref object
  const audioElementRef = useRef<HTMLAudioElement>(null);

  // State to manage play/pause, mute/unmute, and volume
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMute, setIsMute] = useState(false);
  const [volume, setVolume] = useState(50);

  // State to manage current time and audio duration
  const [currentTime, setCurrentTime] = useState(0);
  const audioDuration = duration;

  // When play/pause button is clicked, play or pause the audio
  function handlePlayPause() {
    const audioElement = audioElementRef.current;
    if (!audioElement) return;
    if (isPlaying) {
      audioElement?.pause();
    } else {
      audioElement?.play();
    }
    setIsPlaying(!isPlaying);
  }

  // When mute button is clicked, mute or unmute the audio
  function handleMute() {
    const audioElement = audioElementRef.current;
    if (!audioElement) return;
    if (isMute) {
      setIsMute(false);
      setVolume(50); // Set volume to 50% when unmuting
    } else {
      setIsMute(true);
      setVolume(0); // Set volume to 0 when muting
    }
  }

  // Handle seeking when user drags progress bar
  function handleSeek(newTime: number) {
    const audioElement = audioElementRef.current;
    if (!audioElement) return;
    audioElement.currentTime = newTime;
    setCurrentTime(newTime);
  }

  // Whenever `volume` changes, update the audio element's volume
  useEffect(() => {
    if (audioElementRef.current) {
      audioElementRef.current.volume = volume / 100; // Convert 0-100 to 0-1
    }
  }, [volume]);

  // Audio event listeners
  useEffect(() => {
    const audioElement = audioElementRef.current;
    if (!audioElement) return;

    const handleTimeUpdate = () => {
      // currentTime property specifies the current playback time in seconds
      console.log("Current time:", audioElement.currentTime);
      setCurrentTime(audioElement.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audioElement.addEventListener("timeupdate", handleTimeUpdate);
    audioElement.addEventListener("ended", handleEnded);

    return () => {
      audioElement.removeEventListener("timeupdate", handleTimeUpdate);
      audioElement.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-4 my-4 items-center w-full border-2 border-indigo-900 rounded-lg shadow-lg bg-indigo-100 px-6 py-2">
        <audio
          ref={audioElementRef}
          className={`${className} rounded-lg shadow-lg p-4`}
          {...rest}
        >
          {children}
          <source src={src} type="audio/mp4" />
        </audio>

        {/* Audio controls */}
        <Button
          onClick={handlePlayPause}
          icon={isPlaying ? <PauseIcon /> : <PlayIcon />}
          label={isPlaying ? "Pause" : "Play"}
          className="min-w-[120px] justify-around"
        />
        <ProgressBar
          progress={audioDuration > 0 ? (currentTime / audioDuration) * 100 : 0}
          currentTime={formatDuration(currentTime)}
          totalTime={formatDuration(audioDuration)}
          onSeek={handleSeek}
          duration={audioDuration}
        />
        <VolumeSlider volume={volume} onVolumeChange={setVolume} />
        <Button
          label={isMute ? "Unmute" : "Mute"}
          icon={isMute ? <VolumeIcon /> : <MuteIcon />}
          onClick={handleMute}
          className="min-w-[120px] justify-between"
        />
      </div>

      {/* Download button */}
      <div className="flex items-center gap-4 justify-end">
        <div className="bg-[#f9f9f9] rounded-md my-2 border-1 border-slate-500 hover:cursor-pointer hover:border-indigo-900 hover:shadow-md">
          <Link
            href={src}
            download={src}
            icon={<DownloadIcon />}
            label="Download audio file"
          />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
