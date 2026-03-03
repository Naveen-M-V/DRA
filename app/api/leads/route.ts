import { NextResponse } from "next/server";
import { createSellDoLead } from "@/lib/sellDo";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      srd,
      campaignName,
      subSource,
      project,
      source,
      note,
    } = body || {};

    if (!name || !email || !phone || !srd) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, phone, srd" },
        { status: 400 },
      );
    }

    const result = await createSellDoLead({
      name,
      email,
      phone,
      srd,
      campaignName,
      subSource,
      project,
      source,
      note,
    });
    return NextResponse.json({ success: true, result }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to create lead in Sell.do",
      },
      { status: 500 },
    );
  }
}
