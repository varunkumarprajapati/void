import { InputHTMLAttributes, forwardRef, Ref } from "react";
import { cn } from "@/app/utils/cn";

interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  error?: boolean;
  errorMessage?: string;
  type?: string;
}

const BaseInput = forwardRef(
  (
    {
      name,
      placeholder = "",
      error = false,
      errorMessage,
      disabled,
      className,
      type = "text",
      ...props
    }: BaseInputProps,
    ref: Ref<HTMLInputElement>,
  ) => {
    const borderColor = disabled
      ? "border-disabled"
      : error
        ? "border-warning"
        : "border-gray-300";

    const focusStyles = disabled
      ? ""
      : error
        ? "focus:outline-none focus:border-warning"
        : "focus:outline-none focus:border-primary";

    const disabledStyles = disabled
      ? "bg-gray-100 cursor-not-allowed opacity-60"
      : "";

    return (
      <div className="w-full">
        <input
          ref={ref}
          type={type}
          name={name}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "w-full px-4 py-2 border rounded-lg transition-colors focus:outline-none",
            borderColor,
            focusStyles,
            disabledStyles,
            className,
          )}
          {...props}
        />
        {error && errorMessage && (
          <p className="text-warning text-sm mt-1">{errorMessage}</p>
        )}
      </div>
    );
  },
);

BaseInput.displayName = "BaseInput";

export default BaseInput;
