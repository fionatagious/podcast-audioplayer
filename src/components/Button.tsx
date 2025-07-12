interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  labelSize?: string;
  className?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

const Button = ({
  label,
  labelSize = "text-md",
  className = "",
  icon,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`${className} ${labelSize} max-w-[60px] sm:min-w-[120px] flex flex-nowrap justify-center p-[1px] sm:p-2 text-slate-800 font-semibold my-2`}
      {...props}
    >
      {icon && <span className="mr-0 sm:mr-2">{icon}</span>}
      {label && <span className="text-slate-800 hidden sm:flex">{label}</span>}
      {children}
    </button>
  );
};

export default Button;
