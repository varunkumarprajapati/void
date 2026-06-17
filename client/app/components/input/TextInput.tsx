import BaseInput from "./BaseInput";
import { InputHTMLAttributes } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  placeholder?: string;
  error?: boolean;
  errorMessage?: string;
}

export default function TextInput({
  name,
  placeholder = "",
  error = false,
  errorMessage,
  ...props
}: TextInputProps) {
  return (
    <BaseInput
      type="text"
      name={name}
      placeholder={placeholder}
      error={error}
      errorMessage={errorMessage}
      {...props}
    />
  );
}
