import Link from "next/link";
import { cn } from "@/lib/utils";
import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-sm)] px-6 py-3 text-[0.95rem] font-medium tracking-wide transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const variants = {
  primary: "bg-ink text-ivory hover:bg-ink-700",
  gold: "bg-gold text-ink hover:bg-gold-700 hover:text-ivory",
  outline: "border border-ink text-ink bg-transparent hover:bg-ink hover:text-ivory",
  outlineLight: "border border-ivory/70 text-ivory bg-transparent hover:bg-ivory hover:text-ink",
  ghost: "text-ink hover:bg-sand",
};

type Variant = keyof typeof variants;

interface CommonProps {
  variant?: Variant;
  className?: string;
}

export function CTALink({
  href,
  children,
  variant = "primary",
  className,
  ...rest
}: CommonProps & { href: string; children: React.ReactNode } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <Link href={href} className={cn(base, variants[variant], className)} {...rest}>
      {children}
    </Link>
  );
}

export function CTAButton({
  children,
  variant = "primary",
  className,
  ...rest
}: CommonProps & { children: React.ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variants[variant], className)} {...rest}>
      {children}
    </button>
  );
}
