import { useState, useRef, useEffect } from "react";
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
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
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

  // Show or hide volume slider
  function handleShowVolumeSlider() {
    setShowVolumeSlider(!showVolumeSlider);
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
      <div className="flex flex-nowrap gap-4 my-4 items-center w-full border-2 border-indigo-900 rounded-lg shadow-lg bg-indigo-100 px-2 sm:px-6 py-2">
        <audio
          ref={audioElementRef}
          className={`${className} rounded-lg shadow-lg p-4`}
          {...rest}
        >
          {children}
          <source src={src} type="audio/mp4" />
        </audio>

        {/* Audio controls */}
        <div className="flex items-center w-full">
          <Button
            data-cy="play-pause-button"
            onClick={handlePlayPause}
            icon={isPlaying ? <PauseIcon /> : <PlayIcon />}
            label={isPlaying ? "Pause" : "Play"}
          />
          <ProgressBar
            currentTime={currentTime}
            totalTime={audioDuration}
            onSeek={handleSeek}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            data-cy="mute-unmute-button"
            label={isMute ? "Unmute" : "Mute"}
            icon={isMute ? <VolumeIcon /> : <MuteIcon />}
            onClick={handleMute}
          />
          <Button
            label="Volume"
            icon={<VolumeIcon />}
            onClick={handleShowVolumeSlider}
            className="relative"
          >
            {showVolumeSlider && (
              <VolumeSlider
                volume={volume}
                onVolumeChange={setVolume}
                className="rotate-270 absolute bottom-21 min-w-[100px]"
              />
            )}
          </Button>
        </div>
      </div>

      {/* Download button */}
      <div className="flex items-center gap-4 justify-end">
        <div className="bg-[#f9f9f9] rounded-md my-2 border-1 border-slate-500 hover:cursor-pointer hover:border-indigo-900 hover:shadow-md">
          <Link
            data-cy="download-audio-button"
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
