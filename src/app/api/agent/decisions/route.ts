import { NextResponse } from "next/server";
import { SEED_DECISIONS } from "@/lib/torque";

export async function GET() {
  return NextResponse.json({
    decisions: SEED_DECISIONS,
    total: SEED_DECISIONS.length,
    applied: SEED_DECISIONS.filter(d => d.applied).length,
    pending: SEED_DECISIONS.filter(d => !d.applied).length,
    avgConfidence: SEED_DECISIONS.reduce((s, d) => s + d.confidence, 0) / SEED_DECISIONS.length,
  });
}
