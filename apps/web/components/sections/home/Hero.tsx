'use client'
import { useGSAP } from '@gsap/react';
import UniqueButton from '@/components/ui/Button';
import Image from 'next/image';
import React from 'react';
import gsap from 'gsap';

gsap.registerPlugin(useGSAP);

function Hero() {
  const HeroRef = React.useRef(null);

  useGSAP(
    () => {

      const hero = HeroRef.current as HTMLElement | null;

      const title = hero?.querySelector(".title");
      const subtitle = hero?.querySelector(".subtitle");
      const action = hero?.querySelector(".action");
      const mainCard = hero?.querySelector(".main-card");
      const subCard = hero?.querySelectorAll(".sub-cards");

      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
          duration: 1,
        },
      });

      tl.from([title, subtitle], {
        opacity: 0,
        y: 40,
        stagger: .12,
      })

        .from(
          [action, mainCard],
          {
            opacity: 0,
            y: 50,
            scale: .52,
            stagger: .08,
          },
          "-=.72"
        )


        .from(
          subCard as NodeListOf<HTMLElement>,
          {
            opacity: 0,
            scale: .95,
            y: 60,
            duration: 1.1,
            ease: "expo.out",
          },
          "-=.65"
        );
    },
    { scope: HeroRef }
  );

  return (
    <section
      ref={HeroRef}
      className="text-light max-w-7xl relative flex flex-col  items-center w-full gap-12   md:gap-20 lg:gap-25 z-5 py-12 justify-start "
    >
      <div className="w-full flex flex-col justify-start items-center">
        <h1 className="text-[33px] title sm:text-h2 w-90 sm:w-120   md:w-190 lg:text-h1 lg:w-180 text-center">
          Smart Solutions Built For The <span className="text-primary">Future Of Finance</span>
        </h1>
        <p className="text-[13px] subtitle sm:text-caption font-normal text-light/70 text-center w-90 sm:w-110 md:text-body md:w-120 lg:w-190">
          Track the growth and engagement of your newsletter detailed analytics your reach.{" "}
        </p>
        <div className=" max-w-100 md:max-w-120 rounded-2xl overflow-hidden action w-full flex lg:max-w-140 mt-8 z-5  relative justify-center items-center">
          <input
            type="text"
            name=""
            className="bg-gray-500/30 w-[90%] border border-gray-500/70 rounded-full px-6 py-4 lg:py-6 placeholder:text-light focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-primary"
            id=""
            placeholder="Enter your email"
          />
          <UniqueButton className='absolute right-0 shadow btn font-medium h-14 lg:h-full lg:text-lg lg:w-39 top-0 shadow-dark/70' label="Send Code" href="/dashboard" />
        </div>
      </div>

      <div className="w-full relative flex justify-center items-center">
        <Image
          alt="Card"
          src="/MainCard.svg"
          className="main-card w-[65%] sm:w-[56%] md:w-[50%] lg:w-[40%] z-5"
          width={500}
          height={300}
        />
        <Image
          alt="Card"
          src="/CardBehind.svg"
          className="sub-cards w-[90%] md:w-[75%] lg:w-[65%] rounded-2xl absolute"
          width={500}
          height={300}
        />
      </div>

      <Image src="/pattern.svg" alt="Wave" className='inset-0 h-full w-full bottom-1/6 absolute rounded-3xl' width={1440} height={500} />
    </section>
  );
}

export default Hero
