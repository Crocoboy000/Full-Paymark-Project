'use client';

import Link from 'next/link';
import { useRef } from 'react';

interface UniqueButtonProps {
  label: string;
  href: string;
  className?: string;
  
}

export default function UniqueButton({ label, href, className }: UniqueButtonProps) {
  const containerRef = useRef<HTMLAnchorElement>(null);
  const wordsRef     = useRef<(HTMLSpanElement | null)[]>([]);
  const glowRef      = useRef<HTMLSpanElement>(null);
  const words = label.split(' ');

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