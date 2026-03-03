"use client";

import { FormEvent, useState } from "react";

type VerificationFormProps = {
  projectFormId: string;
  projectName: string;
  srd: string;
  campaignName: string;
  source?: string;
};

export default function VerificationForm({
  projectFormId,
  projectName,
  srd,
  campaignName,
  source,
}: VerificationFormProps) {
  const [step, setStep] = useState<"email" | "code" | "form">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
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

      setSuccess("Email verified! Proceeding to form...");
      setTimeout(() => setStep("form"), 1500);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch("/api/leads/verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "submit",
          name,
          email,
          phone,
          code,
          srd,
          campaignName,
          project: projectName,
          source,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to submit form");
        setLoading(false);
        return;
      }

      setSuccess("Thank you! We'll contact you soon.");
      setName("");
      setEmail("");
      setPhone("");
      setCode("");
      setStep("email");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-lg border border-[#FFB800] bg-white p-6">
      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-red-700">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 rounded-lg bg-green-50 p-3 text-green-700">
          {success}
        </div>
      )}

      {step === "email" && (
        <form onSubmit={handleSendCode} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 focus:border-[#FFB800] focus:outline-none"
              placeholder="your.email@example.com"
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-[#073a2f] py-2 px-4 text-white font-medium hover:bg-[#052a22] disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Verification Code"}
          </button>
        </form>
      )}

      {step === "code" && (
        <form onSubmit={handleVerifyCode} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Verification Code
            </label>
            <input
              type="text"
              required
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              className="w-full rounded border border-gray-300 px-4 py-2 text-center text-2xl tracking-widest text-gray-900 placeholder-gray-400 focus:border-[#FFB800] focus:outline-none"
              placeholder="000000"
              disabled={loading}
            />
            <p className="mt-1 text-xs text-gray-500">
              Enter the 6-digit code sent to {email}
            </p>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-[#073a2f] py-2 px-4 text-white font-medium hover:bg-[#052a22] disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify Code"}
          </button>
          <button
            type="button"
            onClick={() => setStep("email")}
            className="w-full rounded border border-gray-300 py-2 px-4 text-gray-700 font-medium hover:bg-gray-50"
          >
            Back
          </button>
        </form>
      )}

      {step === "form" && (
        <form onSubmit={handleSubmitForm} className="space-y-4">
          <p className="text-sm text-gray-600">Complete your information</p>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 focus:border-[#FFB800] focus:outline-none"
              placeholder="Your name"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 focus:border-[#FFB800] focus:outline-none"
              placeholder="+91 XXXXXXXXXX"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-[#073a2f] py-2 px-4 text-white font-medium hover:bg-[#052a22] disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
          <button
            type="button"
            onClick={() => setStep("email")}
            className="w-full rounded border border-gray-300 py-2 px-4 text-gray-700 font-medium hover:bg-gray-50"
          >
            Back
          </button>
        </form>
      )}
    </div>
  );
}
