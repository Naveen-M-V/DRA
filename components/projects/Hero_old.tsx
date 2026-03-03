"use client";

import Script from "next/script";
import Image from "next/image";
import securaLogo from "@/lib/dra-secura-2.svg";
import repImage from "@/lib/RM1037-2.png";
import type { ProjectContent } from "@/lib/projects";

type HeroProps = {
  project: ProjectContent;
};

export default function Hero({ project }: HeroProps) {
  return (
    <section className="relative h-[100svh] overflow-hidden bg-[#073a2f] text-white">
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

      <div className="relative mx-auto grid h-[100svh] max-w-7xl grid-cols-1 gap-4 px-4 py-4 md:px-8 lg:grid-cols-[1.2fr_0.55fr_0.9fr] lg:items-center lg:gap-6 lg:py-6">
        <div className="relative flex flex-col justify-center lg:pr-2">
          <div className="mb-4 flex items-center gap-3">
            <Image
              src={securaLogo}
              alt={`${project.name} logo`}
              width={150}
              height={50}
              className="h-auto w-[130px] md:w-[150px]"
              priority
            />
            <span className="inline-flex items-center rounded-full border border-yellow-500/40 bg-yellow-500/20 px-4 py-1 text-sm font-semibold uppercase tracking-wide text-yellow-300">
              Launching
            </span>
          </div>

          <p className="text-2xl font-bold tracking-tight text-emerald-200 md:text-3xl">
            {project.name}
          </p>
          <h1 className="mt-2 max-w-2xl text-4xl font-extrabold leading-tight md:text-6xl xl:text-7xl font-serif-display">
            {project.headline.split("LOTS")[0]}
            <span className="text-[#FFB800]">LOTS!</span>
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-white/90 md:text-2xl xl:text-3xl">
            {project.location}
          </p>
          <p className="mt-3 text-base italic text-yellow-200/90 md:text-lg">“{project.tagline}”</p>

          <div className="mt-6 grid max-w-4xl gap-3 sm:grid-cols-3">
            <div className="flex min-h-[110px] flex-col items-center justify-center rounded-xl bg-[#FFB800] px-4 py-3 text-center text-black shadow-lg">
              <p className="text-sm font-semibold uppercase leading-none">Launch Price</p>
              <p className="mt-2 text-2xl font-extrabold leading-none md:text-3xl">{project.launchPrice}</p>
            </div>
            <div className="flex min-h-[110px] flex-col items-center justify-center rounded-xl bg-[#FFB800] px-4 py-3 text-center text-black shadow-lg">
              <p className="text-sm font-semibold uppercase leading-none">Post Launch</p>
              <p className="mt-2 text-2xl font-extrabold leading-none md:text-3xl">{project.postLaunchPrice}</p>
            </div>
            <div className="flex min-h-[110px] flex-col items-center justify-center rounded-xl bg-[#FFB800] px-4 py-3 text-center text-black shadow-lg">
              <p className="text-sm font-semibold uppercase leading-none">Savings</p>
              <p className="mt-2 text-2xl font-extrabold leading-none md:text-3xl">{project.savings}</p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 text-sm font-medium">
            {project.chips.map((chip: string) => (
              <span
                key={chip}
                className="rounded-full border border-emerald-400/50 bg-emerald-900/40 px-3 py-1.5 text-emerald-100"
              >
                {chip}
              </span>
            ))}
          </div>

        </div>

        <div className="pointer-events-none hidden lg:flex lg:items-end lg:justify-center lg:self-end">
          <Image
            src={repImage}
            alt="DRA Representative"
            width={330}
            height={520}
            className="h-auto w-[230px] xl:w-[300px]"
            priority
          />
        </div>

        <aside className="relative z-10 flex items-start lg:justify-end">
          <div className="w-full rounded-2xl border border-yellow-500/30 bg-[#073126]/95 p-5 shadow-2xl backdrop-blur lg:max-w-[420px]">
            <h2 className="text-center text-2xl font-bold font-serif-display xl:text-3xl">
              Get Launch Price Details
            </h2>
            <div className="mx-auto mt-3 h-1 w-20 rounded bg-[#FFB800]" />

            <div id={`sell-do-form-${project.formId}`} className="mt-6" />
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
