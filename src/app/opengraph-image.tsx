import { ImageResponse } from "next/og";

export const alt = "Teridox: web development, mobile apps, and AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#1e60d6",
          color: "#fff",
        }}
      >
        <div style={{ fontSize: 40, fontWeight: 700 }}>Teridox</div>
        <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1.05, marginTop: 24 }}>
          Web development, mobile apps, and AI.
        </div>
      </div>
    ),
    size,
  );
}
