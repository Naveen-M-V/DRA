"use client";

import { useState, useEffect, useRef } from "react";

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
  source = "Website",
  pixelId,
}: EmailVerificationGateProps) {
  const [consentChecked, setConsentChecked] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);
  const leadFired = useRef(false);

  useEffect(() => {
    if (initialized.current || !containerRef.current) return;
    initialized.current = true;

    const container = containerRef.current;
    const capturedLead = { name: "", email: "", phone: "" };

    // -- Load Sell.do form script --------------------------------------------
    const script = document.createElement("script");
    script.src = `https://forms.cdn.sell.do/t/forms/5ba883447c0dac3321d9f483/${formId}.js`;
    script.setAttribute("data-form-id", formId);
    script.async = true;
    container.appendChild(script);

    // -- Inject SRD + campaign as hidden fields once form renders ------------
    let srdInjected = false;
    const srdObserver = new MutationObserver(() => {
      if (srdInjected) return;
      const form = container.querySelector("form");
      if (!form) return;
      srdInjected = true;
      srdObserver.disconnect();

      const addHidden = (name: string, value: string) => {
        const inp = document.createElement("input");
        inp.type = "hidden";
        inp.name = name;
        inp.value = value;
        form.appendChild(inp);
      };
      addHidden("sell_do[campaign][srd]", srd);
      addHidden("sell_do[campaign][name]", campaignName);
      addHidden("sell_do[campaign][source]", source);
    });
    srdObserver.observe(container, { childList: true, subtree: true });
    setTimeout(() => srdObserver.disconnect(), 15000);

    // -- Hide Sell.do injected project title ---------------------------------
    const projectNames = ["dra secura", "dra inara", "dra securari", "secura", "inara", "securari"];
    const titleObserver = new MutationObserver(() => {
      container.querySelectorAll("h1,h2,h3,h4,p,div,span,label").forEach((el) => {
        const text = (el.textContent || "").trim().toLowerCase();
        const isTitle = projectNames.some(
          (n) => text === n || text.startsWith(n + " ") || text.endsWith(" " + n)
        );
        if (isTitle && el.children.length === 0) {
          (el as HTMLElement).style.setProperty("display", "none", "important");
        }
      });
    });
    titleObserver.observe(container, { childList: true, subtree: true });
    setTimeout(() => titleObserver.disconnect(), 10000);

    // -- Disable submit until consent ticked; snapshot values on click --------
    const submitObserver = new MutationObserver(() => {
      const btn = container.querySelector<HTMLButtonElement>(
        'button[type="submit"], input[type="submit"], button.submit'
      );
      if (btn && !(btn as any).dataset.consentControlled) {
        btn.disabled = true;
        btn.style.opacity = "0.4";
        btn.style.cursor = "not-allowed";
        (btn as any).dataset.consentControlled = "true";

        btn.addEventListener("click", () => {
          container.querySelectorAll<HTMLInputElement>("input[name], textarea[name], select[name]").forEach((inp) => {
            const n = (inp.getAttribute("name") || "").toLowerCase();
            const v = inp.value || "";
            if (n.includes("name") && !n.includes("company") && !n.includes("campaign")) {
              capturedLead.name = v;
            } else if (n.includes("phone") || n.includes("mobile")) {
              capturedLead.phone = v;
            } else if (n.includes("email")) {
              capturedLead.email = v;
            }
          });
        });
      }
    });
    submitObserver.observe(container, { childList: true, subtree: true });
    setTimeout(() => submitObserver.disconnect(), 60000);

    // -- Fire Meta Pixel + log lead on form success --------------------------
    const fireLeadEvent = () => {
      if (leadFired.current) return;
      leadFired.current = true;

      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("trackSingle", pixelId, "Lead");
      }

      fetch("/api/leads/verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "log-submission",
          name: capturedLead.name,
          email: capturedLead.email,
          phone: capturedLead.phone,
          srd,
          project: projectName,
          campaignName,
          source,
        }),
      }).catch(() => {});
    };

    const successObserver = new MutationObserver(() => {
      const successEl = container.querySelector(
        ".thank-you-message, .success-message, .thankyou-message, .sell-do-success"
      );
      if (successEl) { fireLeadEvent(); successObserver.disconnect(); return; }
      const text = container.textContent?.toLowerCase() || "";
      if (text.includes("thank you")) { fireLeadEvent(); successObserver.disconnect(); }
    });
    successObserver.observe(container, {
      childList: true, subtree: true,
      attributes: true, attributeFilter: ["style", "class"],
    });

    return () => {
      srdObserver.disconnect();
      titleObserver.disconnect();
      submitObserver.disconnect();
      successObserver.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formId]);

  // Keep submit button in sync with consent checkbox
  useEffect(() => {
    if (!containerRef.current) return;
    const btn = containerRef.current.querySelector<HTMLButtonElement>(
      'button[type="submit"], input[type="submit"], button.submit'
    );
    if (!btn) return;
    btn.disabled = !consentChecked;
    btn.style.opacity = consentChecked ? "1" : "0.4";
    btn.style.cursor = consentChecked ? "pointer" : "not-allowed";
  }, [consentChecked]);

  return (
    <div className="w-full max-w-[450px] rounded-2xl border border-yellow-500/30 bg-[#073126]/95 p-5 shadow-2xl backdrop-blur lg:max-w-[400px]">
      <h2 className="text-center text-xl font-bold font-serif-display sm:text-2xl xl:text-3xl">
        Enquire Now
      </h2>
      <div className="mx-auto mt-2 h-1 w-16 rounded bg-[#FFB800] sm:mt-3 sm:w-20" />

      {/* Sell.do form container */}
      <div ref={containerRef} className="mt-4 sm:mt-6" />

      {/* Consent checkbox */}
      <label className="mt-4 flex cursor-pointer items-start gap-2.5">
        <input
          type="checkbox"
          checked={consentChecked}
          onChange={(e) => setConsentChecked(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-yellow-400"
        />
        <span className="text-[10px] leading-snug text-white/55">
          By pressing submit, I authorize DRA Homes and its representatives to call, SMS, RCS,
          email, or WhatsApp me about its products and offers. This consent overrides any
          registration for DNC/NDNC.
        </span>
      </label>
    </div>
  );
}
