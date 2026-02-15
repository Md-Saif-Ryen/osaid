"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DATA = [
  {
    title: "Approach / Working Style",
    desc: "I approach problems with a balance of scientific rigor and practical thinking. I value clarity, documentation, collaboration, and continuous learning while working in research and industry environments.",
    bg: "linear-gradient(180deg, #FFCC00 0%, #000000 100%)",
  },
  {
    title: "Motivation & Direction",
    desc: "My curiosity lies in translating complex biological data into meaningful insights that can improve diagnostics, healthcare workflows, and patient outcomes.",
    bg: "linear-gradient(0deg, #FF0000 0%, #000000 100%)",
  },
  {
    title: "Interdisciplinary Angle",
    desc: "Alongside biotechnology, I have a growing interest in UX, data visualization, and digital health tools, believing that good design plays a key role in making scientific information more accessible and impactful.",
    bg: "linear-gradient(180deg, #00B3FF 0%, #000000 100%)",
  },
];

export default function PentagonPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const ethosRef = useRef<HTMLDivElement>(null);
  const pentagonRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<HTMLDivElement[]>([]);

  // Refs for all three pentagons
  const pentagon1Ref = useRef<HTMLDivElement>(null);
  const pentagon2Ref = useRef<HTMLDivElement>(null);
  const pentagon3Ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
   
    const ctx = gsap.context(() => {
      // Single timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      /* ---------------- ETHOS ANIMATION ---------------- */
      tl.fromTo(
        ethosRef.current,
        {
          fontSize: "25vw",
          lineHeight: "1",
          y: 40,
        },
        {
          fontSize: "75px",
          lineHeight: "1.2",
          ease: "power3.inOut",
          duration: 2,
          y: 0,
        },
      );

      /* ---------------- INITIAL SETUP ---------------- */
      // Setup for first pentagon (the one that moves)
      gsap.set(pentagonRef.current, {
        opacity: 0,
        scale: 0.6,
        left: "12%",
        bottom: "0%",
        rotate: 0,
      });

      // Setup for all pentagons (static ones)
      gsap.set([pentagon1Ref.current, pentagon2Ref.current], {
        opacity: 0,
        scale: 0.6,
      });

      // Set initial positions for static pentagons
      gsap.set(pentagon1Ref.current, {
        left: "12%",
        bottom: "0%",
        rotate: 0,
        background: DATA[0].bg,
      });

      gsap.set(pentagon2Ref.current, {
        left: "88%",
        bottom: "0%",
        xPercent: -100,
        yPercent: 0,
        rotate: 0,
        background: DATA[2].bg,
      });

      gsap.set(textRefs.current, { opacity: 0 });
      gsap.set(textRefs.current[0], { opacity: 1 });

      /* ---------------- PENTAGON ANIMATIONS ---------------- */

      // 1️⃣ FIRST PENTAGON APPEARS
      tl.to(pentagonRef.current, {
        opacity: 1,
        scale: 1,
        duration: 2,
        boxShadow: "0 40px 80px rgba(0,0,0,0.4)",
        ease: "power3.out",
      });

      // 2️⃣ FIRST PENTAGON MOVES TO CENTER & FLIPS
      tl.to(pentagonRef.current, {
        rotate: 180,
        left: "50%",
        bottom: "50%",
        xPercent: -50,
        yPercent: 50,
        filter: "blur(2px)",
        background: DATA[1].bg,
        duration: 2,
        ease: "power3.inOut",
      })
        .to(pentagonRef.current, { filter: "blur(0px)", duration: 1 })
        .to(textRefs.current[0], { opacity: 0 }, "-=1")
        .to(textRefs.current[1], { opacity: 1 }, "<");

      // 3️⃣ FIRST PENTAGON MOVES TO RIGHT
      tl.to(pentagonRef.current, {
        rotate: 360,
        left: "88%",
        bottom: "0%",
        xPercent: -100,
        yPercent: 0,
        filter: "blur(2px)",
        background: DATA[2].bg,
        duration: 2,
        ease: "power3.inOut",
      })
        .to(pentagonRef.current, { filter: "blur(0px)", duration: 1 })
        .to(textRefs.current[1], { opacity: 0 }, "-=1")
        .to(textRefs.current[2], { opacity: 1 }, "<");

      /* ---------------- REVEAL ALL THREE PENTAGONS ---------------- */
      // Fade out the moving pentagon and reveal static ones
      tl.to(pentagonRef.current, {
        opacity: 0,
        duration: 1,
      });

      // Reveal the first static pentagon (left position)
      tl.to(
        pentagon1Ref.current,
        {
          opacity: 1,
          scale: 1,
          scrub: 1,
          duration: 1,
          boxShadow: "0 40px 80px rgba(0,0,0,0.4)",
          ease: "power3.out",
        },
        "<",
      );

      // Reveal the second static pentagon (center position - flipped)
      tl.to(
        pentagon2Ref.current,
        {
          opacity: 1,
          scale: 1,
          left: "50%",
          bottom: "50%",
          xPercent: -50,
          yPercent: 50,
          rotate: 180, // Flipped only the pentagon
          duration: 1,
          boxShadow: "0 40px 80px rgba(0,0,0,0.4)",
          ease: "power3.out",
        },
        "<0.3",
      );

      // Reveal the third pentagon (right position - keep opacity 1)
      tl.to(
        pentagonRef.current,
        {
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        },
        "<0.6",
      );

      /* ---------------- SHOW TEXT FOR ALL THREE ---------------- */
      // Show text for all pentagons
      tl.to(
        ".pentagon-text",
        {
          opacity: 1,
          duration: 1,
          stagger: 0.2,
        },
        "-=0.5",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-x-hidden min-h-screen bg-[#FBF3EA]"
    >
      {/* ETHOS */}
      <section className="flex items-center justify-center">
        <div
          ref={ethosRef}
          className="font-extrabold text-center text-white leading-none"
          style={{
            background:
              "radial-gradient(50% 322.41% at 50% 50%, #FF0404 0%, #990202 92.31%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          ETHOS
        </div>
      </section>

      {/* PENTAGON SECTION */}
      <section className=" bg-[#FBF3EA] flex items-center justify-center">
        <div className="relative w-full h-[650px] pb-100">
          {/* MOVING PENTAGON (The one that animates through all positions) */}
          <div
            ref={pentagonRef}
            className="absolute w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] lg:w-[400px] lg:h-[400px] flex items-center justify-center"
            style={{
              background: DATA[0].bg,
              clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
            }}
          >
            {/* TEXT FOR MOVING PENTAGON */}
            <div className="relative w-full h-full flex items-center justify-center">
              {DATA.map((item, i) => (
                <div
                  key={i}
                  ref={(el) => {
                    if (el) textRefs.current[i] = el;
                  }}
                  className={`absolute text-center px-6 ${i === 1 ? "rotate-180" : ""}`}
                >
                  <div>
                    <h3 className="text-black font-bold text-lg sm:text-xl mb-3">
                      {item.title}
                    </h3>
                    <p className="text-white text-sm sm:text-base leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* STATIC PENTAGON 1 (Left Position) */}
          <div
            ref={pentagon1Ref}
            className="absolute w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] lg:w-[400px] lg:h-[400px] flex items-center justify-center opacity-0"
            style={{
              background: DATA[0].bg,
              clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
              left: "12%",
              bottom: "0%",
            }}
          >
            {/* TEXT - Not rotated */}
            <div className="pentagon-text absolute text-center px-6 opacity-0">
              <h3 className="text-black font-bold text-lg sm:text-xl mb-3">
                {DATA[0].title}
              </h3>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                {DATA[0].desc}
              </p>
            </div>
          </div>

          {/* STATIC PENTAGON 2 (Center Position - Flipped) */}
          <div
            ref={pentagon2Ref}
            className="absolute w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] lg:w-[400px] lg:h-[400px] flex items-center justify-center opacity-0"
            style={{
              background: DATA[2].bg,
              clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
            }}
          >
            {/* TEXT - Not rotated (only pentagon flips) */}
            <div className="pentagon-text absolute text-center px-6 opacity-0 rotate-180">
              <h3 className="text-black font-bold text-lg sm:text-xl mb-3">
                {DATA[1].title}
              </h3>
              <p className="text-white text-sm sm:text-base leading-relaxed">
                {DATA[1].desc}
              </p>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
