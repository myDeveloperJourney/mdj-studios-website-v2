import Button from "@/components/ui/Button";

interface CTABannerProps {
  title: string;
  description?: string;
  buttonText: string;
  buttonHref: string;
  variant?: "primary" | "accent";
}

export default function CTABanner({
  title,
  description,
  buttonText,
  buttonHref,
  variant = "primary",
}: CTABannerProps) {
  const bgClass =
    variant === "accent"
      ? "bg-[var(--color-accent)]"
      : "bg-[var(--color-primary)]";

  return (
    <section className={`${bgClass} py-16`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          {title}
        </h2>
        {description && (
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">{description}</p>
        )}
        <Button
          href={buttonHref}
          variant={variant === "accent" ? "primary" : "secondary"}
          size="lg"
          className={
            variant === "accent"
              ? ""
              : "!border-white !text-white hover:!bg-white/10"
          }
        >
          {buttonText}
        </Button>
      </div>
    </section>
  );
}
