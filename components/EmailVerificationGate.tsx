"use client";

import { FormEvent, useState } from "react";
import Script from "next/script";

type EmailVerificationGateProps = {
  formId: string;
  projectName: string;
  srd: string;
  campaignName: string;
  source?: string;
};

export default function EmailVerificationGate({
  formId,
  projectName,
  srd,
  campaignName,
  source,
}: EmailVerificationGateProps) {
  const [step, setStep] = useState<"email" | "code" | "verified">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSendCode = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch("/api/leads/verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "send-code", email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to send code");
        setLoading(false);
        return;
      }

      setSuccess("Verification code sent! Check your email.");
      setStep("code");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch("/api/leads/verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "verify-code", email, code }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Invalid code");
        setLoading(false);
        return;
      }

      setSuccess("Email verified! Loading form...");
      setTimeout(() => setStep("verified"), 1500);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred",
      );
    } finally {
      setLoading(false);
    }
  };

  // Before verification
  if (step !== "verified") {
    return (
      <div className="w-full max-w-[450px] rounded-2xl border border-yellow-500/30 bg-[#073126]/95 p-5 shadow-2xl backdrop-blur lg:max-w-[400px]">
        <h2 className="text-center text-xl font-bold font-serif-display sm:text-2xl xl:text-3xl">
          Verify Email First
        </h2>
        <div className="mx-auto mt-2 h-1 w-16 rounded bg-[#FFB800] sm:mt-3 sm:w-20" />

        {error && (
          <div className="mt-4 rounded-lg bg-red-50/10 p-3 text-red-300 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="mt-4 rounded-lg bg-green-50/10 p-3 text-green-300 text-sm">
            {success}
          </div>
        )}

        {step === "email" && (
          <form onSubmit={handleSendCode} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded border border-gray-400/30 bg-[#062f27] px-4 py-2 text-white placeholder-gray-500 focus:border-[#FFB800] focus:outline-none"
                placeholder="your.email@example.com"
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded bg-[#FFB800] py-2 px-4 text-[#073a2f] font-bold hover:bg-yellow-400 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Code"}
            </button>
          </form>
        )}

        {step === "code" && (
          <form onSubmit={handleVerifyCode} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                6-Digit Code
              </label>
              <input
                type="text"
                required
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                className="w-full rounded border border-gray-400/30 bg-[#062f27] px-4 py-2 text-center text-2xl tracking-widest text-white placeholder-gray-500 focus:border-[#FFB800] focus:outline-none"
                placeholder="000000"
                disabled={loading}
              />
              <p className="mt-1 text-xs text-gray-400">
                Sent to {email}
              </p>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded bg-[#FFB800] py-2 px-4 text-[#073a2f] font-bold hover:bg-yellow-400 disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify"}
            </button>
            <button
              type="button"
              onClick={() => {
                setStep("email");
                setCode("");
                setError("");
              }}
              className="w-full rounded border border-gray-400/30 py-2 px-4 text-gray-300 font-medium hover:bg-[#0a4a3b]"
            >
              Back
            </button>
          </form>
        )}
      </div>
    );
  }

  // After verification - show Sell.do form
  return (
    <div className="w-full max-w-[450px] rounded-2xl border border-yellow-500/30 bg-[#073126]/95 p-5 shadow-2xl backdrop-blur lg:max-w-[400px]">
      <h2 className="text-center text-xl font-bold font-serif-display sm:text-2xl xl:text-3xl">
        Get Launch Price Details
      </h2>
      <div className="mx-auto mt-2 h-1 w-16 rounded bg-[#FFB800] sm:mt-3 sm:w-20" />

      <div id={`sell-do-form-${formId}`} className="mt-4 sm:mt-6" />
      <Script id={`sell-do-embed-${formId}`} strategy="afterInteractive">
        {`(function(){
          var container = document.getElementById('sell-do-form-${formId}');
          if (!container) return;
          container.innerHTML = '';
          var script = document.createElement('script');
          script.src = 'https://forms.cdn.sell.do/t/forms/5ba883447c0dac3321d9f483/${formId}.js';
          script.setAttribute('data-form-id', '${formId}');
          script.async = true;
          container.appendChild(script);
        })();`}
      </Script>
    </div>
  );
}
