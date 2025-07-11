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
      className={`${className} ${labelSize} flex flex-row flex-nowrap p-2 rounded-md text-slate-800 font-semibold my-2`}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {label && <span className="text-slate-800">{label}</span>}
    </button>
  );
};

export default Button;
