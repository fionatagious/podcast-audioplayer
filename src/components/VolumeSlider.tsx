type VolumeSliderProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onVolumeChange"
> & {
  label?: string;
  className?: string;
  volume: number;
  onVolumeChange: (value: number) => void;
};

const VolumeSlider = ({
  label = "Volume",
  className = "",
  volume,
  onVolumeChange,
}: VolumeSliderProps) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor="volume-slider">{label}</label>
      <input
        id="volume-slider"
        name="volume-slider"
        // VolumeSlider extracts the value from the event and passes it to onVolumeChange as a number
        onChange={(e) => onVolumeChange(parseInt(e.target.value))}
        value={volume}
        type="range"
        min="0"
        max="100"
        className="w-full h-2 rounded cursor-pointer"
      />
    </div>
  );
};

export default VolumeSlider;
