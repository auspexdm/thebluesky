"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export interface AccordionItemData {
  id: string;
  question: string;
  answer: string;
}

/**
 * Closed by default, keyboard accessible (native <details>/<summary>
 * gives us this for free, including Enter/Space toggling and
 * screen-reader semantics).
 */
export function Accordion({ items }: { items: AccordionItemData[] }) {
  if (!items.length) {
    return (
      <p className="rounded-[var(--radius-md)] border border-line bg-sand/40 p-5 text-sm text-charcoal-600">
        Answers for this section are being finalized with the resort team. In the
        meantime, please reach out directly via the Location &amp; Contact page.
      </p>
    );
  }

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <AccordionRow key={item.id} item={item} />
      ))}
    </div>
  );
}

function AccordionRow({ item }: { item: AccordionItemData }) {
  const [open, setOpen] = useState(false);
  return (
    <details
      className="group py-1"
      open={open}
      onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}
    >
      <summary
        className={cn(
          "flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left text-base font-medium text-ink marker:content-none"
        )}
      >
        {item.question}
        <span
          aria-hidden="true"
          className={cn(
            "shrink-0 text-xl font-light text-sage-700 transition-transform duration-200",
            open && "rotate-45"
          )}
        >
          +
        </span>
      </summary>
      <div className="pb-4 pr-8 text-sm leading-relaxed text-charcoal-600">{item.answer}</div>
    </details>
  );
}
