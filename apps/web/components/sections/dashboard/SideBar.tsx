'use client'

import React from 'react'
import { useState } from 'react';
import { useGSAP } from "@gsap/react";


import {UpgradeCard} from '../../features/dashboard/UpgradeCard';
import  SidebarNav  from './../../features/dashboard/SideBarNav';
import  {sidebarLinks}  from '@/context/dashboardData';
import { useRef } from 'react';
import {
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import gsap from 'gsap';
import { cn } from '@/lib/utils';


gsap.registerPlugin(useGSAP);




function SideBar() {
  const [expanded, setExpanded] = useState(false);
  const sidebarRef = useRef(null);
  const accentRef = useRef(null);
  const scope = useRef(null);
  const iconRef = useRef<HTMLDivElement>(null);


  useGSAP(() => {
  gsap.set(sidebarRef.current, {
    width: 70,
    height: 70,
  });

  gsap.set(accentRef.current, {
    width: 73,
    height: 73,
  });

  gsap.set(".nav-label", {
    autoAlpha: 0,
    x: -20,
  });

  gsap.set(".upCard", {
    autoAlpha: 0,
    scale: 0.5,
    y:50
  });
  gsap.set("logo", {
    autoAlpha: 0,
    display: "none",
    y: -50,
  });
}, {scope});


const toggleSidebar = () => {
  const tl = gsap.timeline({ });

  if (!expanded) {
    tl.to(
      sidebarRef.current,
      {
        width: 280,
        height: "105vh",
        duration: 0.3,
        ease: "elastic.out(1,0.6)",
      },""
    )
    .to(accentRef.current, {
      width: 283,
      height: "105vh",
      duration: 0.6,
      ease: "elastic.out(1,0.6)",
    })


      .to(
        "logo",
        {
          y: 0,
          autoAlpha: 1,
          display: "flex",
          duration: 0.5,
          ease: "back.out(2)",
        },
        "-=0.2"
      )

      .to(
        ".nav-label",
        {
          autoAlpha: 1,
          x: 0,
          stagger: 0.05,
          duration: 0.1,
        },
        "-=0.3"
      )
      .to('.upCard', {
        autoAlpha: 1,
        scale: 1,
        y:0
      }, "-=0.3")

      .to(
        iconRef.current,
        {
          rotate: 180,
          scale: 0.8,
          duration: 0.25,
        },
        0
      )

      .to(
        iconRef.current,
        {
          rotate: 360,
          scale: 1,
          duration: 0.25,
        }
      );
  } else {
    tl.to(".nav-label", {
      opacity: 0,
      x: -20,
      stagger: {
        each: 0.03,
        from: "end",
      },
      duration: 0.2,
    })
    .to('.upCard', {
      autoAlpha: 0,
      scale: 0.5,
      y:50,
      duration: 0.2,
      ease: "power2.out",
    }, "-=0.3")

      .to(
        "logo",
        {
          y: -50,
          display: "none",
          autoAlpha: 0,
          duration: 0.2,
        },
        0
      )

      .to(
        sidebarRef.current,
        {
          width: 70,
          height: 70,
          duration: 0.45,
          ease: "power3.inOut",
        },
        ""
      )

      .to(
        accentRef.current,
        {
          width: 73,
          height: 73,
          duration: 0.55,
          ease: "elastic.out(1,0.8)",
        },
        "<"
      )

      .to(
        iconRef.current,
        {
          rotate: -180,
          scale: 0.8,
          duration: 0.25,
        },
        0
      )

      .to(
        iconRef.current,
        {
          rotate: 0,
          scale: 1,
          duration: 0.25,
        }
      );
  }

  setExpanded((prev) => !prev);
};



  return (
    
    <div
ref={scope}
className="
  fixed bottom-0 left-0 top-0 z-50 
"
>
  <div
    ref={accentRef}
    className="
      absolute inset-0
      bg-primary
      rounded-r-3xl
      opacity-50
    "
  />

  <aside
    ref={sidebarRef}
    className="
      absolute inset-y-0 left-0
      bg-dark-bg
      flex flex-col
      gap-5
      rounded-r-3xl
      overflow-hidden
      transition-all
      duration-300
      ease-in-out
      py-5

    "
    >
        <div className='flex justify-between items-center px-5'>
                 <img src="/logo.svg" alt="Logo" className={cn("logo transition-all duration-300",expanded?"":"hidden")} />
                 <button
  onClick={toggleSidebar}
  className="
    flex h-10 w-10 items-center
    justify-center rounded-xl
    text-white transition-all duration-300
  "
>
  <div className='icon' ref={iconRef}>

    {
      expanded ? (
        <ArrowLeft size={20} />
      ) : (
        <ArrowRight size={20} />
      )
    }

  </div>
</button>
        </div>

        <ul className='flex flex-col w-full gap-5 justify-between'>
            {sidebarLinks.map((link) => (
              <SidebarNav key={link.href} href={link.href} label={link.label} icon={link.icon} />
            ))}

        </ul>
        <UpgradeCard />
</aside>
    </div>
  )
}

export default SideBar