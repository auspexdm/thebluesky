import { ImageResponse } from "next/og";

export const alt = "The Blue Sky Resort Alibag";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Brand-only social preview (typography + palette, no photography) —
 * safe to ship before real property photos are approved. Replace
 * with photography-based per-page images once available; add
 * opengraph-image.tsx files to individual route segments (e.g.
 * app/stay/opengraph-image.tsx) for page-specific previews.
 */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #123A5C 0%, #1F5F9E 100%)",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 6, color: "#F0B030", textTransform: "uppercase" }}>
          The Blue Sky Resort · Alibag
        </div>
        <div style={{ fontSize: 72, color: "#FBF7EF", marginTop: 24, lineHeight: 1.1, display: "flex" }}>
          A slower, sunnier stay
        </div>
        <div style={{ fontSize: 72, color: "#FBF7EF", lineHeight: 1.1, display: "flex" }}>
          near Varsoli Beach.
        </div>
      </div>
    ),
    { ...size }
  );
}
