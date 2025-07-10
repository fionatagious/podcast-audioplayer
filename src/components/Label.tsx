type LabelProps = React.HTMLAttributes<HTMLLabelElement> & {
  labelName: string;
  children?: React.ReactNode;
  className?: string;
};

const Label = ({ labelName, children, className, ...rest }: LabelProps) => {
  return (
    <div className="flex text-md text-left">
      <label
        className={`${className} uppercase text-gray-500 mb-2 font-semibold font-mono tracking-wide`}
        {...rest}
      >
        {labelName}:&nbsp;
      </label>
      <div className="normal-case">{children}</div>
    </div>
  );
};

export default Label;
