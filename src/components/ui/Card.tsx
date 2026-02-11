import Image from "next/image";
import Link from "next/link";

interface CardProps {
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  href?: string;
  external?: boolean;
  children?: React.ReactNode;
}

export default function Card({
  title,
  description,
  imageSrc,
  imageAlt,
  href,
  external = false,
  children,
}: CardProps) {
  const cardContent = (
    <div
      className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]
                 overflow-hidden transition-all duration-200
                 hover:shadow-lg hover:border-[var(--color-primary)] hover:-translate-y-1"
    >
      {imageSrc && (
        <div className="relative w-full aspect-video overflow-hidden">
          <Image
            src={imageSrc}
            alt={imageAlt || title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
          {description}
        </p>
        {children}
      </div>
    </div>
  );

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {cardContent}
        </a>
      );
    }
    return <Link href={href}>{cardContent}</Link>;
  }

  return cardContent;
}
