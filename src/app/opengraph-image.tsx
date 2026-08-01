import { ImageResponse } from "next/og";

import { site } from "@/lib/content";

/**
 * Social preview card — this is what renders when the site link is pasted into
 * WhatsApp, LinkedIn or email, which is how most outreach actually reaches
 * people. Generated at build time, so there is no static asset to maintain.
 */
export const alt = `${site.name} — hospital-grade clean air, installed and serviced across India`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#08152b",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        {/* Ambient brand wash */}
        <div
          style={{
            position: "absolute",
            top: -220,
            left: -160,
            width: 720,
            height: 720,
            borderRadius: 999,
            background:
              "radial-gradient(circle, rgba(27,91,255,0.55) 0%, rgba(27,91,255,0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -260,
            right: -140,
            width: 740,
            height: 740,
            borderRadius: 999,
            background:
              "radial-gradient(circle, rgba(20,192,138,0.5) 0%, rgba(20,192,138,0) 70%)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="60" height="60" viewBox="0 0 48 48" fill="none">
            <g
              stroke="#4fe3ad"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="24" cy="24" r="20.5" />
              <path d="M24 5C15.2 13 15.2 26 24 32.5C32.8 26 32.8 13 24 5Z" />
              <path d="M24 20.5C14.3 27.5 14.3 40 24 44.5C33.7 40 33.7 27.5 24 20.5Z" />
              <path d="M24 5V44.5" />
            </g>
          </svg>
          <div style={{ display: "flex", fontSize: 40, fontWeight: 700, letterSpacing: -1 }}>
            {site.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: -2.5,
              maxWidth: 900,
            }}
          >
            Hospital-grade clean air for the spaces that matter.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 26,
              fontSize: 30,
              color: "rgba(255,255,255,0.68)",
              maxWidth: 880,
            }}
          >
            Refer &amp; earn, or book a free on-site air-quality assessment.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          {[
            "< 5 µg/m³ indoor PM2.5",
            "10+ spaces delivered",
            site.coverage,
            `${site.authorization} · ${site.brand}`,
          ].map((chip) => (
            <div
              key={chip}
              style={{
                display: "flex",
                padding: "12px 24px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(255,255,255,0.06)",
                fontSize: 24,
                color: "rgba(255,255,255,0.9)",
              }}
            >
              {chip}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
