import { ImageResponse } from "next/og";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  let name = "Abdelhamid Bezzot";
  let role = "Full-stack developer · Applied AI";

  try {
    const s = await prisma.siteSettings.findUnique({ where: { id: "main" } });
    if (s?.heroName) name = s.heroName;
    if (s?.heroRoleEn) role = s.heroRoleEn;
  } catch {
    // fall through to defaults
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#3C422E",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 72px",
          fontFamily: "serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background decorative text */}
        <div
          style={{
            position: "absolute",
            right: -20,
            bottom: -40,
            fontSize: 340,
            fontWeight: 900,
            color: "rgba(161,181,41,0.10)",
            letterSpacing: "-0.08em",
            lineHeight: 1,
            display: "flex",
          }}
        >
          AB
        </div>

        {/* Top brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span
            style={{
              fontSize: 28,
              fontWeight: 900,
              color: "#D1E030",
              letterSpacing: "-0.04em",
            }}
          >
            AB_
          </span>
          <span
            style={{
              width: 2,
              height: 22,
              background: "rgba(255,255,255,0.3)",
              display: "flex",
            }}
          />
          <span
            style={{
              fontSize: 14,
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Portfolio
          </span>
        </div>

        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 86,
              fontWeight: 900,
              color: "#FFFFFF",
              letterSpacing: "-0.05em",
              lineHeight: 0.88,
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#D1E030",
              letterSpacing: "0.02em",
              display: "flex",
            }}
          >
            {role}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid rgba(255,255,255,0.15)",
            paddingTop: 24,
          }}
        >
          <span
            style={{
              fontSize: 14,
              color: "rgba(255,255,255,0.45)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            Fès, Morocco
          </span>
          <span
            style={{
              fontSize: 14,
              color: "rgba(255,255,255,0.45)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            abdelhamidbezzot.dev
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
