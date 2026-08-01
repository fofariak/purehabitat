import { ImageResponse } from "next/og";

/** Home-screen icon for iOS. Same solid treatment as icon.svg, at 180×180. */
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
          background: "linear-gradient(135deg, #1B5BFF 0%, #14C08A 100%)",
        }}
      >
        <svg width="180" height="180" viewBox="0 0 48 48">
          <g transform="translate(24 24) scale(0.74) translate(-24 -24)">
            <path
              d="M24 20.5C14.3 27.5 14.3 40 24 44.5C33.7 40 33.7 27.5 24 20.5Z"
              fill="#ffffff"
              fillOpacity="0.55"
            />
            <path
              d="M24 4C15.2 12 15.2 25 24 31.5C32.8 25 32.8 12 24 4Z"
              fill="#ffffff"
            />
          </g>
        </svg>
      </div>
    ),
    size,
  );
}
