type ParagraphProps = React.HTMLAttributes<HTMLParagraphElement> & {
  color?: string;
  size?: string;
  fontFamily?: string;
  className?: string;
};

const Paragraph = ({
  children,
  color = "text-slate-800",
  size = "text-base",
  fontFamily = "font-sans",
  className = "",
  ...rest
}: ParagraphProps) => {
  return (
    <p className={`${className} ${color} ${size} ${fontFamily}`} {...rest}>
      {children}
    </p>
  );
};

export default Paragraph;
