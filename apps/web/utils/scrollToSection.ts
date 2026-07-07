'use client'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

function power4InOut(t: number): number {
  return t < 0.5
    ? 8 * t * t * t * t
    : 1 - Math.pow(-2 * t + 2, 4) / 2
}

export function scrollToSection(href: string, delay: number = 0) {
  const id = href.replace('/#', '')
  if (!id) return

  const el = document.getElementById(id)
  if (!el) return

  const lenis = (window as any).__lenis as {
    scrollTo: (
      target: Element | string,
      opts?: {
        offset?: number
        duration?: number
        easing?: (t: number) => number
        immediate?: boolean
        lock?: boolean
        onComplete?: () => void
      },
    ) => void
  } | null

  const doScroll = () => {
    if (lenis) {
      lenis.scrollTo(el, {
        duration: 1.5,
        easing: power4InOut,
        offset: -80,
      })
    } else {
      gsap.to(window, {
        duration: 1.9,
        scrollTo: { y: `#${id}`, offsetY: 80 },
        ease: 'power4.inOut',
      })
    }
  }

  if (delay > 0) {
    setTimeout(doScroll, delay)
  } else {
    doScroll()
  }
}
