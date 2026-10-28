import { NextResponse } from "next/server";
import { getSmtpConfig } from "@/lib/email/smtp";

export const dynamic = "force-dynamic";

/**
 * Health check endpoint for Render service monitoring
 * GET /api/health
 */
export async function GET() {
  const isSmtpConfigured = Boolean(getSmtpConfig());

  return NextResponse.json(
    {
      status: "ok",
      service: "pvg-hotel-api",
      timestamp: new Date().toISOString(),
      smtpReady: isSmtpConfigured,
    },
    { status: 200 }
  );
}
