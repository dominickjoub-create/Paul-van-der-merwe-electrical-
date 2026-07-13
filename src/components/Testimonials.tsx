"use client";

import { useState } from "react";
import { TestimonialCard, type CardPosition } from "@/components/ui/testimonial-cards";
import { Reveal } from "./Reveal";

/**
 * ⚠️ PLACEHOLDER REVIEWS — replace these with real customer testimonials before
 * going live. Fabricated reviews on a live business site are misleading.
 * Keep the shape: { id, testimonial, author }.
 */
const testimonials = [
  {
    id: 1,
    testimonial:
      "Sorted our DB board and a dead circuit the same day. Arrived on time, tidy work, fair price. Highly recommend.",
    author: "Riaan B. — Roodepoort",
  },
  {
    id: 2,
    testimonial:
      "Installed our inverter and battery backup before load-shedding season. The house barely skips a beat now.",
    author: "Thandi M. — Krugersdorp",
  },
  {
    id: 3,
    testimonial:
      "Rewired the office and issued the CoC without any fuss. Professional, compliant and easy to deal with.",
    author: "Deon V. — Weltevreden Park",
  },
];

export function Testimonials() {
  const [positions, setPositions] = useState<CardPosition[]>(["front", "middle", "back"]);

  const handleShuffle = () => {
    setPositions((prev) => {
      const next = [...prev];
      const last = next.pop()!;
      next.unshift(last);
      return next;
    });
  };

  return (
    <section id="reviews" className="relative scroll-mt-20 overflow-hidden py-20 sm:py-28">
      <div className="shell grid items-center gap-14 lg:grid-cols-2">
        {/* Left: heading */}
        <div>
          <Reveal>
            <p className="eyebrow">Reviews</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-tight text-chalk sm:text-4xl">
              Trusted by homes &amp; businesses{" "}
              <span className="text-bolt">across the community.</span>
            </h2>
            <p className="mt-5 max-w-md text-chalk-dim">
              Real, honest work — and customers who come back. Here&apos;s what a few of them
              had to say.
            </p>
            <p className="mt-6 inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-wider text-chalk-faint">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M8 12h8M8 12l3-3M8 12l3 3"
                  stroke="#FFC400"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Drag the top card to shuffle
            </p>
          </Reveal>
        </div>

        {/* Right: shuffle stack */}
        <div className="relative flex justify-center py-6 lg:justify-start">
          <div className="relative h-[450px] w-[350px] max-w-full scale-[0.82] sm:scale-100">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                {...testimonial}
                handleShuffle={handleShuffle}
                position={positions[index]}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
