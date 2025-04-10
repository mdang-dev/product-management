import "./style/Label.scss";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const Label = ({ className, ...props }: LabelProps) => {
  return <label className={className || "label-input"} {...props} />;
}
