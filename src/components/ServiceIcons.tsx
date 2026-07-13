import type { ServiceId } from "@/lib/site";

const common = {
  width: 26,
  height: 26,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function ServiceIcon({ id }: { id: ServiceId }) {
  switch (id) {
    case "residential":
      return (
        <svg {...common} aria-hidden>
          <path d="M3 11.5 12 4l9 7.5" />
          <path d="M5 10v9h14v-9" />
          <path d="M10 19v-5h4v5" />
        </svg>
      );
    case "commercial":
      return (
        <svg {...common} aria-hidden>
          <path d="M4 20V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v15" />
          <path d="M15 9h4a1 1 0 0 1 1 1v10" />
          <path d="M4 20h16" />
          <path d="M7.5 7.5h.5M11 7.5h.5M7.5 11h.5M11 11h.5M7.5 14.5h.5M11 14.5h.5" />
        </svg>
      );
    case "industrial":
      return (
        <svg {...common} aria-hidden>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
        </svg>
      );
    case "fault-finding":
      return (
        <svg {...common} aria-hidden>
          <path d="M13 3 5 13h5l-1 8 8-11h-5l1-7Z" />
        </svg>
      );
    case "led":
      return (
        <svg {...common} aria-hidden>
          <path d="M9 18h6" />
          <path d="M10 21h4" />
          <path d="M12 3a6 6 0 0 0-4 10.5c.8.8 1.3 1.6 1.5 2.5h5c.2-.9.7-1.7 1.5-2.5A6 6 0 0 0 12 3Z" />
        </svg>
      );
    case "fencing":
      return (
        <svg {...common} aria-hidden>
          <path d="M5 21V7l2-2 2 2v14M15 21V7l2-2 2 2v14" />
          <path d="M5 11h14M5 15h14" />
        </svg>
      );
    case "solar":
      return (
        <svg {...common} aria-hidden>
          <circle cx="12" cy="8" r="3" />
          <path d="M12 2v1M12 13v1M6 8H5M19 8h-1M7.5 3.5l.7.7M16.5 3.5l-.7.7" />
          <path d="M5 21h14l-1.5-5H6.5L5 21Z" />
          <path d="M9.5 16 9 21M14.5 16l.5 5" />
        </svg>
      );
  }
}
