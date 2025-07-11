type ProgressBarProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  progress: number;
  currentTime: string;
  totalTime: string;
  onSeek: (time: number) => void;
  duration: number;
};

const ProgressBar = ({
  className = "",
  progress,
  currentTime,
}: ProgressBarProps) => {
  return (
    <>
      <div>{currentTime}</div>
      <div
        className={`flex flex-row relative w-full h-2 bg-gray-200 border-1 border-indigo-500 rounded ${className}`}
      >
        <div
          className="absolute top-0 left-0 h-full bg-indigo-500 rounded"
          style={{ width: `${progress}%` }}
        />
      </div>
    </>
  );
};

export default ProgressBar;
