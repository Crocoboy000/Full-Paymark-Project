'use client';

import Link from 'next/link';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Register the hook once at module level




// ─── Types ─────────────────────────────────────────────────────────────────────
interface UniqueButtonProps {
  label: string;
  href: string;
  className?: string;
  
}

// ─── Component ─────────────────────────────────────────────────────────────────
export default function UniqueButton({ label, href, className }: UniqueButtonProps) {
  // ── Refs ──────────────────────────────────────────────────────────────────
  const containerRef = useRef<HTMLAnchorElement>(null);
  const wordsRef     = useRef<(HTMLSpanElement | null)[]>([]);
  const glowRef      = useRef<HTMLSpanElement>(null);
  const iconRef      = useRef<HTMLSpanElement>(null);

  // Animation state flags (no re-renders needed)


  // Pre-split words from label
  const words = label.split(' ');

  // ── Build timelines once on mount ─────────────────────────────────────────


  // ── Mouse enter — snap words to "from" state, reset progress ──────────────


  // ─── Render ──────────────────────────────────────────────────────────────
  return (
    <Link
      ref={containerRef}
      href={href}
      className={`

         inline-flex items-center justify-center gap-1.5
        px-7 py-3 rounded-full
        bg-light text-dark
        text-sm font-medium tracking-[0.01em]
        active:shadow-[0_1px_4px_rgba(0,0,0,0.07)]
        shadow-inner shadow-dark/80

        transition-shadow duration-300 ease-out
        cursor-pointer select-none
        will-change-transform
        overflow-visible ${className}`}
    >
      {/*
        ── Glow ring ─────────────────────────────────────────────────────────
        Absolutely-positioned sibling that pulses a soft ring on hover.
        Sits behind the button content via -z-10.
      */}
      <span
        ref={glowRef}
        className="
          absolute inset-0 rounded-full -z-10
          ring-[1.5px] ring-dark/[0.12]
          shadow-[0_0_0_4px_rgba(0,0,0,0.04)]
          pointer-events-none
        "
        aria-hidden="true"
      />

      {/*
        ── Words row ─────────────────────────────────────────────────────────
        Each word is wrapped in a span so GSAP can address them individually.
        `inline-block` is critical — otherwise GSAP can't transform inline text.
      */}
      <span className="flex items-center gap-[0.3em]">
        {words.map((word, i) => (
          <span
            key={i}
            ref={el => { wordsRef.current[i] = el; }}
            className="inline-block"
          >
            {word}
          </span>
        ))}
      </span>

    </Link>
  );
}