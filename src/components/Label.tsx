type LabelProps = React.HTMLAttributes<HTMLLabelElement> & {
  labelName: string;
  children?: React.ReactNode;
  className?: string;
};

const Label = ({ labelName, children, className, ...rest }: LabelProps) => {
  return (
    <div className="flex flex-row">
      <label
        className={`${className} uppercase text-indigo-900 font-semibold font-mono tracking-wide`}
        {...rest}
      >
        {labelName}:&nbsp;
      </label>
      {children && <div className="normal-case text-md">{children}</div>}
    </div>
  );
};

export default Label;
