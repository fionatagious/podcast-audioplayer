interface DropdownProps {
  options: string[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Dropdown = ({ options, value, onChange }: DropdownProps) => {
  return (
    <select value={value} onChange={onChange}>
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
