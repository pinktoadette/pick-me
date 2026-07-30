import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const runtime = "nodejs";
export const alt = "Pick Me — a little no-pressure game";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const bytes = readFileSync(join(process.cwd(), "public/stickers/card-game.png"));
  const sticker = `data:image/png;base64,${bytes.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(150deg, #f4c2c2 0%, #c2dbf4 48%, #c2f4f4 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <img src={sticker} width="300" height="300" alt="" />
        <div
          style={{
            fontSize: 104,
            fontWeight: 900,
            color: "#5a4747",
            letterSpacing: "-2px",
            marginTop: 6,
          }}
        >
          Pick Me
        </div>
        <div
          style={{
            fontSize: 38,
            color: "#8a7676",
            marginTop: 8,
            display: "flex",
          }}
        >
          Tap a card — let chance pick the plan.
        </div>
      </div>
    ),
    { ...size }
  );
}
