type VolumeSliderProps = React.InputHTMLAttributes<HTMLInputElement> & {
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
    <div className={`flex flex-col ${className}`}>
      <label htmlFor="volume-slider">{label}</label>
      <input
        id="volume-slider"
        // VolumeSlider extracts the value from the event and passes it to onVolumeChange as a number
        onChange={(e) => onVolumeChange(Number(e.target.value))}
        value={volume}
        name="volume-slider"
        type="range"
        min="0"
        max="100"
        className="w-full h-8 rounded-lg cursor-pointer"
      />
    </div>
  );
};

export default VolumeSlider;
