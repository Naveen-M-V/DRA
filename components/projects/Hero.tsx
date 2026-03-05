"use client";

import Script from "next/script";
import Image from "next/image";
import EmailVerificationGate from "../EmailVerificationGate";
import securaLogo from "@/lib/Secura.png";
import inaraLogo from "@/lib/dra-inara.svg";
import repImage from "@/lib/RM1037-2.png";
import plotTexture from "@/lib/plot-texture.png";
import type { ProjectContent } from "@/lib/projects";

type HeroProps = {
  project: ProjectContent;
};

export default function Hero({ project }: HeroProps) {
  const projectLogo = project.slug === "inara" ? inaraLogo : securaLogo;

  return (
    <section className="relative h-[100svh] overflow-hidden bg-[#073a2f] text-white">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${plotTexture.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "grayscale(0.5) brightness(0.8)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#062f27]/95 via-[#0a4a3b]/80 to-[#062f27]/95" />

      <div className="relative mx-auto grid h-[100svh] max-w-screen-2xl grid-cols-1 items-center gap-6 px-4 py-8 pb-0 sm:px-6 sm:py-10 md:grid-cols-2 md:gap-8 md:px-8 md:pb-0 lg:grid-cols-[2fr_1.2fr_1.5fr] lg:gap-6 lg:px-12 lg:pb-0 xl:grid-cols-[2fr_1.3fr_1.5fr]">
        <div className="flex flex-col justify-center lg:col-span-1">
          <div className="max-w-3xl">
            <div className="mb-6 flex flex-col items-start gap-4">
              <Image
                src={projectLogo}
                alt={`${project.name} logo`}
                width={280}
                height={100}
                className="h-auto w-[220px] sm:w-[250px] md:w-[280px]"
                priority
              />
              <span className="inline-flex items-center gap-2 rounded-full border border-yellow-500/40 bg-yellow-500/20 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-yellow-300 shadow-sm">
                Launching
              </span>
            </div>

            <h1 className="font-serif-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl">
              {project.headline.split("LOTS")[0]}
              {project.slug !== "inara" && <span className="text-yellow-400">LOTS!</span>}
            </h1>

            {project.location && (
              <p className="mt-2 max-w-2xl text-lg text-white/80 sm:text-xl md:text-2xl">
                {project.location}
              </p>
            )}
            {project.tagline && (
              <p className="mt-1 text-base italic text-yellow-200/80 sm:text-lg">
                &quot;{project.tagline}&quot;
              </p>
            )}

            <div className="mt-6 grid max-w-4xl gap-4 sm:grid-cols-3">
              <div className="flex min-h-[110px] flex-col items-center justify-center gap-1.5 rounded-xl border border-yellow-600/50 bg-yellow-500/10 px-3 py-4 text-center shadow-lg backdrop-blur-sm">
                <p className="text-[10px] font-bold uppercase tracking-wide text-yellow-300 sm:text-xs">
                  {project.slug === "inara" ? "Luxury 4 BHK Villas" : "Launch Price"}
                </p>
                <p className="text-xl font-black leading-none text-white sm:text-2xl">
                  {project.launchPrice}
                </p>
                {project.slug !== "inara" && <p className="text-[10px] opacity-60">/sq.ft</p>}
              </div>
              <div className="flex min-h-[110px] flex-col items-center justify-center gap-1.5 rounded-xl border border-yellow-600/50 bg-yellow-500/10 px-3 py-4 text-center shadow-lg backdrop-blur-sm">
                <p className="text-xl font-black leading-none text-white sm:text-2xl">
                  {project.slug === "inara" ? "₹2.90 Cr" : project.postLaunchPrice}
                </p>
                <p className="text-[10px] {project.slug === 'inara' ? 'opacity-90' : 'opacity-60'}">
                  {project.slug === "inara" ? project.postLaunchPrice : "/sq.ft"}
                </p>
              </div>
              <div className="flex min-h-[110px] flex-col items-center justify-center gap-1.5 rounded-xl border border-yellow-600/50 bg-yellow-500/10 px-3 py-4 text-center shadow-lg backdrop-blur-sm">
                <p className="text-[10px] font-bold uppercase tracking-wide text-yellow-300 sm:text-xs">
                  {project.slug === "inara" ? "Ready to" : "Save Up To"}
                </p>
                <p className="text-xl font-black leading-none text-white sm:text-2xl">
                  {project.slug === "inara" ? project.savings : "₹5 Lakhs*"}
                </p>
                {project.slug !== "inara" && <p className="text-[10px] opacity-60">Limited Time</p>}
              </div>
            </div>

            {project.chips.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-3 text-sm font-medium">
                {project.chips.map((chip: string) => (
                  <span
                    key={chip}
                    className="rounded-full border border-emerald-400/30 bg-emerald-900/50 px-4 py-2 text-emerald-100 backdrop-blur-sm"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="pointer-events-none hidden items-end self-end lg:flex lg:h-full">
          <Image
            src={repImage}
            alt="DRA Representative"
            width={1200}
            height={2400}
            className="h-full w-auto max-w-none object-cover object-bottom"
            priority
          />
        </div>

        <aside className="relative z-10 flex w-full items-center justify-center md:col-start-2 lg:col-start-3">
          <EmailVerificationGate
            formId={project.formId}
            projectName={project.name}
            srd={project.srd}
            campaignName={project.campaignName}
            source={project.source}
          />
        </aside>
      </div>
    </section>
  );
}
