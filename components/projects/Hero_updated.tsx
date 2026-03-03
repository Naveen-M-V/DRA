"use client";

import Script from "next/script";
import Image from "next/image";
import securaLogo from "@/lib/dra-secura-2.svg";
import inaraLogo from "@/lib/dra-inara.svg";
import repImage from "@/lib/RM1037-2.png";
import type { ProjectContent } from "@/lib/projects";

type HeroProps = {
  project: ProjectContent;
};

export default function Hero({ project }: HeroProps) {
  const projectLogo = project.slug === "inara" ? inaraLogo : securaLogo;

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[#073a2f] text-white lg:h-[100svh]">
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=2000&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "grayscale(0.3)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#062f27]/95 via-[#0a4a3b]/85 to-[#062f27]/95" />

      <div className="relative mx-auto grid min-h-[100svh] max-w-7xl grid-cols-1 gap-6 px-4 py-6 md:px-8 md:py-8 lg:h-[100svh] lg:grid-cols-[1.2fr_0.6fr_0.9fr] lg:items-center lg:gap-6 lg:py-6">
        <div className="relative flex flex-col justify-center lg:pr-2">
          {/* Logo above Launching */}
          <div className="mb-3 flex w-fit items-center">
            <Image
              src={projectLogo}
              alt={`${project.name} logo`}
              width={150}
              height={50}
              className="h-auto w-[110px] sm:w-[130px] md:w-[150px]"
              priority
            />
          </div>

          {/* Launching badge with rocket icon */}
          <div className="mb-4 flex items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-yellow-500/40 bg-yellow-500/20 px-4 py-1 text-sm font-semibold uppercase tracking-wide text-yellow-300">
              <span>🚀</span>
              Launching
            </span>
          </div>

          <h1 className="mt-2 max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif-display">
            {project.headline.split("LOTS")[0]}
            <span className="text-[#FFB800]">LOTS!</span>
          </h1>

          <p className="mt-3 max-w-2xl text-base text-white/90 sm:mt-4 sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
            {project.location}
          </p>
          <p className="mt-2 text-sm italic text-yellow-200/90 sm:mt-3 sm:text-base md:text-lg">
            &quot;{project.tagline}&quot;
          </p>

          <div className="mt-4 grid max-w-4xl gap-3 sm:mt-6 sm:grid-cols-3">
            <div className="flex min-h-[100px] flex-col items-center justify-center gap-2 rounded-xl bg-[#FFB800] px-4 py-4 text-center text-black shadow-lg sm:min-h-[110px]">
              <p className="text-[10px] font-bold uppercase tracking-wide sm:text-xs">
                Launch
              </p>
              <p className="text-xl font-black leading-none sm:text-2xl">
                {project.launchPrice}
              </p>
              <p className="text-[10px] opacity-75">/sq.ft</p>
            </div>
            <div className="flex min-h-[100px] flex-col items-center justify-center gap-2 rounded-xl bg-[#FFB800] px-4 py-4 text-center text-black shadow-lg sm:min-h-[110px]">
              <p className="text-[10px] font-bold uppercase tracking-wide sm:text-xs">
                Post Launch
              </p>
              <p className="text-xl font-black leading-none sm:text-2xl">
                {project.postLaunchPrice}
              </p>
              <p className="text-[10px] opacity-75">/sq.ft</p>
            </div>
            <div className="flex min-h-[100px] flex-col items-center justify-center gap-2 rounded-xl bg-[#FFB800] px-4 py-4 text-center text-black shadow-lg sm:min-h-[110px]">
              <p className="text-[10px] font-bold uppercase tracking-wide sm:text-xs">
                Save Up To
              </p>
              <p className="text-xl font-black leading-none sm:text-2xl">
                ₹5 Lakhs*
              </p>
              <p className="text-[10px] opacity-75">Limited Time</p>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2 text-xs font-medium sm:mt-4 sm:text-sm">
            {project.chips.map((chip: string) => {
              let icon = "📍";
              if (chip.includes("Metro")) icon = "🚂";
              if (chip.includes("ORR")) icon = "📍";
              if (chip.includes("Sq.ft") || chip.includes("2372")) icon = "◻️";
              if (chip.includes("Grand") || chip.includes("Arch")) icon = "🏛️";

              return (
                <span
                  key={chip}
                  className="flex items-center gap-1 rounded-full border border-emerald-400/50 bg-emerald-900/40 px-3 py-1 text-emerald-100 sm:py-1.5"
                >
                  <span>{icon}</span>
                  {chip}
                </span>
              );
            })}
          </div>
        </div>

        {/* Bigger woman image - centered between boxes on desktop */}
        <div className="pointer-events-none relative hidden lg:flex lg:items-center lg:justify-center">
          <Image
            src={repImage}
            alt="DRA Representative"
            width={380}
            height={600}
            className="h-auto w-full max-w-[350px] xl:max-w-[420px]"
            priority
          />
        </div>

        <aside className="relative z-10 flex items-start justify-center lg:justify-end">
          <div className="w-full max-w-[450px] rounded-2xl border border-yellow-500/30 bg-[#073126]/95 p-5 shadow-2xl backdrop-blur lg:max-w-[400px]">
            <h2 className="text-center text-xl font-bold font-serif-display sm:text-2xl xl:text-3xl">
              Get Launch Price Details
            </h2>
            <div className="mx-auto mt-2 h-1 w-16 rounded bg-[#FFB800] sm:mt-3 sm:w-20" />

            <div id={`sell-do-form-${project.formId}`} className="mt-4 sm:mt-6" />
            <Script id={`sell-do-embed-${project.formId}`} strategy="afterInteractive">
              {`(function(){
                var container = document.getElementById('sell-do-form-${project.formId}');
                if (!container) return;
                container.innerHTML = '';
                var script = document.createElement('script');
                script.src = 'https://forms.cdn.sell.do/t/forms/5ba883447c0dac3321d9f483/${project.formId}.js';
                script.setAttribute('data-form-id', '${project.formId}');
                script.async = true;
                container.appendChild(script);
              })();`}
            </Script>
          </div>
        </aside>
      </div>
    </section>
  );
}
