type Heading2Props = React.HTMLAttributes<HTMLHeadingElement>;

const Heading2 = ({ children, className = "", ...rest }: Heading2Props) => {
  return (
    <h2
      className={`${className} font-mono text-2xl text-slate-800 text-center sm:text-left`}
      {...rest}
    >
      {children}
    </h2>
  );
};

export default Heading2;
