import { cn } from "@/lib/utils";

/**
 * PlaceholderImage
 * ------------------------------------------------------------------
 * Stands in for real property photography. Deliberately styled so it
 * never reads as a finished photo (per brand direction: no stock
 * imagery that doesn't resemble the property). Swap for a real
 * <Image> once the CMS media field has an approved asset — see
 * /docs/cms-content-model.md.
 */
export function PlaceholderImage({
  label,
  aspect = "4/3",
  className,
  tone = "sand",
  fill = false,
}: {
  label: string;
  aspect?: "4/3" | "16/9" | "1/1" | "3/4" | "21/9";
  className?: string;
  tone?: "sand" | "ocean" | "sage";
  fill?: boolean;
}) {
  const tones = {
    sand: "bg-[linear-gradient(135deg,var(--color-sand)_0%,var(--color-sand-deep)_100%)] text-ink-700",
    ocean: "bg-[linear-gradient(135deg,var(--color-ocean)_0%,var(--color-ink)_100%)] text-ivory/90",
    sage: "bg-[linear-gradient(135deg,var(--color-sage-100)_0%,var(--color-sage)_100%)] text-ink-700",
  };

  return (
    <div
      role="img"
      aria-label={`Photo placeholder — ${label}`}
      className={cn(
        "flex w-full flex-col items-center justify-center gap-2 overflow-hidden text-center",
        fill
          ? "absolute inset-0 h-full w-full rounded-none border-0 p-4"
          : "relative rounded-[var(--radius-md)] border border-line/70 p-4",
        tones[tone],
        className
      )}
      style={fill ? undefined : { aspectRatio: aspect.replace("/", " / ") }}
    >
      <svg
        aria-hidden="true"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        className="opacity-60"
      >
        <rect x="3" y="6" width="18" height="13" rx="2" />
        <circle cx="12" cy="12.5" r="3.2" />
        <path d="M8 6l1.2-2h5.6L16 6" />
      </svg>
      <span className="max-w-[85%] text-[0.7rem] font-medium uppercase tracking-wide opacity-75">
        Photo pending
      </span>
      <span className="max-w-[90%] text-sm leading-snug opacity-90">{label}</span>
    </div>
  );
}
