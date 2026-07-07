'use client'
import Image from 'next/image'
import { useRef } from 'react';
import UniqueButton from '@/components/ui/Button';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';



gsap.registerPlugin(ScrollTrigger);




function Offer() {

    const Offerref = useRef(null);

    useGSAP(() => {

        gsap.set(".cards", {y:200,scale:0.7})
        gsap.to(".cards", {y:70,duration:1.5,scale:1,ease:"power2.out",scrollTrigger: { trigger: ".cards", start: "top 95%", end: "bottom 70%",scrub: true }})
    }, {scope: Offerref})


  return (
    <section id="offer" ref={Offerref}  className='max-w-7xl mx-auto flex z-15 h-full text-light flex-col items-center mt-25 justify-between overflow-hidden'>
        <div className='space-y-4 flex flex-col items-center justify-center z-18'>
      <h2 className='text-h4 sm:text-h3 md:text-h2 text-center font-medium w-90 sm:w-150 md:w-190'>Apply in Under 10 minutes today!</h2>
      <p className='text-[10px] text-light/70 sm:text-[13px] md:text-caption lg:text-body'>Join over 1,000 businesses already benefiting from Paymark.</p>
      <UniqueButton label="Apply Now" href="/#offer" />
        </div>
    <div className="w-full relative cards flex justify-center z-15 items-center">
         <Image src="/MainCard.svg" alt="Card" className='scale-70 sm:scale-85 z-5 md:scale-90 lg:scale-115' width={500} height={300} />
        <Image src="/CardBehind.svg" alt="Card" className='scale-90 w-full absolute rounded-2xl md:scale-80 lg:scale-75 xl:scale-60' width={500} height={300} />
    </div>
 <Image src="/pattern.svg" alt="Wave" className='inset-0 absolute rounded-3xl z-5 w-full h-full' width={1440} height={500} /> 
    </section>
  )
}

export default Offer