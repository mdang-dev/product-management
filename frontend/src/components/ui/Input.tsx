import {
  Controller,
  FieldError,
  useFormContext,
  UseFormRegisterReturn,
} from "react-hook-form";
import "./style/Input.scss";
import { Ref } from "react";

type InputProps = {
  label?: string;
  placeholder?: string;
  type?: "email" | "password" | "text" | "number" | "file";
  className?: string;
  name?: string;
  ref?: Ref<HTMLInputElement>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function Input({
  label,
  placeholder,
  type = "text",
  className,
  name,
  ref,
  onChange,
}: InputProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="input-group">
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name!}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            type={type}
            placeholder={placeholder}
            className={className}
            ref={ref}
            onChange={onChange}
          />
        )}
      />
      {errors[name!] && (
        <p className="error-message">{(errors[name!] as FieldError).message}</p>
      )}
    </div>
  );
}
