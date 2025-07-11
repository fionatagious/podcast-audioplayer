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
      className={`${className} border-1 border-indigo-900 rounded-lg m-2 py-2 px-4 cursor-pointer hover:bg-indigo-300`}
    >
      <option value="">Select a participant</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
