"use client";

import { useMemo, useState } from "react";
import { Room } from "@/content/types";
import { RoomCard } from "./RoomCard";

export function RoomFilterGrid({ rooms }: { rooms: Room[] }) {
  const labels = useMemo(() => {
    const set = new Set(rooms.map((r) => r.positioningLabel.value));
    return ["All", ...Array.from(set)];
  }, [rooms]);

  const [active, setActive] = useState("All");
  const filtered = active === "All" ? rooms : rooms.filter((r) => r.positioningLabel.value === active);

  return (
    <div>
      {labels.length > 2 && (
        <div role="group" aria-label="Filter rooms" className="flex flex-wrap gap-2">
          {labels.map((label) => (
            <button
              key={label}
              type="button"
              onClick={() => setActive(label)}
              aria-pressed={active === label}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                active === label
                  ? "border-ink bg-ink text-ivory"
                  : "border-line text-charcoal-600 hover:border-ink"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((room) => (
          <RoomCard key={room.slug} room={room} />
        ))}
      </div>
    </div>
  );
}
