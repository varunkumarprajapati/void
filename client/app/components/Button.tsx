import { LucideLoaderPinwheel } from "lucide-react";
import { ButtonHTMLAttributes } from "react";
import { cn } from "../utils/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: "default" | "outline";
}
export default function Button({
  loading = false,
  children,
  disabled = false,
  variant = "default",
  ...props
}: ButtonProps) {
  if (loading) disabled = true;
  return (
    <button
      {...props}
      disabled={loading || disabled}
      className={cn(
        "flex justify-center w-full py-2 px-4 font-semibold rounded-lg transition-colors",
        "disabled:bg-disabled disabled:text-gray-500 disabled:cursor-not-allowed",
        variant == "default" && "bg-primary hover:bg-primary text-black",
        variant == "outline" &&
          "bg-transparent border border-gray-300 text-black",
      )}
    >
      {loading ? <LucideLoaderPinwheel className="animate-spin " /> : children}
    </button>
  );
}
