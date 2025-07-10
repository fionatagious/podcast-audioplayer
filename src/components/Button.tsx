interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  labelSize?: string;
  className?: string;
  icon?: React.ReactNode;
}

const Button = ({
  label,
  labelSize = "text-md",
  className = "",
  icon,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`flex flex-row flex-nowrap p-2 rounded-md 
        ${
          props.disabled
            ? `bg-gray-400 text-gray-200 cursor-not-allowed hover:cursor-not-allowed hover:bg-gray-400`
            : `${className} ${labelSize} bg-btn-primary hover:bg-btn-hover text-white font-semibold hover:cursor-pointer my-2`
        }`}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {label && <span className="text-slate-800">{label}</span>}
    </button>
  );
};

export default Button;
