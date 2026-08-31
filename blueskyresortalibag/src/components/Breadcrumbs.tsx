import Link from "next/link";
import { breadcrumbSchema, JsonLd, BreadcrumbEntry } from "@/lib/schema";

/**
 * Renders below the header, above the page H1. Every ancestor is a
 * link; the current page is plain text with aria-current="page".
 * On mobile, middle crumbs collapse to "…" but remain reachable via
 * the first (Home) link — never the only way back, since the header
 * nav is always present too.
 */
export function Breadcrumbs({ trail }: { trail: BreadcrumbEntry[] }) {
  const full: BreadcrumbEntry[] = [{ name: "Home", path: "/" }, ...trail];

  return (
    <nav aria-label="Breadcrumb" className="border-b border-line/70 bg-ivory">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-1.5 overflow-x-auto px-5 py-3 text-sm sm:px-8 lg:px-12">
        {/* Mobile-compact: Home / … / Current */}
        <ol className="flex items-center gap-1.5 sm:hidden">
          <li>
            <Link href="/" className="text-charcoal-400 hover:text-ink">
              Home
            </Link>
          </li>
          {full.length > 2 && (
            <>
              <Sep />
              <li aria-hidden="true" className="text-charcoal-400">
                …
              </li>
            </>
          )}
          <Sep />
          <li aria-current="page" className="truncate font-medium text-ink">
            {full[full.length - 1].name}
          </li>
        </ol>

        {/* Full trail on larger screens */}
        <ol className="hidden items-center gap-1.5 sm:flex">
          {full.map((crumb, i) => {
            const isLast = i === full.length - 1;
            return (
              <li key={crumb.path} className="flex items-center gap-1.5">
                {i > 0 && <Sep />}
                {isLast ? (
                  <span aria-current="page" className="font-medium text-ink">
                    {crumb.name}
                  </span>
                ) : (
                  <Link href={crumb.path} className="text-charcoal-400 hover:text-ink">
                    {crumb.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
      <JsonLd data={breadcrumbSchema(full)} />
    </nav>
  );
}

function Sep() {
  return (
    <span aria-hidden="true" className="text-charcoal-400/60">
      /
    </span>
  );
}
