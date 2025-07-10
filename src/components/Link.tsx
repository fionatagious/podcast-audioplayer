interface LinkProps extends React.LinkHTMLAttributes<HTMLAnchorElement> {
  label?: string;
  labelSize?: string;
  className?: string;
  icon?: React.ReactNode;
  download?: string;
}

const Link = ({
  label,
  labelSize = "text-md",
  className = "flex flex-row flex-nowrap py-[0.6em] px-[1.2em]",
  icon,
  href,
  download,
  ...props
}: LinkProps) => {
  return (
    <a
      href={href}
      download={download}
      className={`${className} ${labelSize}`}
      crossOrigin="anonymous"
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {label && <span className="text-slate-800">{label}</span>}
    </a>
  );
};

export default Link;
