type VolumeSliderProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onVolumeChange"
> & {
  className?: string;
  volume: number;
  onVolumeChange: (value: number) => void;
};

const VolumeSlider = ({
  className = "",
  volume,
  onVolumeChange,
}: VolumeSliderProps) => {
  return (
    <div className={`volume-slider-wrapper ${className}`}>
      <input
        id="volume-slider"
        name="volume-slider"
        // VolumeSlider extracts the value from the event and passes it to onVolumeChange as a number
        onInput={(e) => onVolumeChange(parseInt(e.currentTarget.value))}
        onChange={(e) => onVolumeChange(parseInt(e.currentTarget.value))}
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
