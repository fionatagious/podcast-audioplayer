type LabelProps = React.HTMLAttributes<HTMLLabelElement> & {
  labelName: string;
  children?: React.ReactNode;
  className?: string;
};

const Label = ({ labelName, children, className, ...rest }: LabelProps) => {
  return (
    <div className="flex flex-row">
      <label
        className={`${className} uppercase text-gray-500 font-semibold font-mono tracking-wide`}
        {...rest}
      >
        {labelName}:&nbsp;
      </label>
      {children && (
        <div className="normal-case text-sm font-mono">{children}</div>
      )}
    </div>
  );
};

export default Label;
