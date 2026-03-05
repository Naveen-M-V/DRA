"use client";

import { FormEvent, useState } from "react";
import Script from "next/script";

type EmailVerificationGateProps = {
  formId: string;
  projectName: string;
  srd: string;
  campaignName: string;
  source?: string;
  pixelId: string;
};

export default function EmailVerificationGate({
  formId,
  projectName,
  srd,
  campaignName,
  source,
  pixelId,
}: EmailVerificationGateProps) {
  const [step, setStep] = useState<"email" | "code" | "verified">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [consentChecked, setConsentChecked] = useState(false);

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
          Enquire Now
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

      {/* Sell.do form — submit button disabled until consent is ticked */}
      <div id={`sell-do-form-${formId}`} className="mt-4 sm:mt-6" />

      {/* Consent checkbox — must be ticked before submit is enabled */}
      <label className="mt-4 flex cursor-pointer items-start gap-2.5">
        <input
          type="checkbox"
          checked={consentChecked}
          onChange={(e) => {
            const checked = e.target.checked;
            setConsentChecked(checked);
            // Directly enable / disable the Sell.do submit button
            const container = document.getElementById(`sell-do-form-${formId}`);
            const btn = container?.querySelector<HTMLButtonElement>(
              'button[type="submit"], input[type="submit"], button.submit'
            );
            if (btn) {
              btn.disabled = !checked;
              btn.style.opacity = checked ? "1" : "0.4";
              btn.style.cursor = checked ? "pointer" : "not-allowed";
            }
          }}
          className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-yellow-400"
        />
        <span className="text-[10px] leading-snug text-white/55">
          By pressing submit, I authorize DRA Homes and its representatives to call, SMS, RCS,
          email, or WhatsApp me about its products and offers. This consent overrides any
          registration for DNC/NDNC.
        </span>
      </label>

      <Script id={`sell-do-embed-${formId}`} strategy="afterInteractive">
        {`(function(){
          var container = document.getElementById('sell-do-form-${formId}');
          if (!container) return;
          container.innerHTML = '';

          // Hide the project/campaign title Sell.do injects at the top of the form.
          // We use a MutationObserver so it catches the node no matter what tag or
          // class name Sell.do uses — we simply look for the first text-bearing
          // element whose content matches the known project name patterns.
          var titleObserver = new MutationObserver(function() {
            var projectNames = ['dra secura', 'dra inara', 'dra securari', 'secura', 'inara', 'securari'];
            var candidates = container.querySelectorAll('h1, h2, h3, h4, p, div, span, label');
            candidates.forEach(function(el) {
              var text = (el.textContent || '').trim().toLowerCase();
              var isTitle = projectNames.some(function(name) { return text === name || text.startsWith(name + ' ') || text.endsWith(' ' + name); });
              // Only hide leaf-like elements (no nested form fields) to avoid nuking the whole form
              if (isTitle && el.children.length === 0) {
                el.style.setProperty('display', 'none', 'important');
              }
            });
          });
          titleObserver.observe(container, { childList: true, subtree: true });
          // Disconnect after 10 s — the title appears once on form render
          setTimeout(function() { titleObserver.disconnect(); }, 10000);

          // Load the Sell.do form
          var script = document.createElement('script');
          script.src = 'https://forms.cdn.sell.do/t/forms/5ba883447c0dac3321d9f483/${formId}.js';
          script.setAttribute('data-form-id', '${formId}');
          script.async = true;
          container.appendChild(script);

          // Disable the submit button as soon as it appears (consent not yet given)
          var submitObserver = new MutationObserver(function() {
            var btn = container.querySelector('button[type="submit"], input[type="submit"], button.submit');
            if (btn && !btn.dataset.consentControlled) {
              btn.disabled = true;
              btn.style.opacity = '0.4';
              btn.style.cursor = 'not-allowed';
              btn.dataset.consentControlled = 'true';
            }
          });
          submitObserver.observe(container, { childList: true, subtree: true });
          setTimeout(function() { submitObserver.disconnect(); }, 60000);

          // Fire Meta Pixel Lead event — only once, only on real form success.
          var leadFired = false;
          function fireLeadEvent() {
            if (leadFired) return;
            leadFired = true;
            if (typeof fbq !== 'undefined') {
              fbq('trackSingle', '${pixelId}', 'Lead');
            }
          }

          var observer = new MutationObserver(function() {
            var successEl = container.querySelector(
              '.thank-you-message, .success-message, .thankyou-message, .sell-do-success'
            );
            if (successEl) {
              fireLeadEvent();
              observer.disconnect();
              return;
            }
            var walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null, false);
            var node;
            while ((node = walker.nextNode())) {
              if (node.textContent && node.textContent.toLowerCase().indexOf('thank you') !== -1) {
                fireLeadEvent();
                observer.disconnect();
                return;
              }
            }
          });

          observer.observe(container, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['style', 'class']
          });

          setTimeout(function() { observer.disconnect(); }, 600000);
        })();`}
      </Script>
    </div>
  );
}
