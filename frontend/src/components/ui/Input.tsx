import "./style/Input.scss";
import React, { forwardRef } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`${(className && `${className} `) || ""}input-field`}
        {...props}
      />
    );
  }
);
