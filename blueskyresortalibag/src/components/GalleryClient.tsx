"use client";

import { useEffect, useRef, useState } from "react";
import { GalleryImage } from "@/content/types";
import { galleryCategories } from "@/content/gallery";
import { PlaceholderImage } from "./PlaceholderImage";
import { track } from "@/lib/analytics";

export function GalleryClient({ images }: { images: GalleryImage[] }) {
  const [category, setCategory] = useState<string>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const filtered = category === "all" ? images : images.filter((i) => i.category === category);

  function openAt(index: number, trigger: HTMLButtonElement) {
    triggerRef.current = trigger;
    setOpenIndex(index);
    track("gallery_open", { imageId: filtered[index]?.id, category });
  }

  function close() {
    setOpenIndex(null);
    triggerRef.current?.focus();
  }

  useEffect(() => {
    if (openIndex !== null) closeRef.current?.focus();
    document.body.style.overflow = openIndex !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [openIndex]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (openIndex === null) return;
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key === "ArrowRight") setOpenIndex((i) => (i === null ? i : Math.min(i + 1, filtered.length - 1)));
      if (e.key === "ArrowLeft") setOpenIndex((i) => (i === null ? i : Math.max(i - 1, 0)));
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>("button:not(:disabled)");
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, filtered.length]);

  return (
    <div>
      <div role="group" aria-label="Filter gallery by category" className="flex flex-wrap gap-2">
        {galleryCategories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setCategory(cat.id)}
            aria-pressed={category === cat.id}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              category === cat.id ? "border-ink bg-ink text-ivory" : "border-line text-charcoal-600 hover:border-ink"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="mt-8 columns-2 gap-3 sm:columns-3 lg:columns-4 [&>*]:mb-3">
        {filtered.map((img, i) => (
          <button
            key={img.id}
            type="button"
            onClick={(e) => openAt(i, e.currentTarget)}
            className="block w-full break-inside-avoid text-left"
            aria-label={`Open image: ${img.altText}`}
          >
            <PlaceholderImage label={img.placeholderLabel} aspect={i % 5 === 0 ? "3/4" : "4/3"} />
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-8 text-sm text-charcoal-600">No images in this category yet.</p>
      )}

      {openIndex !== null && filtered[openIndex] && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Image: ${filtered[openIndex].altText}`}
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-ink/95 p-4"
        >
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-ivory/40 text-ivory focus-visible:outline-ivory"
            aria-label="Close image viewer"
          >
            ✕
          </button>

          <div className="flex w-full max-w-3xl items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setOpenIndex((i) => (i === null ? i : Math.max(i - 1, 0)))}
              disabled={openIndex === 0}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ivory/40 text-ivory disabled:opacity-30"
              aria-label="Previous image"
            >
              ←
            </button>

            <div className="w-full max-w-xl">
              <PlaceholderImage label={filtered[openIndex].placeholderLabel} aspect="4/3" tone="ocean" />
              {filtered[openIndex].caption && (
                <p className="mt-3 text-center text-sm text-ivory/80">{filtered[openIndex].caption}</p>
              )}
            </div>

            <button
              type="button"
              onClick={() => setOpenIndex((i) => (i === null ? i : Math.min(i + 1, filtered.length - 1)))}
              disabled={openIndex === filtered.length - 1}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ivory/40 text-ivory disabled:opacity-30"
              aria-label="Next image"
            >
              →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
