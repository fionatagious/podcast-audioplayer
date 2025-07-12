type HeadingProps = React.HTMLAttributes<HTMLHeadingElement>;

const Heading = ({ children, className, ...rest }: HeadingProps) => {
  return (
    <h1
      className={`${className} font-mono text-3xl text-indigo-900 text-left my-4`}
      {...rest}
    >
      {children}
    </h1>
  );
};

export default Heading;
