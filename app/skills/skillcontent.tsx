
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
// import Lenis from "@studio-freight/lenis";
import { FiCpu, FiActivity, FiTool, FiUsers, FiFlag } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

/* ---------------- DATA ---------------- */

export const contentData = [
  {
    title: "Technical Expertise",
    icon: FiCpu,
    items: [
      "Clinical Biochemistry & Diagnostic Testing",
      "Microbiological Analysis & Sterility Testing",
      "Quality Assurance (QA) & Quality Control (QC)",
      "WHO–GMP Compliance & Audit Documentation",
      "Nanoparticle Synthesis",
      "Green Synthesis & Antimicrobial Evaluation",
      "ELISA & Rapid Diagnostic Assays",
      "Research Design, Data Interpretation & Reporting",
    ],
    color: "from-blue-500 to-cyan-400",
    bgColor: "bg-gradient-to-br from-[#BFE6DF] to-[#FBF3EA]",
    iconColor: "bg-blue-500",
  },
  {
    title: "Laboratory & Research Tools",
    icon: FiTool,
    items: [
      "Beckman Coulter DxC 700 AU",
      "BACT/ALERT 3D",
      "VITEK 2",
      "ELISA Analyzer",
      "General Laboratory Tools & Devices",
      "Power BI",
      "Microsoft Excel",
      "Figma",
    ],
    color: "from-emerald-500 to-teal-400",
    bgColor: "bg-gradient-to-br from-[#FBF1A9] to-[#FBF3EA]",
    iconColor: "bg-emerald-500",
  },
  {
    title: "Research & Innovation Skills",
    icon: FiActivity,
    items: [
      "Experimental Workflow Development & Optimization",
      "Statistical Validation & Result Reproducibility",
      "Literature Review & Scientific Writing",
      "Patent Feasibility & Innovation Assessment",
      "Sustainable & Translational Biotechnology Solutions",
    ],
    color: "from-purple-500 to-pink-400",
    bgColor: "bg-gradient-to-br from-[#FBF3EA] to-[#BFE6DF]",
    iconColor: "bg-purple-500",
  },
  {
    title: "Collaboration & Professional Skills",
    icon: FiUsers,
    items: [
      "Cross-disciplinary Team Collaboration",
      "Academic–Clinical–Industry Coordination",
      "Project Planning & Execution",
      "Scientific Presentation & Communication",
      "Regulatory & Compliance Support",
    ],
    color: "from-amber-500 to-orange-400",
    bgColor: "bg-gradient-to-br from-[#BFE6DF] to-[#FBF1A9]",
    iconColor: "bg-amber-500",
  },
];

/* ---------------- COMPONENT ---------------- */

export default function SkillContext() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);
  const thankRef = useRef<HTMLDivElement>(null);

  /* -------- LENIS -------- */

 

  /* -------- GSAP VIDEO SCROLL -------- */

useEffect(() => {
  const mm = gsap.matchMedia();

  let ctx: gsap.Context | null = null;

  mm.add("(min-width: 1024px)", () => {
    ctx = gsap.context(() => {
      const viewportH = window.innerHeight;
      const segments = contentData.length;
      const sceneHeight = viewportH * segments - 100;

      gsap.set(cardRefs.current, {
        opacity: 0,
        scale: 0.94,
        rotateZ: 0,
      });

      gsap.set(titleRef.current, {
        y: 160,
        opacity: 1,
      });

      gsap.to(titleRef.current, {
        y: -window.innerHeight * 0.9,
        opacity: 0,
        scrollTrigger: {
          trigger: sceneRef.current,
          start: "top 30%",
          end: "top -100%",
          scrub: 2.5,
        },
      });

      const trigger = ScrollTrigger.create({
        trigger: sceneRef.current,
        start: "top top",
        end: `+=${sceneHeight}`,
        scrub: 2.5,
        pin: true,

        onUpdate: (self) => {
          const progress = self.progress;

          /* 🚗 CAR */
          const carMaxTravel = viewportH * 0.85;
          const carY = progress * carMaxTravel;
          gsap.set(carRef.current, { y: carY });

          const centerY = viewportH / 2;

          /* 🃏 CARDS */
          cardRefs.current.forEach((card, i) => {
            const segmentStart = i / segments;
            const segmentEnd = (i + 1) / segments;

            const localProgress = gsap.utils.clamp(
              0,
              2,
              (progress - segmentStart) / (segmentEnd - segmentStart),
            );

            const cardY = viewportH - localProgress * viewportH;

            gsap.set(card, { y: cardY });

            const cardViewportY =
              card.getBoundingClientRect().top + card.offsetHeight / 3;

            const dist = Math.abs(cardViewportY - centerY);

            if (dist < viewportH * 0.65) {
              gsap.set(card, { opacity: 1, scale: 1 });
            } else {
              gsap.set(card, { opacity: 0, scale: 0.94 });
            }
          });
        },
      });

      // 🔥 THIS IS THE KEY FIX
      trigger.update();
      ScrollTrigger.refresh();
    }, sceneRef);
  });

  return () => {
    ctx?.revert();
    mm.revert();
  };
}, []);


  /* ---------------- JSX ---------------- */
  return (
    <div className="bg-gradient-to-b from-[#FBF3EA] via-[#BFE6DF] to-[#FBF1A9] text-black items-start">
      {/* INTRO / HEADING */}
      <section
        ref={titleRef}
        className="relative flex flex-col items-center justify-start top-30 bg-gradient-to-b from-red-600 to-black bg-clip-text text-transparent select-none"
      >
        <h1
          className="
      text-[clamp(2.5rem,12vw,13rem)]
      font-extrabold
      leading-none
      tracking-tight
    "
        >
          Skill Journey
        </h1>

        <p
          className="
      mt-4 sm:mt-6
      text-center
      text-[clamp(0.9rem,2.5vw,1.4rem)]
      text-gray-700
      max-w-[90%] sm:max-w-[680px] z-30
    "
        >
          Driving growth through skills, step by step.
        </p>
      </section>

      {/* VIDEO SCENE */}
      <section ref={sceneRef} className="relative h-screen items-start z-10">
        {/* ROAD */}
        <div className="absolute inset-0 flex justify-center">
          <div className="w-[6px] sm:w-3 bg-gray-400 rounded-full z-10" />
        </div>

        {/* CAR */}
        <div
          ref={carRef}
          className="absolute left-1/2 -translate-x-1/4 z-20"
        >
          <div className="relative w-14 sm:w-16 md:w-20 h-8 sm:h-9 md:h-10 bg-red-500 rounded-lg rotate-90 shadow-xl">
            <div className="absolute -bottom-2 left-2 sm:left-3 w-3 sm:w-4 h-3 sm:h-4 bg-black rounded-full" />
            <div className="absolute -bottom-2 right-2 sm:right-3 w-3 sm:w-4 h-3 sm:h-4 bg-black rounded-full" />
          </div>
        </div>

        {/* CARDS */}
        {contentData.map((sec, i) => {
          const Icon = sec.icon;
          const isLeft = i % 2 === 0;

          return (
            <div
              key={i}
              ref={(el) => {
                if (el) cardRefs.current[i] = el;
              }}
              className={`
              absolute z-50
              ${isLeft ? "left-4 sm:left-10 md:left-20" : "right-4 sm:right-10 md:right-20"}
            `}
              style={{
                width: "clamp(280px, 80vw, 520px)",
              }}
            >
              {/* CARD */}
              <div
                className="
              relative
              rounded-3xl
              bg-white/90
              backdrop-blur-xl
              border border-gray-200
              shadow-[0_20px_50px_rgba(0,0,0,0.12)]
              overflow-hidden
            "
              >
                <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-black via-gray-700 to-black" />

                <div className="p-5 sm:p-6 md:p-7">
                  <div className="flex gap-4 mb-5">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black text-white rounded-xl flex items-center justify-center">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg md:text-xl font-bold">
                        {sec.title}
                      </h3>
                      <div className="mt-1 h-1 w-10 bg-black rounded-full" />
                    </div>
                  </div>

                  <ul className="space-y-2 sm:space-y-3">
                    {sec.items.map((it, idx) => (
                      <li
                        key={idx}
                        className="flex gap-3 text-xs sm:text-sm md:text-base text-gray-800"
                      >
                        <span className="mt-2 w-2 h-2 bg-black rounded-full flex-shrink-0" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
