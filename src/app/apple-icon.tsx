import { ImageResponse } from "next/og";

/** Home-screen icon for iOS. Same green-on-navy brandmark as icon.svg. */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#16224d",
        }}
      >
        <svg width="180" height="180" viewBox="0 0 48 48">
          <g
            transform="translate(24 24) scale(0.84) translate(-24 -24)"
            stroke="#5ec08f"
            strokeWidth="2.4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="24" cy="24" r="20.5" />
            <path d="M24 5C15.2 13 15.2 26 24 32.5C32.8 26 32.8 13 24 5Z" />
            <path d="M24 20.5C14.3 27.5 14.3 40 24 44.5C33.7 40 33.7 27.5 24 20.5Z" />
            <path d="M24 5V44.5" />
          </g>
        </svg>
      </div>
    ),
    size,
  );
}
