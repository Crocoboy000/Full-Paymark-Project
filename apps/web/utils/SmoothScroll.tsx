'use client'
import React, { useEffect } from 'react'
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';



function SmoothScroll({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        if (typeof window === 'undefined') return;

        let lenis: Lenis | null = null;
        let ticker: ((time: number) => void) | null = null;

        try {
            lenis = new Lenis({
                prevent: (node: Element) => node.classList.contains('lenis-prevent'),
            });

            (window as unknown as { __lenis: Lenis | null }).__lenis = lenis;
            
            lenis.on('scroll', ScrollTrigger.update);
            
            ticker = (time: number) => {
                if (lenis) {
                    lenis.raf(time * 1000);
                }
            };
            
            gsap.ticker.add(ticker);
            gsap.ticker.lagSmoothing(0);
        } catch {
            return;
        }

        return () => {
            try {
                if ((window as unknown as { __lenis: Lenis | null }).__lenis === lenis) {
                    delete (window as unknown as { __lenis: Lenis | null | undefined }).__lenis;
                }
                if (ticker) {
                    gsap.ticker.remove(ticker);
                }
                if (lenis) {
                    lenis.destroy();
                }
            } catch {
            }
        };

    }, []);
  return (
    <div className="w-full h-full">
      {children}
    </div>  
  )
}

export default SmoothScroll