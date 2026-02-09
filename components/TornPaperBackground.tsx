"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TornBackground() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  /* ---------------- SCROLL REVEAL ---------------- */
  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      }
    );
  }, []);

  return (
    <div ref={sectionRef} className="w-full overflow-hidden">
      {/* ========== WHITE TORN STRIP (30px) ========== */}
      <svg
        viewBox="0 0 1600 30"
        preserveAspectRatio="none"
        className="w-full h-[30px]"
      >
        <rect width="1600" height="30" fill="#ffffff" />
        <path
          d="
            M0,18
            C100,28 200,10 300,18
            C400,26 500,12 600,18
            C700,26 800,10 900,18
            C1000,26 1100,12 1200,18
            C1300,26 1400,12 1500,18
            C1550,22 1600,18 1600,18
            L1600,0
            L0,0
            Z
          "
          fill="#ffffff"
        />
      </svg>

      {/* ========== YELLOW MAIN SECTION (110vh) ========== */}
      <div className="relative w-full h-[110vh] bg-[#FFCC00]">
        {/* TOP MATCHING TEAR */}
        <svg
          viewBox="0 0 1600 40"
          preserveAspectRatio="none"
          className="absolute top-0 left-0 w-full h-[40px]"
        >
          <path
            d="
              M0,0
              C100,14 200,0 300,14
              C400,28 500,0 600,14
              C700,28 800,0 900,14
              C1000,28 1100,0 1200,14
              C1300,28 1400,0 1500,14
              C1550,18 1600,14 1600,14
              L1600,40
              L0,40
              Z
            "
            fill="#FFCC00"
          />
        </svg>

        {/* CONTENT AREA */}
        <div className="relative z-10 h-full">{/* your content here */}</div>

        {/* ========== BOTTOM TORN EDGE ========== */}
        <svg
          viewBox="0 0 1600 60"
          preserveAspectRatio="none"
          className="absolute bottom-0 left-0 w-full h-[60px]"
        >
          <path
            d="
              M0,0
              C120,20 240,50 360,30
              C480,10 600,50 720,30
              C840,10 960,50 1080,30
              C1200,10 1320,50 1440,30
              C1520,20 1560,40 1600,30
              L1600,60
              L0,60
              Z
            "
            fill="#FFCC00"
          />
        </svg>
      </div>
    </div>
  );
}
