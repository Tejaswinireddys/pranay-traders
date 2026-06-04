import { BUSINESS } from "@/lib/business";

export function Logo({
  className = "",
  showText = true,
}: {
  className?: string;
  showText?: boolean;
}) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`} data-testid="logo">
      <svg
        width="38"
        height="38"
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect width="40" height="40" rx="9" fill="hsl(24 14% 14%)" />
        {/* charcoal block */}
        <path
          d="M9 27.5 L15.5 13 L21 24 L13.5 27.5 Z"
          fill="hsl(28 10% 35%)"
        />
        {/* flame */}
        <path
          d="M24 28c-3.2 0-5.4-2.2-5.4-5.1 0-2.6 1.7-4.2 2.7-6.1.5 1.1 1 1.7 1.7 2.2.2-2.5 1.4-4.6 3.4-6.2-.4 2.1.3 3.4 1.4 4.7 1.3 1.5 2.3 3 2.3 5.4 0 3-2.4 5.1-6.1 5.1Z"
          fill="hsl(24 92% 52%)"
        />
        <path
          d="M24.3 27.4c-1.8 0-3-1.2-3-2.8 0-1.5 1.1-2.5 1.7-3.6.3.7.6 1 1 1.3.2-1.5.9-2.7 2.1-3.7-.2 1.3.2 2 .9 2.8.8.9 1.4 1.8 1.4 3.2 0 1.7-1.5 2.8-4.1 2.8Z"
          fill="hsl(38 92% 62%)"
        />
      </svg>
      {showText && (
        <div className="leading-none">
          <span className="block font-display font-extrabold tracking-tight text-foreground text-[1.05rem]">
            {BUSINESS.name}
          </span>
          <span className="block text-[0.65rem] font-medium uppercase tracking-[0.14em] text-primary">
            Wood Charcoal Trading
          </span>
        </div>
      )}
    </div>
  );
}
