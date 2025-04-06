import {
  Controller,
  FieldError,
  useFormContext,
  UseFormRegisterReturn,
} from "react-hook-form";
import "./style/Input.scss";

type InputProps = {
  lable?: string;
  placeholder?: string;
  type?: "email" | "password" | "text" | "number" | "file";
  className?: string;
  name?: string;
};

export function Input({
  lable,
  placeholder,
  type = "text",
  className,
  name,
}: InputProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="input-group">
      <label htmlFor={name}>{lable}</label>
      <Controller
        name={name!}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            type={type}
            placeholder={placeholder}
            className={className}
          />
        )}
      />
      {errors[name!] && (
        <p className="error-message">{(errors[name!] as FieldError).message}</p>
      )}
    </div>
  );
}
