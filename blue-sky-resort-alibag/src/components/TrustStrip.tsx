import { trustBadges } from "@/content/trustBadges";
import { cn } from "@/lib/utils";

export const hasVerifiedTrustBadges = trustBadges.some((b) => b.verified);

/**
 * Only renders badges with `verified: true`. If nothing is verified
 * yet, the whole strip returns null — never show empty badge slots
 * to guests (per truthfulness rules).
 */
export function TrustStrip({ compact = false, className }: { compact?: boolean; className?: string }) {
  const verified = trustBadges.filter((b) => b.verified);
  if (!verified.length) return null;

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-8 gap-y-3",
        compact ? "justify-start" : "justify-center",
        className
      )}
    >
      {verified.map((badge) => (
        <a
          key={badge.id}
          href={badge.linkUrl ?? "#"}
          className="flex items-center gap-2 text-sm font-medium text-charcoal-600 hover:text-ink"
        >
          <span className="text-gold-700">
            {badge.id === "google-rating" ? "★★★★★" : "✓"}
          </span>
          <span>
            {badge.label}
            {badge.displayValue ? ` — ${badge.displayValue}` : ""}
          </span>
        </a>
      ))}
    </div>
  );
}
