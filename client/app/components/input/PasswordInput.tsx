"use client";

import { useState, InputHTMLAttributes, useRef, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import BaseInput from "./BaseInput";

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  placeholder?: string;
  error?: boolean;
  errorMessage?: string;
}

export default function PasswordInput({
  name,
  placeholder = "",
  error = false,
  errorMessage,
  ...props
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Sync input type with showPassword state
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.type = showPassword ? "text" : "password";
    }
  }, [showPassword]);

  return (
    <div className="relative w-full">
      <BaseInput
        ref={inputRef}
        name={name}
        placeholder={placeholder}
        error={error}
        errorMessage={errorMessage}
        type="password"
        className="pr-10"
        {...props}
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 focus:outline-none"
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  );
}
