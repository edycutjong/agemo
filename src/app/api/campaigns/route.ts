import { NextResponse } from "next/server";
import { SEED_CAMPAIGNS } from "@/lib/torque";

export async function GET() {
  return NextResponse.json({
    campaigns: SEED_CAMPAIGNS,
    total: SEED_CAMPAIGNS.length,
    activeSpend: SEED_CAMPAIGNS.reduce((sum, c) => {
      const val = parseFloat(c.budget.replace(/[$,]/g, ""));
      return sum + (isNaN(val) ? 0 : val);
    }, 0),
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const newCampaign = {
    id: Date.now(),
    name: body.name || "New Campaign",
    status: "Active",
    budget: body.budget || "$0",
    cac: "N/A",
    roi: "N/A",
    conversions: 0,
    impressions: 0,
    rewardType: body.rewardType || "SOL",
  };
  return NextResponse.json(newCampaign, { status: 201 });
}
