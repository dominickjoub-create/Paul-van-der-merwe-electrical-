"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/lib/site";

// Client-only, code-split so the 3D engine never touches SSR or first paint.
const LightningField = dynamic(() => import("./LightningField"), { ssr: false });

export function Hero() {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const, delay },
  });

  return (
    <section id="top" className="relative flex min-h-[78svh] items-center overflow-hidden pt-16 sm:min-h-[100svh]">
      {/* Ambient background layers */}
      <div className="pointer-events-none absolute inset-0 grid-veil" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(255,196,0,0.10), transparent 70%), radial-gradient(50% 60% at 85% 30%, rgba(255,196,0,0.06), transparent 70%)",
        }}
      />
      <div className="absolute inset-0">
        <LightningField />
      </div>
      {/* Fade the field into the page bottom */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        aria-hidden
        style={{ background: "linear-gradient(to top, #0a0a0b, transparent)" }}
      />

      <div className="shell relative z-10 py-12 sm:py-24">
        <div className="max-w-3xl">
          <motion.div {...rise(0)} className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-ink-line bg-ink-raise/70 px-4 py-1.5 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bolt opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-bolt" />
            </span>
            <span className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-chalk-dim">
              Certified &amp; Compliant · {site.areaServed}
            </span>
          </motion.div>

          <motion.h1
            {...rise(0.08)}
            className="font-display text-[2.7rem] font-extrabold leading-[0.98] tracking-tight text-chalk sm:text-6xl lg:text-7xl"
          >
            Need a reliable
            <br />
            <span className="relative inline-block text-bolt">
              electrician?
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 12"
                fill="none"
                aria-hidden
              >
                <path
                  d="M2 8 Q 80 2 150 7 T 298 5"
                  stroke="#FFC400"
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity="0.55"
                />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            {...rise(0.16)}
            className="mt-7 max-w-xl text-lg leading-relaxed text-chalk-dim sm:text-xl"
          >
            Quality work. Honest service.{" "}
            <span className="text-chalk">Powering homes and businesses</span> across our
            community — from a single plug point to solar backup.
          </motion.p>

          <motion.div {...rise(0.24)} className="mt-9 flex flex-wrap items-center gap-3.5">
            <a href="#quote" className="btn-bolt text-base">
              <BoltIcon /> Get a free quote
            </a>
            <a href={`tel:${site.phoneE164}`} className="btn-ghost text-base">
              Call {site.phoneDisplay}
            </a>
          </motion.div>

          <motion.ul
            {...rise(0.32)}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[0.72rem] uppercase tracking-wider text-chalk-faint"
          >
            <li className="flex items-center gap-2">
              <Dot /> {site.offer.headline}
            </li>
            <li className="flex items-center gap-2">
              <Dot /> {site.hours.label}
            </li>
            <li className="flex items-center gap-2">
              <Dot /> {site.hours.note}
            </li>
          </motion.ul>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 sm:block"
        aria-hidden
      >
        <div className="flex h-9 w-6 items-start justify-center rounded-full border border-ink-line p-1.5">
          <span className="h-2 w-1 animate-bounce rounded-full bg-bolt" />
        </div>
      </div>
    </section>
  );
}

function BoltIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
    </svg>
  );
}

function Dot() {
  return <span className="inline-block h-1 w-1 rounded-full bg-bolt" aria-hidden />;
}
