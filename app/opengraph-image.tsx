import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "おみくじコネクト | 毎日1問・運勢パズル";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0d0d1a 0%, #1a1030 50%, #0d0d1a 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        {/* Gold top bar */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 8, background: "#fbbf24" }} />

        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <div style={{ fontSize: 88, lineHeight: 1 }}>おみくじ</div>
          <div style={{ fontSize: 64, fontWeight: 900, color: "#fbbf24", letterSpacing: "-2px" }}>
            おみくじコネクト
          </div>
          <div style={{ fontSize: 28, color: "#fde68a", fontWeight: 700 }}>
            毎日1問 — 運勢ワードを正しく分類しよう！
          </div>
          <div
            style={{
              marginTop: 20,
              display: "flex",
              gap: 12,
            }}
          >
            {["仕事運", "恋愛運", "健康運", "金運"].map((cat) => (
              <div
                key={cat}
                style={{
                  background: "rgba(251,191,36,0.2)",
                  border: "1px solid rgba(251,191,36,0.5)",
                  borderRadius: 12,
                  padding: "8px 20px",
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#fbbf24",
                }}
              >
                {cat}
              </div>
            ))}
          </div>
          <div
            style={{
              marginTop: 20,
              background: "linear-gradient(135deg, #fbbf24, #d97706)",
              borderRadius: 16,
              padding: "12px 40px",
              fontSize: 24,
              fontWeight: 900,
              color: "#1a0a00",
            }}
          >
            今日のおみくじを引く
          </div>
        </div>

        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            fontSize: 20,
            color: "rgba(251,191,36,0.4)",
          }}
        >
          omikuji-connect.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}
