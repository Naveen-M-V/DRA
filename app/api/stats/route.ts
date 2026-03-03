import { NextResponse } from "next/server";
import { getLeadStats, getLeadsByProject, getLeadsByCampaign } from "@/lib/leadsStorage";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const filter = searchParams.get("filter");
    const value = searchParams.get("value");

    if (filter === "project" && value) {
      const leads = getLeadsByProject(value);
      return NextResponse.json({ leads, count: leads.length }, { status: 200 });
    }

    if (filter === "campaign" && value) {
      const leads = getLeadsByCampaign(value);
      return NextResponse.json({ leads, count: leads.length }, { status: 200 });
    }

    const stats = getLeadStats();
    return NextResponse.json(stats, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to fetch stats",
      },
      { status: 500 },
    );
  }
}
