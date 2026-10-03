const stats = [
  { value: "10+", label: "Years in Tech" },
  { value: "50+", label: "Projects Delivered" },
  { value: "1000+", label: "Professionals Trained" },
  { value: "3", label: "Companies Built" },
];

export default function SocialProof() {
  return (
    <section className="border-y border-[var(--color-border)] bg-[var(--color-bg)] py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl sm:text-4xl font-bold text-[var(--color-text)]">{stat.value}</p>
              <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
