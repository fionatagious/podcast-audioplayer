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
      className={`${className} bg-[#f9f9f9] rounded-md m-2 py-2 px-4 border-1 border-slate-500 text-slate-800 text-md font-weight-500 cursor-pointer hover:border-indigo-900 hover:shadow-md`}
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
