type Heading3Props = React.HTMLAttributes<HTMLHeadingElement>;

const Heading3 = ({ children, className = "", ...rest }: Heading3Props) => {
  return (
    <h3
      className={`${className} font-mono text-xl text-slate-800 text-center sm:text-left`}
      {...rest}
    >
      {children}
    </h3>
  );
};

export default Heading3;
