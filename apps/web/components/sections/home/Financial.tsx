"use client";

import { useRef } from "react";
import FinancialCard from "@/components/features/FinancialCard";
import { homeData } from "@/context/homeData";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const { financialCards } = homeData;

function Financial() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".card");

      const master = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 20%",
          end: `+=${cards.length * 800}`,
          pin: true,
          scrub: 1,
          pinSpacing: true,
          anticipatePin: 1,
        },
      });


      gsap.set([".firstlogo", ".lastlogo"], { autoAlpha: 0,y:-80 });
      
      cards.forEach((card, i) => {
        const title = card.querySelector(".financial-title");
        const desc = card.querySelector(".financial-desc");
        const btn = card.querySelector(".financial-btn");
        const main = card.querySelector(".financial-card-main-img");
        const accent = card.querySelector(".financial-card-accent-img");
        
        const content = [main, title, desc, accent, btn];
        
        const tl = gsap.timeline({
        });

          if(i===0){

          tl.to(
            ".firstlogo",
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.6,
              ease: "expo.out",
            },
            0
          );

           }

            else if(i===1){

                    tl.to(
                    ".lastlogo",
                    {
                    autoAlpha:1,
                    y:-15,
                    duration:.6,
                    ease:"expo.out"
                    },
                    0
                    )

          }

            else{

            tl.to(
            ".firstlogo,.lastlogo",
            {
            autoAlpha:0,
            y:-80,
            duration:.6,
            ease:"expo.out"
            },
            0
          )

          }

        cards.slice(0, i).forEach((prev, idx) => {
          const depth = i - idx;

          tl.to(
            prev,
            {
              y: -depth * 35,
              scale: 1 - depth * 0.05,
              duration: 0.8,
              ease: "power3.out",
            },
            0
          );
        });

        tl.fromTo(
          card,
          { y: 180, scale: 0.9, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, duration: 1, ease: "expo.out" },
          0
        );

        tl.from(
          content,
          { opacity: 0, y: 40, stagger: 0.08, duration: 0.6, ease: "power3.out" },
          0.35
        );

        master.add(tl);
      });
    },
    { scope: containerRef }
  );

  return (
    <section className="text-light max-w-7xl z-20 relative flex flex-col justify-between items-center w-full">
      <div className="flex flex-col items-center justify-center gap-2">
        <h2 className="text-h3 font-normal text-center">Bank Complete Confidence</h2>
        <p className="text-[14px] text-light/60 text-center w-110">
          Enjoy high-yield accounts, unlimited 2% cashback cards for Pro customers, and flexible working capital to power your business.
        </p>
      </div>

      <div
        ref={containerRef}
        className="
          relative
          w-full
          h-[520px]
          md:h-[620px]
          flex
          items-center
          justify-center
          max-w-[95%]
          sm:max-w-[80%]
          md:max-w-[90%]
          mx-auto
        "
      >
        <Image
          src="/logoback.svg"
          alt="financial"
          width={300}
          height={100}
          className="absolute firstlogo -top-70 w-60 -left-25 z-0 opacity-30"
        />
        <Image
          src="/logoback.svg"
          alt="financial"
          width={300}
          height={100}
          className="absolute lastlogo -bottom-50 w-55 -right-25 z-0 opacity-30"
        />

        {financialCards.map((card, index) => (
          <div
            key={index}
            className="absolute left-0 top-0 w-full h-full flex justify-center items-center pointer-events-none"
          >
            <FinancialCard
              title={card.title}
              desc={card.desc}
              href={card.href}
              label={card.label}
              mainImage={card.mainImage}
              accentImage={card.accentImage}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Financial;
