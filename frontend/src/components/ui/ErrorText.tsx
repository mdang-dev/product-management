import { PropsWithChildren } from "react";
import "./style/Error.scss";

type ErrorProps = PropsWithChildren & {
  className?: string;
};

export const ErrorText = ({ className, children }: ErrorProps) => {
  if (!children) return null;
  return <p className={className || "error-message"}>{children}</p>;
};
