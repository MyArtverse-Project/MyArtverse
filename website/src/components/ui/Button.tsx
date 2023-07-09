import { ButtonHTMLAttributes, ReactElement } from "react";
import type { LucideIcon } from "lucide-react";
import { ChildrenNode, ComponentRecord } from "@/types";

interface ButtonProps extends ChildrenNode {
  variant?: "primary" | "secondary" | "error" | "warning" | "custom";
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  disabled?: boolean;
  size?: "small" | "big";
  prefixIcon?: ReactElement<LucideIcon>;
  suffixIcon?: ReactElement<LucideIcon>;
  ariaLabel?: string;
}

// prettier-ignore
type ButtonRecord<P extends keyof ButtonProps, T = string> = ComponentRecord<ButtonProps, P, string, T>

export default function Button({
  children,
  type,
  variant,
  size,
  prefixIcon,
  suffixIcon,
  ariaLabel,
}: ButtonProps) {
  const sizes: ButtonRecord<"size"> = {
    small: "px-2",
    big: "px-5",
  };

  const yes = sizes["small"];

  const variants: ButtonRecord<"variant", string | undefined> = {
    primary: "",
    secondary: "",
    warning: "",
    error: "",
    custom: undefined,
  };

  return (
    <button type={type ?? "button"} aria-label={ariaLabel}>
      {prefixIcon}
      <span id="children-slot">{children}</span>
      {suffixIcon}
    </button>
  );
}
