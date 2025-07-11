interface DropdownProps {
  options: string[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}

const Dropdown = ({ options, value, onChange, className }: DropdownProps) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`border border-indigo-800 rounded p-2 ${className}`}
    >
      <option value="">Select a speaker</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
