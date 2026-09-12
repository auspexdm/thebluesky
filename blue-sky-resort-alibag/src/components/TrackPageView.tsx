"use client";

import { useEffect } from "react";
import { track, AnalyticsEvent, captureUtms } from "@/lib/analytics";

export function TrackPageView({ event, properties }: { event: AnalyticsEvent; properties?: Record<string, string> }) {
  useEffect(() => {
    captureUtms();
    track(event, properties);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
