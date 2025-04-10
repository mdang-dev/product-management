import { forwardRef } from "react";
import "./style/Button.scss";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`${(className && `${className} `) || ""}button-custom`}
        {...props}
      ></button>
    );
  }
);
