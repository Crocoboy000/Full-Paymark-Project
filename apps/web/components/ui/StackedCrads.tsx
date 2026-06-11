'use client'
import { useGSAP } from '@gsap/react'
import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function StackedCards({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const scope = containerRef.current
      if (!scope) return


      const cards = gsap.utils.toArray<HTMLElement>('.card', scope)
      cards.forEach((card, i) => {
        if (!card) return
        gsap.set(cards, {  rotateX: 0, yPercent: 30 *(i+1) })
        gsap.to(card, { yPercent:0, rotateX: 5, duration: 1.9, ease: 'power2.inOut', delay: i * 0.1,
         scrollTrigger: { trigger: card, start: 'top 20%', pin: true,  invalidateOnRefresh: true, pinSpacing: false } })
      })


    },
    { scope: containerRef, dependencies: [] }
  )

  return (


      <div
        ref={containerRef}
        className='relative w-full pt-25 pb-12 justify-start flex flex-col  items-center max-w-[95%] sm:max-w-[80%] md:max-w-[90%] mx-auto '
      >
        {children}
      </div>
  )
}

export default StackedCards