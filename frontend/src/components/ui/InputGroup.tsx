import { PropsWithChildren } from "react";
import "./style/InputGroup.scss";

type InputGroupProps = PropsWithChildren & {
  className?: string;
};

export const InputGroup = ({ children, className }: InputGroupProps) => {
  return <div className={className || "input-group"}>{children}</div>;
};
