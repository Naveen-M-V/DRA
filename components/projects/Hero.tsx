"use client";

import Script from "next/script";
import Image from "next/image";
import EmailVerificationGate from "../EmailVerificationGate";
import securaLogo from "@/lib/Secura.jpg.jpeg";
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
    <section className="relative w-full overflow-hidden bg-[#062f27] text-white
                        h-auto min-h-[100svh] lg:h-[100svh]">

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
          Only applied on lg+ where the model is layered behind content.
          On mobile/tablet the model has its own row so no gradients needed. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-3/5 bg-gradient-to-r from-[#062f27] via-[#062f27]/75 to-transparent hidden lg:block" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-3/5 bg-gradient-to-l from-[#062f27] via-[#062f27]/75 to-transparent hidden lg:block" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-36 bg-gradient-to-b from-[#062f27] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-24 bg-gradient-to-t from-black/55 to-transparent hidden lg:block" />

      {/* ════════════════════════════════════════
          MOBILE / TABLET  (below lg)
          Stacked layout: image row → content row
          No absolute layering so image is fully visible.
      ════════════════════════════════════════ */}
      <div className="flex flex-col lg:hidden">

        {/* Image row — full width, unobstructed */}
        <div className="relative w-full" style={{ paddingBottom: "100%" }}>
          <Image
            src={repImage}
            alt="DRA Sales Representative"
            fill
            className="object-contain object-bottom"
            priority
            sizes="100vw"
          />
          {/* Subtle bottom fade to blend into content below */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#062f27] to-transparent" />
        </div>

        {/* Content row */}
        <div className="relative z-[3] px-5 pb-8 pt-2">
          {/* Launching chip */}
          {!isInara && (
            <span className="mb-3 inline-flex w-fit items-center rounded-full border border-yellow-500/50 bg-yellow-500/15 px-3.5 py-1 text-[8px] font-bold uppercase tracking-[0.18em] text-yellow-300 backdrop-blur-sm sm:text-[9px]">
              Launching
            </span>
          )}
          {/* Logo */}
          <Image
            src={projectLogo}
            alt={`${project.name} logo`}
            width={200}
            height={67}
            className="mb-4 h-auto w-[150px] sm:w-[180px]"
            priority
          />
          {/* Headline */}
          <h1 className="font-serif text-[1.7rem] font-extrabold leading-tight tracking-tight sm:text-3xl">
            {isInara ? (
              <>COME HOME TO<br /><span className="text-yellow-400">QUIET LUXURY!</span></>
            ) : (
              <>Plots with <span className="text-yellow-400">LOTS!</span></>
            )}
          </h1>
          {project.location && (
            <p className="mt-1.5 text-[11px] font-medium text-white/65 sm:text-sm">
              {project.location}
            </p>
          )}
          {/* Info cards */}
          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="flex flex-col items-center justify-center rounded-xl border border-yellow-600/30 bg-black/35 px-2 py-3 text-center backdrop-blur-md">
              <p className="text-[8px] font-bold uppercase tracking-wide text-yellow-300 sm:text-[9px]">{isInara ? "Luxury 4 BHK" : "Launch Price"}</p>
              <p className="mt-1 text-[12px] font-black text-white sm:text-sm">{isInara ? "Villas" : project.launchPrice}</p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-xl border border-yellow-600/30 bg-black/35 px-2 py-3 text-center backdrop-blur-md">
              <p className="text-[8px] font-bold uppercase tracking-wide text-yellow-300 sm:text-[9px]">{isInara ? "Starting From" : "Post Launch"}</p>
              <p className="mt-1 text-[12px] font-black text-white sm:text-sm">{isInara ? "₹2.90 Cr" : project.postLaunchPrice}</p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-xl border border-yellow-600/30 bg-black/35 px-2 py-3 text-center backdrop-blur-md">
              <p className="text-[8px] font-bold uppercase tracking-wide text-yellow-300 sm:text-[9px]">{isInara ? "Possession" : "Save Up To"}</p>
              <p className="mt-1 text-[12px] font-black text-white sm:text-sm">{isInara ? "Ready to Move" : project.savings}</p>
            </div>
          </div>
          {/* Form */}
          <div className="mt-5">
            <div className="rounded-2xl border border-white/10 bg-[#062f27]/80 p-1 shadow-2xl backdrop-blur-2xl">
              <EmailVerificationGate
                formId={project.formId}
                projectName={project.name}
                srd={project.srd}
                campaignName={project.campaignName}
                source={project.source}
                pixelId={project.pixelId}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════
          DESKTOP  (lg+)
          3-layer absolute layout: model centered behind content.
      ════════════════════════════════════════ */}

      {/* Model — centered, bottom-anchored, pointer-events-none */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] hidden lg:flex lg:justify-center">
        <div className="relative h-[85svh] w-[460px] xl:w-[520px]">
          <Image
            src={repImage}
            alt="DRA Sales Representative"
            fill
            className="object-contain object-bottom"
            priority
            sizes="(max-width: 1280px) 460px, 520px"
          />
        </div>
      </div>

      {/* Main content grid */}
      <div className="relative z-[3] hidden h-full w-full lg:flex lg:flex-row">

        {/* Left Column */}
        <div className="flex w-[38%] shrink-0 flex-col justify-center px-14 xl:px-20">
          {!isInara && (
            <span className="mb-3 inline-flex w-fit items-center rounded-full border border-yellow-500/50 bg-yellow-500/15 px-3.5 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-yellow-300 backdrop-blur-sm">
              Launching
            </span>
          )}
          <Image
            src={projectLogo}
            alt={`${project.name} logo`}
            width={240}
            height={80}
            className="mb-5 h-auto w-[200px] lg:w-[220px] xl:w-[240px]"
            priority
          />
          <h1 className="font-serif text-[1.75rem] font-extrabold leading-tight tracking-tight lg:text-[2.1rem] xl:text-5xl">
            {isInara ? (
              <>COME HOME TO<br /><span className="text-yellow-400">QUIET LUXURY!</span></>
            ) : (
              <>Plots with <span className="text-yellow-400">LOTS!</span></>
            )}
          </h1>
          {project.location && (
            <p className="mt-2 text-[11px] font-medium text-white/65 lg:text-sm xl:text-base">
              {project.location}
            </p>
          )}
          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="flex flex-col items-center justify-center rounded-xl border border-yellow-600/30 bg-black/35 px-2 py-3.5 text-center backdrop-blur-md">
              <p className="text-[9px] font-bold uppercase tracking-wide text-yellow-300">{isInara ? "Luxury 4 BHK" : "Launch Price"}</p>
              <p className="mt-1 text-[11px] font-black text-white lg:text-sm xl:text-base">{isInara ? "Villas" : project.launchPrice}</p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-xl border border-yellow-600/30 bg-black/35 px-2 py-3.5 text-center backdrop-blur-md">
              <p className="text-[9px] font-bold uppercase tracking-wide text-yellow-300">{isInara ? "Starting From" : "Post Launch"}</p>
              <p className="mt-1 text-[11px] font-black text-white lg:text-sm xl:text-base">{isInara ? "₹2.90 Cr" : project.postLaunchPrice}</p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-xl border border-yellow-600/30 bg-black/35 px-2 py-3.5 text-center backdrop-blur-md">
              <p className="text-[9px] font-bold uppercase tracking-wide text-yellow-300">{isInara ? "Possession" : "Save Up To"}</p>
              <p className="mt-1 text-[11px] font-black text-white lg:text-sm xl:text-base">{isInara ? "Ready to Move" : project.savings}</p>
            </div>
          </div>
        </div>

        {/* Right Column — Form */}
        <div className="flex flex-1 items-center justify-end pr-14 xl:pr-20">
          <div className="relative z-[10] w-full max-w-[360px] xl:max-w-[380px]">
            <div className="rounded-2xl border border-white/10 bg-[#062f27]/80 p-1 shadow-2xl backdrop-blur-2xl">
              <EmailVerificationGate
                formId={project.formId}
                projectName={project.name}
                srd={project.srd}
                campaignName={project.campaignName}
                source={project.source}
                pixelId={project.pixelId}
              />
            </div>
          </div>
        </div>

      </div>

      {/* Per-project Meta Pixel — fully self-contained: stub + async lib + init + PageView.
          The if(f.fbq)return guard prevents double-loading on client-side navigation. */}
      <Script
        id={`meta-pixel-${project.slug}`}
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${project.pixelId}');
            fbq('track', 'PageView');
          `,
        }}
      />

    </section>
  );
}