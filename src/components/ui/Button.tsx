import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "ghost" | "accent";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] shadow-sm",
  secondary:
    "border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]",
  ghost:
    "text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]",
  accent:
    "bg-[var(--color-accent)] text-gray-900 hover:bg-[var(--color-accent-hover)] shadow-sm font-semibold",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm rounded-md",
  md: "px-5 py-2.5 text-sm rounded-lg",
  lg: "px-7 py-3 text-base rounded-lg",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center font-medium transition-colors
    ${variantClasses[variant]} ${sizeClasses[size]}
    ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
    ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
}
