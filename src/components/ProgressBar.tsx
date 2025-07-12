import { formatDuration } from "../utils/formatDuration";

type ProgressBarProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  currentTime: number;
  totalTime: number;
  onSeek: (time: number) => void;
};

const ProgressBar = ({
  className,
  currentTime,
  totalTime,
  onSeek,
}: ProgressBarProps) => {
  const currentTimeDisplay = formatDuration(currentTime);

  return (
    <div className="progress-bar-wrapper flex items-center gap-0 sm:gap-2 w-full">
      <div className="mx-[4px] min-w-[60px] sm:min-w-[90px]">
        {currentTimeDisplay}
      </div>
      <div className={`${className} w-full`}>
        <input
          type="range"
          value={currentTime}
          min={0}
          max={totalTime}
          onChange={(e) => onSeek(parseFloat(e.target.value))}
          className="progress-bar-input"
        />
      </div>
    </div>
  );
};

export default ProgressBar;
