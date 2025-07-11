type SubheadingProps = React.HTMLAttributes<HTMLHeadingElement>;

const Subheading = ({ children, className = "", ...rest }: SubheadingProps) => {
  return (
    <h2
      className={`${className} text-3xl text-center sm:text-left md:text-2xl`}
      {...rest}
    >
      {children}
    </h2>
  );
};

export default Subheading;
