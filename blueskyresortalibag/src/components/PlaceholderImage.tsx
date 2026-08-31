import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * PlaceholderImage
 * ------------------------------------------------------------------
 * Renders a real photo when `src` is provided, and falls back to a
 * clearly-labelled placeholder block when it isn't (per brand
 * direction: never let an unfinished section quietly look finished).
 *
 * `src` is used for two different kinds of image today:
 *  - Real property photography (rooms, once supplied) — no `credit`.
 *  - Free-license stock photography standing in for mood/amenity
 *    shots (pool, garden, café, gatherings, beach) that the resort
 *    hasn't supplied real photos of yet — pass `credit` so the
 *    stock-photo attribution renders as a small caption, and see
 *    /docs/cms-content-model.md for the swap-to-real-photo plan.
 */
export function PlaceholderImage({
  label,
  aspect = "4/3",
  className,
  tone = "sand",
  fill = false,
  src,
  alt,
  isStockOrIllustrative,
}: {
  label: string;
  aspect?: "4/3" | "16/9" | "1/1" | "3/4" | "21/9";
  className?: string;
  tone?: "sand" | "ocean" | "sage";
  fill?: boolean;
  src?: string;
  alt?: string;
  isStockOrIllustrative?: boolean;
}) {
  const tones = {
    sand: "bg-[linear-gradient(135deg,var(--color-sand)_0%,var(--color-sand-deep)_100%)] text-ink-700",
    ocean: "bg-[linear-gradient(135deg,var(--color-ocean)_0%,var(--color-ink)_100%)] text-ivory/90",
    sage: "bg-[linear-gradient(135deg,var(--color-sage-100)_0%,var(--color-sage)_100%)] text-ink-700",
  };

  if (src) {
    return (
      <div
        className={cn(
          "w-full overflow-hidden",
          fill ? "absolute inset-0 h-full w-full rounded-none" : "relative rounded-[var(--radius-md)]",
          className
        )}
        style={fill ? undefined : { aspectRatio: aspect.replace("/", " / ") }}
      >
        <Image
          src={src}
          alt={alt ?? label}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
        {isStockOrIllustrative && (
          <span className="absolute bottom-1.5 right-1.5 rounded bg-ink/55 px-1.5 py-0.5 text-[0.6rem] font-medium uppercase tracking-wide leading-none text-ivory/90">
            Illustrative photo
          </span>
        )}
      </div>
    );
  }

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
