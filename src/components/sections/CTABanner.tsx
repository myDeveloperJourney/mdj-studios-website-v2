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
}: CTABannerProps) {
  return (
    <section className="border-y border-[var(--color-border)] bg-[var(--color-bg)] py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-text)] mb-3">
          {title}
        </h2>
        {description && (
          <p className="text-[var(--color-text-secondary)] mb-6 max-w-2xl mx-auto">{description}</p>
        )}
        <Button href={buttonHref} variant="primary" size="lg">
          {buttonText}
        </Button>
      </div>
    </section>
  );
}
