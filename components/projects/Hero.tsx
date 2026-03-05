"use client";

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
  const isInara = project.slug === "inara";

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-[#062f27] text-white">

      {/* ── Layer 0: Background Texture ── */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `url(${plotTexture.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* ── Layer 1: Directional Gradients ──
          Left  → keeps left-column text readable
          Right → keeps right-column form readable
          Top   → softens the very top edge
          Bottom→ grounds the model's feet                */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-3/5 bg-gradient-to-r from-[#062f27] via-[#062f27]/75 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-3/5 bg-gradient-to-l from-[#062f27] via-[#062f27]/75 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-36 bg-gradient-to-b from-[#062f27] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-24 bg-gradient-to-t from-black/55 to-transparent" />

      {/* ── Layer 2: Model — perfectly centered, bottom-anchored ──
          pointer-events-none so nothing blocks the form              */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] flex justify-center">
        <div className="relative h-[85svh] w-[260px] sm:w-[340px] md:w-[400px] lg:w-[460px] xl:w-[520px]">
          <Image
            src={repImage}
            alt="DRA Sales Representative"
            fill
            className="object-contain object-bottom"
            priority
            sizes="(max-width: 640px) 260px, (max-width: 768px) 340px, (max-width: 1024px) 400px, (max-width: 1280px) 460px, 520px"
          />
        </div>
      </div>

      {/* ── Layer 3: Main Content ──
          flex-col on mobile, flex-row on md+               */}
      <div className="relative z-[3] flex h-full w-full flex-col md:flex-row">

        {/* Left Column — Brand & Info */}
        <div className="flex w-full shrink-0 flex-col justify-start px-5 pt-7
                        md:w-[42%] md:justify-center md:px-10 md:pt-0
                        lg:w-[38%] lg:px-14
                        xl:px-20">

          {/* Logo */}
          <Image
            src={projectLogo}
            alt={`${project.name} logo`}
            width={350}
            height={120}
            className="h-auto w-[160px] sm:w-[210px] md:w-[260px] lg:w-[310px] xl:w-[350px]"
            priority
          />

          {/* Launching badge */}
          <div className="mt-4 mb-5 md:mt-5 md:mb-7">
            <span className="inline-flex items-center rounded-full border border-yellow-500/50 bg-yellow-500/15 px-4 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-yellow-300 backdrop-blur-sm sm:text-[10px]">
              Launching
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-[1.55rem] font-extrabold leading-tight tracking-tight
                         sm:text-3xl
                         md:text-[1.75rem]
                         lg:text-[2.1rem]
                         xl:text-5xl">
            {isInara ? (
              <>
                COME HOME TO
                <br />
                <span className="text-yellow-400">QUIET LUXURY!</span>
              </>
            ) : (
              <>
                Plots with{" "}
                <span className="text-yellow-400">LOTS!</span>
              </>
            )}
          </h1>

          {project.location && (
            <p className="mt-2 text-[11px] font-medium text-white/65 sm:text-sm md:text-[11px] lg:text-sm xl:text-base">
              {project.location}
            </p>
          )}

          {/* Info cards */}
          <div className="mt-5 grid grid-cols-3 gap-2 md:mt-6 lg:gap-3">

            {/* Card 1 */}
            <div className="flex flex-col items-center justify-center rounded-xl border border-yellow-600/30 bg-black/35 px-2 py-3 text-center backdrop-blur-md md:py-3.5">
              <p className="text-[8px] font-bold uppercase tracking-wide text-yellow-300 sm:text-[9px]">
                {isInara ? "Luxury 4 BHK" : "Launch Price"}
              </p>
              <p className="mt-1 text-[12px] font-black text-white sm:text-sm md:text-[11px] lg:text-sm xl:text-base">
                {isInara ? "Villas" : project.launchPrice}
              </p>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col items-center justify-center rounded-xl border border-yellow-600/30 bg-black/35 px-2 py-3 text-center backdrop-blur-md md:py-3.5">
              <p className="text-[8px] font-bold uppercase tracking-wide text-yellow-300 sm:text-[9px]">
                {isInara ? "Starting From" : "Post Launch"}
              </p>
              <p className="mt-1 text-[12px] font-black text-white sm:text-sm md:text-[11px] lg:text-sm xl:text-base">
                {isInara ? "₹2.90 Cr" : project.postLaunchPrice}
              </p>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col items-center justify-center rounded-xl border border-yellow-600/30 bg-black/35 px-2 py-3 text-center backdrop-blur-md md:py-3.5">
              <p className="text-[8px] font-bold uppercase tracking-wide text-yellow-300 sm:text-[9px]">
                {isInara ? "Possession" : "Save Up To"}
              </p>
              <p className="mt-1 text-[12px] font-black text-white sm:text-sm md:text-[11px] lg:text-sm xl:text-base">
                {isInara ? "Ready to Move" : project.savings}
              </p>
            </div>

          </div>
        </div>

        {/* Right Column — Form pushed to far right */}
        <div className="flex flex-1 items-end justify-center pb-5
                        md:items-center md:justify-end md:pr-8
                        lg:pr-14
                        xl:pr-20">
          <div className="relative z-[10] w-full max-w-[310px] sm:max-w-[360px] md:max-w-[320px] lg:max-w-[360px] xl:max-w-[380px]">
            <div className="rounded-2xl border border-white/10 bg-[#062f27]/80 p-1 shadow-2xl backdrop-blur-2xl">
              <EmailVerificationGate
                formId={project.formId}
                projectName={project.name}
                srd={project.srd}
                campaignName={project.campaignName}
                source={project.source}
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}