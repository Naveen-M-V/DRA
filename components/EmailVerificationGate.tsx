"use client";

import { useState } from "react";
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
  const [consentChecked, setConsentChecked] = useState(false);

  return (
    <div className="w-full max-w-[450px] rounded-2xl border border-yellow-500/30 bg-[#073126]/95 p-5 shadow-2xl backdrop-blur lg:max-w-[400px]">
      <h2 className="text-center text-xl font-bold font-serif-display sm:text-2xl xl:text-3xl">
        Enquire Now
      </h2>
      <div className="mx-auto mt-2 h-1 w-16 rounded bg-[#FFB800] sm:mt-3 sm:w-20" />

      {/* Sell.do form container */}
      <div id={`sell-do-form-${formId}`} className="mt-4 sm:mt-6" />

      {/* Consent checkbox */}
      <label className="mt-4 flex cursor-pointer items-start gap-2.5">
        <input
          type="checkbox"
          checked={consentChecked}
          onChange={(e) => {
            const checked = e.target.checked;
            setConsentChecked(checked);
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
          var formId = '${formId}';
          var container = document.getElementById('sell-do-form-' + formId);
          if (!container) return;
          container.innerHTML = '';

          // -- Load Sell.do form script --------------------------------------
          var script = document.createElement('script');
          script.src = 'https://forms.cdn.sell.do/t/forms/5ba883447c0dac3321d9f483/' + formId + '.js';
          script.setAttribute('data-form-id', formId);
          script.async = true;
          container.appendChild(script);

          // -- Inject SRD + campaign as hidden fields once form renders ------
          var srdInjected = false;
          var srdObserver = new MutationObserver(function() {
            if (srdInjected) return;
            var form = container.querySelector('form');
            if (!form) return;
            srdInjected = true;
            srdObserver.disconnect();
            function hiddenInput(name, value) {
              var inp = document.createElement('input');
              inp.type = 'hidden';
              inp.name = name;
              inp.value = value;
              form.appendChild(inp);
            }
            hiddenInput('sell_do[campaign][srd]', '${srd}');
            hiddenInput('sell_do[campaign][name]', '${campaignName}');
            hiddenInput('sell_do[campaign][source]', '${source || "Website"}');
          });
          srdObserver.observe(container, { childList: true, subtree: true });
          setTimeout(function() { srdObserver.disconnect(); }, 15000);

          // -- Hide Sell.do injected project title ---------------------------
          var titleObserver = new MutationObserver(function() {
            var projectNames = ['dra secura', 'dra inara', 'dra securari', 'secura', 'inara', 'securari'];
            container.querySelectorAll('h1,h2,h3,h4,p,div,span,label').forEach(function(el) {
              var text = (el.textContent || '').trim().toLowerCase();
              var isTitle = projectNames.some(function(n) {
                return text === n || text.startsWith(n + ' ') || text.endsWith(' ' + n);
              });
              if (isTitle && el.children.length === 0) {
                el.style.setProperty('display', 'none', 'important');
              }
            });
          });
          titleObserver.observe(container, { childList: true, subtree: true });
          setTimeout(function() { titleObserver.disconnect(); }, 10000);

          // -- Disable submit until consent ticked; snapshot values on click -
          var capturedLead = { name: '', email: '', phone: '' };
          var submitObserver = new MutationObserver(function() {
            var btn = container.querySelector('button[type="submit"], input[type="submit"], button.submit');
            if (btn && !btn.dataset.consentControlled) {
              btn.disabled = true;
              btn.style.opacity = '0.4';
              btn.style.cursor = 'not-allowed';
              btn.dataset.consentControlled = 'true';
              btn.addEventListener('click', function() {
                container.querySelectorAll('input[name], textarea[name], select[name]').forEach(function(inp) {
                  var n = (inp.getAttribute('name') || '').toLowerCase();
                  var v = inp.value || '';
                  if (n.includes('name') && !n.includes('company') && !n.includes('campaign')) {
                    capturedLead.name = v;
                  } else if (n.includes('phone') || n.includes('mobile')) {
                    capturedLead.phone = v;
                  } else if (n.includes('email')) {
                    capturedLead.email = v;
                  }
                });
              });
            }
          });
          submitObserver.observe(container, { childList: true, subtree: true });
          setTimeout(function() { submitObserver.disconnect(); }, 60000);

          // -- Fire Meta Pixel + log lead on form success --------------------
          var leadFired = false;
          function fireLeadEvent() {
            if (leadFired) return;
            leadFired = true;
            if (typeof fbq !== 'undefined') {
              fbq('trackSingle', '${pixelId}', 'Lead');
            }
            fetch('/api/leads/verification', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                action: 'log-submission',
                name: capturedLead.name,
                email: capturedLead.email,
                phone: capturedLead.phone,
                srd: '${srd}',
                project: '${projectName}',
                campaignName: '${campaignName}',
                source: '${source || "Website"}'
              })
            }).catch(function() {});
          }

          var successObserver = new MutationObserver(function() {
            var successEl = container.querySelector(
              '.thank-you-message, .success-message, .thankyou-message, .sell-do-success'
            );
            if (successEl) { fireLeadEvent(); successObserver.disconnect(); return; }
            var walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null, false);
            var node;
            while ((node = walker.nextNode())) {
              if (node.textContent && node.textContent.toLowerCase().indexOf('thank you') !== -1) {
                fireLeadEvent(); successObserver.disconnect(); return;
              }
            }
          });
          successObserver.observe(container, {
            childList: true, subtree: true,
            attributes: true, attributeFilter: ['style', 'class']
          });
          setTimeout(function() { successObserver.disconnect(); }, 600000);
        })();`}
      </Script>
    </div>
  );
}
