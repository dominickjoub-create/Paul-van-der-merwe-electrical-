import { site } from "@/lib/site";

/**
 * The PVM lightning-bulb mark, redrawn as clean vector art.
 * A lightbulb silhouette with a lightning-bolt filament and a screw base.
 */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label={`${site.name} logo`}
      fill="none"
    >
      {/* Bulb glass */}
      <path
        d="M32 5c-11 0-19.5 8.3-19.5 18.8 0 6.7 3.4 11.5 6.9 15 2.2 2.2 3.4 4 3.9 6.2h17.4c.5-2.2 1.7-4 3.9-6.2 3.5-3.5 6.9-8.3 6.9-15C51.5 13.3 43 5 32 5Z"
        stroke="#FFC400"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />
      {/* Screw base */}
      <path
        d="M24 51h16M25.5 56h13M28 60.5h8"
        stroke="#FFC400"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      {/* Lightning-bolt filament */}
      <path
        d="M34.5 15 24 33.5h7.5L29 47l11.5-19.5H33L34.5 15Z"
        fill="#FFC400"
      />
    </svg>
  );
}

/** Full lock-up: mark + stacked wordmark. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-9 w-9 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.05rem] font-extrabold tracking-tight text-chalk">
          Paul van der Merwe
        </span>
        <span className="font-mono text-[0.62rem] font-medium uppercase tracking-[0.42em] text-bolt">
          Electrical
        </span>
      </span>
    </span>
  );
}
