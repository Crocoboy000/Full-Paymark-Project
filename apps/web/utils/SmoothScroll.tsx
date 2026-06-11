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
                prevent: (node: any) => node.classList.contains('lenis-prevent'),
            });
            
            lenis.on('scroll', ScrollTrigger.update);
            
            ticker = (time: number) => {
                if (lenis) {
                    lenis.raf(time * 1000);
                }
            };
            
            gsap.ticker.add(ticker);
            gsap.ticker.lagSmoothing(0);
        } catch (error) {
            console.warn('Error initializing Lenis:', error);
            return;
        }

        return () => {
            try {
                if (ticker) {
                    gsap.ticker.remove(ticker);
                }
                if (lenis) {
                    lenis.destroy();
                }
            } catch (error) {
                console.warn('Error cleaning up Lenis:', error);
            }
        };

    }, []);
// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
  return (
    <div className="w-full h-full">
      {children}
    </div>  
  )
}

export default SmoothScroll