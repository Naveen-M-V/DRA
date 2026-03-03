import { NextResponse } from "next/server";
import { sendVerificationCode } from "@/lib/emailService";
import {
  generateVerificationCode,
  storeVerificationCode,
  verifyCode,
} from "@/lib/verificationCode";
import { saveLead } from "@/lib/leadsStorage";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, email, code, name, phone, srd, campaignName, project, source } =
      body || {};

    if (action === "send-code") {
      if (!email) {
        return NextResponse.json(
          { error: "Email is required" },
          { status: 400 },
        );
      }

      const verificationCode = generateVerificationCode();
      storeVerificationCode(email, verificationCode);

      try {
        await sendVerificationCode(email, verificationCode);
        return NextResponse.json(
          { success: true, message: "Verification code sent to email" },
          { status: 200 },
        );
      } catch (emailError) {
        return NextResponse.json(
          {
            error:
              emailError instanceof Error
                ? emailError.message
                : "Failed to send verification email",
          },
          { status: 500 },
        );
      }
    }

    if (action === "verify-code") {
      if (!email || !code) {
        return NextResponse.json(
          { error: "Email and code are required" },
          { status: 400 },
        );
      }

      const isValid = verifyCode(email, code);
      if (!isValid) {
        return NextResponse.json(
          { error: "Invalid or expired verification code" },
          { status: 400 },
        );
      }

      // Store email as verified in response for client-side tracking
      return NextResponse.json(
        { success: true, message: "Email verified successfully", verifiedEmail: email },
        { status: 200 },
      );
    }

    // Log Sell.do submissions
    if (action === "log-submission") {
      if (!name || !email || !phone || !srd) {
        return NextResponse.json(
          { error: "Missing required fields: name, email, phone, srd" },
          { status: 400 },
        );
      }

      try {
        const leadRecord = saveLead({
          name,
          email,
          phone,
          srd,
          project: project || "Unknown",
          campaignName: campaignName || "Direct",
        });

        return NextResponse.json(
          {
            success: true,
            leadId: leadRecord.id,
            message: "Lead logged successfully",
          },
          { status: 200 },
        );
      } catch (error) {
        return NextResponse.json(
          {
            error:
              error instanceof Error ? error.message : "Failed to log lead",
          },
          { status: 500 },
        );
      }
    }

    return NextResponse.json(
      { error: "Invalid action" },
      { status: 400 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 },
    );
  }
}
