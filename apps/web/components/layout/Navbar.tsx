'use client';

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';        
import { MenuIcon, CloseIcon, ShopIcon } from '../ui/Icons';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import UniqueButton from '@/components/ui/Button';
import { homeData } from '@/context/homeData';

const { navItems } = homeData;

// ─── Component ────────────────────────────────────────────────────────────────

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // DOM refs
  const overlayRef   = useRef<HTMLDivElement>(null);
  const menuIconRef  = useRef<HTMLSpanElement>(null);
  const closeIconRef = useRef<HTMLSpanElement>(null);
  const menuTitleRef = useRef<HTMLHeadingElement>(null);
  const itemRefs     = useRef<(HTMLAnchorElement | null)[]>([]);

  // GSAP timeline ref — built once, played / reversed on toggle
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // ── Build the timeline once on mount ──────────────────────────────────────
  useGSAP(() => {
    const overlay   = overlayRef.current;
    const menuIcon  = menuIconRef.current;
    const closeIcon = closeIconRef.current;
    const items     = itemRefs.current.filter(Boolean) as HTMLAnchorElement[];

    if (!overlay || !menuIcon || !closeIcon) return;

    // Respect reduced-motion preference
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ── Set initial hidden states ──
    gsap.set(overlay, {
      yPercent: -100,   // slide from above
      autoAlpha: 0,
      pointerEvents: 'none',
    });
    gsap.set(closeIcon, { autoAlpha: 0, rotate: -90, scale: 0.4, x: 20 });
    gsap.set(menuIcon,  { autoAlpha: 1, rotate: 0,   scale: 1,x:0   });
    gsap.set(menuTitleRef.current, { autoAlpha: 0, y: -40 });
    gsap.set(items,     { autoAlpha: 0, x: -20 });

    // ── Build reversible timeline ──
    const tl = gsap.timeline({
      paused: true,
      defaults: { ease: 'power3.out' },
       //Reduced-motion: instant transitions
      ...(reduced && { duration: 0 }),
    });

    tl
      // 1. Menu icon → close icon
      .to(menuIcon, {
        autoAlpha: 0,
        rotate: 90,
        scale: 0.4,
        duration: reduced ? 0 : 0.22,
        ease: 'power2.in',
        x: 20,
      })
      .to(
        closeIcon,
        {
          autoAlpha: 1,
          rotate: 0,
          scale: 1,
          x: 0,
          duration: reduced ? 0 : 0.28,
          ease: 'back.out(1.8)',
        },
        '-=0.05',          // tiny overlap for a snap feel
      )

      // 2. Overlay slides in from top
      .to(
        overlay,
        {
          yPercent: 0,
          autoAlpha: 1,
          pointerEvents: 'auto',
          duration: reduced ? 0 : 0.55,
          ease: 'power3.out',
        },
        '<-0.1',           // start slightly before icon finishes
      )
      .to(
        menuTitleRef.current,
        {
          autoAlpha: 1,
          y: 0,
          duration: reduced ? 0 : 0.25,
          ease: 'power2.out',
        },
        '-=0.3',
      )

      // 3. Nav items stagger in
      .to(
        items,
        {
          autoAlpha: 1,
          x: 0,
          duration: reduced ? 0 : 0.38,
          stagger: reduced ? 0 : 0.07,
          ease: 'power2.out',
        },
        '-=0.3',
      );

      tlRef.current = tl;
  }, []);

  // ── Play / reverse on toggle ───────────────────────────────────────────────
  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;
    isOpen ? tl.play() : tl.reverse();
  }, [isOpen]);

  // ── Handlers ──────────────────────────────────────────────────────────────

  const toggle = () => setIsOpen((prev) => !prev);

  const closeMenu = () => setIsOpen(false);

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      {/* ── Desktop navbar ───────────────────────────────────────────────── */}
      <nav className="hidden md:flex items-center w-full justify-around px-6 py-4 max-w-7xl mx-auto z-10 text-light">
          <img src="/logo.svg" alt="Logo" />

        <ul className="flex gap-6">
          {navItems.filter((item) => !item.additional).map(({ label, link }) => (
            <li
              key={label}
              className="hover:text-blue-600 text-caption font-normal transition-colors duration-200"
            >
              <Link href={link}>
              {label}
              </Link>
            </li>
          ))}
        </ul>
          

          <div className='flex justify-between items-center gap-5'>
            <Link href="/shop">
              <ShopIcon className="w-6 h-6" />
            </Link>

            <Link href="/login">
            <span className='text-caption '>Login</span>
            </Link>

            <UniqueButton label="Create Account" href="/login" />
          </div>


      </nav>

      {/* ── Mobile top bar (above overlay via z-index) ───────────────────── */}
      <div className="md:hidden relative z-[60] flex items-center justify-between px-6 py-4 text-light">
        <img src="/logo.svg" alt="Logo" />

        {/*
          Single button — two icon spans stacked on top of each other.
          GSAP handles opacity / transform for the swap.
        */}
        <button
          onClick={toggle}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          className="relative w-7 h-7 cursor-pointer"
        >
          {/* Hamburger */}
          <span
            ref={menuIconRef}
            className="absolute inset-0 flex items-center justify-center"
          >
            <MenuIcon className="w-6 h-6" />
          </span>

          {/* Close */}
          <span
            ref={closeIconRef}
            className="absolute inset-0 flex items-center justify-center"
          >
            <CloseIcon className="w-6 h-6" />
          </span>
        </button>
      </div>

      {/* ── Mobile overlay (slides from top) ─────────────────────────────── */}
      <div
        ref={overlayRef}
        className="md:hidden fixed inset-0 z-50 bg-dark overflow-hidden"
        aria-hidden={!isOpen}
      >
        {/* Nav links — padded to clear the top bar */}
        <div className="flex flex-col items-start gap-1 px-6 pt-24 pb-10">
          <h2 ref={menuTitleRef} className='text-h4 text-gray1/50 w-4 tabular-nums select-none'>Menu</h2>
          {navItems.map(({ label, link }, i) => (
            <a
              key={label}
              href={link}
              ref={(el) => { itemRefs.current[i] = el; }}
              onClick={closeMenu}
              className="
                group flex items-center gap-3 py-3 w-full
                text-h4 font-normal text-light
                border-b border-gray3
                hover:text-blue-500 transition-colors duration-200
              "
            >
              {/* Subtle index number for visual interest */}
              <span className="text-xs font-medium text-white/30 w-4 tabular-nums select-none">
                {String(i + 1).padStart(2, '0')}
              </span>
              {label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}