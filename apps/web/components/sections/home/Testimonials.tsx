"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { homeData } from "@/context/homeData";

const { testimonials } = homeData;

function Testimonials() {
  const [current, setCurrent] = useState(0);

  const imageRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const changeReview = (direction: number) => {
    const next = (direction + testimonials.length + current) % testimonials.length;

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrent(next);

        requestAnimationFrame(() => {
          gsap.set(imageRef.current, {
            x: 100,
            opacity: 0,
          });

          gsap.set(contentRef.current, {
            x: -100,
            opacity: 0,
          });

          gsap
            .timeline()
            .to(imageRef.current, {
              x: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power3.out",
            })
            .to(
              contentRef.current,
              {
                x: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power3.out",
              },
              "-=.3"
            );
        });
      },
    });

    tl.to([imageRef.current, contentRef.current], {
      opacity: 0,
      duration: 0.25,
    });
  };

  const item = testimonials[current];

  return (
    <div className="max-w-7xl mx-auto text-light flex flex-col gap-16 px-2 sm:px-8 py-24 overflow-hidden">

      <h2 className="text-center text-h3 md:text-h2 leading-h2">Customer Testimonials</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 w-full lg:grid-cols-[280px_1fr_280px] md:gap-8 gsap-5 items-center">

        <div
          ref={imageRef}
          className="relative hidden sm:flex rounded-[28px] overflow-hidden border border-white/5 lg:w-full lg:h-full md:w-70 md:h-70 sm:h-60 sm:w-60 h-50 w-50"
        >
          {/* <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" /> */}
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>


        <div
          ref={contentRef}
          className="flex flex-col gap-6 justify-center px-15 sm:px-2 lg:max-w-[500px] max-w-200"
        >
          <h3 className="text-caption sm:text-h5 flex gap-8 items-center justify-center md:text-h4">
            
                      <img
            src={item.image}
            alt={item.title}
            className="w-15 rounded-full flex sm:hidden"
          />
          <span>
            {item.title}
          </span>
          </h3>

          <p className="text-[12px] md:text-caption lg:text-body text-light/70 leading-relaxed">
            &quot;{item.review}&quot;
          </p>

          <p className="text-[12px] md:text-caption text-light/60 pt-6">{item.author}</p>
        </div>

        <div className="hidden lg:block relative rounded-[28px] overflow-hidden border border-white/5 h-[320px] opacity-80 scale-50">
          <img
            src={testimonials[(current + 1) % testimonials.length].image}
            alt={testimonials[(current + 1) % testimonials.length].title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>


      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <button
            onClick={() => changeReview(-1)}
            className="size-14 rounded-full border border-white/20 hover:bg-white/5 transition"
          >
            ←
          </button>

          <button
            onClick={() => changeReview(1)}
            className="size-14 rounded-full border border-white/20 hover:bg-white/5 transition"
          >
            →
          </button>
        </div>

        <div className="text-h5 text-light/50">
          {current + 1}/{testimonials.length}
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
