"use client";

import Image from "next/image";
import UniqueButton from "@/components/ui/Button";
import { homeData } from "@/context/homeData";

const { footerLinks, socials } = homeData;

function Footer() {
  return (
    <footer
      className="
        max-w-7xl
        mx-auto
        text-light
        overflow-hidden
        border-t
        border-white/[0.05]
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          px-6
          md:px-10
          lg:px-14
          py-16
          flex
          flex-col
          gap-16
        "
      >
        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-[1.2fr_.8fr]
            gap-16
          "
        >
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-6">
              <h3
                className="
                  text-h5
                  md:text-h4
                  leading-h4
                  font-medium
                "
              >
                Subscribe Newsletter
              </h3>

              <div
                className="
                  w-full
                  max-w-[520px]
                  h-18
                  rounded-full
                  border
                  border-white/8
                  bg-white/2
                  flex
                  items-center
                  justify-between
                  p-2
                "
              >
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="
                    flex-1
                    bg-transparent
                    outline-none
                    px-5
                    text-[12px]
                    md:text-caption
                    placeholder:text-light/35
                  "
                />

                <UniqueButton
                  label="Send Now"
                  href="/"
                  className="
                    h-full
                    px-6
                    md:px-8
                    rounded-full
                    text-dark
                    text-[12px]
                    md:text-caption
                  "
                />
              </div>
            </div>

            <div className="relative w-[220px] md:w-[320px] h-[60px] md:h-[90px]">
              <Image
                src="/logo.svg"
                alt="Paymark Logo"
                fill

                quality={75}
                className="object-contain object-left"
              />
            </div>
          </div>

          <div
            className="
              grid
              grid-cols-2
              sm:grid-cols-2
              md:grid-cols-4
              gap-10
            "
          >
            {footerLinks.map((section, index) => (
              <div key={index} className="flex flex-col gap-5">
                <h4
                  className="
                    text-[12px]
                    md:text-[14px]
                    whitespace-nowrap
                  "
                >
                  {section.title}
                </h4>

                <div className="flex flex-col gap-4">
                  {section.links.map((link, i) => (
                    <button
                      key={i}
                      className="
                        w-fit
                        text-left
                        text-[12px]
                        text-light/70
                        transition-all
                        duration-300
                        hover:text-light
                        hover:translate-x-1
                      "
                    >
                      {link}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full h-px bg-white/[0.08]" />

        <div
          className="
            flex
            flex-col
            md:flex-row
            items-start
            md:items-center
            justify-between
            gap-10
          "
        >
          <p
            className="
              text-[11px]
              md:text-caption
              text-light/65
              leading-relaxed
            "
          >
            © Copyright 2026 | Powered By Framer
          </p>

          <div className="flex items-center gap-4">
            {socials.map((social, index) => (
              <button
                key={index}
                className="
                  size-14
                  rounded-full
                  border
                  border-white/[0.06]
                  bg-white/[0.03]
                  flex
                  items-center
                  justify-center
                  text-[12px]
                  md:text-caption
                  text-light/80
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-white/[0.06]
                  hover:border-primary/20
                "
              >
                {social}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        className="
          absolute
          bottom-[-250px]
          left-1/2
          -translate-x-1/2
          w-[700px]
          h-[400px]
          rounded-full
          bg-primary/10
          blur-[140px]
          pointer-events-none
        "
      />
    </footer>
  );
}

export default Footer;
