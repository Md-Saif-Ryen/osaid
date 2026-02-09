"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function MyAchievement() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const collageRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const mm = gsap.matchMedia();

  /* ================= DESKTOP ONLY ================= */
  mm.add("(min-width: 1024px)", () => {
    const lenis = new Lenis({
      smoothWheel: true,
      lerp: 0.08,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=280%",
        scrub: 2.5,
        pin: true,
        anticipatePin: 1,
      },
    });

   
    // BIG → SMALL TITLE
    tl.fromTo(
      titleRef.current,
      {
        fontSize: "15vw",
        lineHeight: "1",
        color: "#690000",
        y: 40,
      },
      {
        fontSize: "55px",
        lineHeight: "1.2",
        color: "#fff",
        ease: "power3.inOut",
        duration: 2,
        y: 0,
      },
    );

    // SUBTITLE
    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power3.out",
      }
    );

    // COLLAGE
    tl.fromTo(
      collageRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
      }
    );

    return () => {
      tl.kill();
      lenis.destroy();
    };
  });

  /* ================= MOBILE ONLY ================= */
  mm.add("(max-width: 1023px)", () => {
    // 🔥 reset desktop styles
    gsap.set([titleRef.current, subtitleRef.current, collageRef.current], {
      clearProps: "all",
    });

    // TITLE
    gsap.from(titleRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
    });

    // SUBTITLE
    gsap.from(subtitleRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: subtitleRef.current,
        start: "top 85%",
      },
    });

    // COLLAGE
    gsap.from(collageRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
      scrollTrigger: {
        trigger: collageRef.current,
        start: "top 85%",
      },
    });
  });

  return () => {
    mm.revert();
    ScrollTrigger.getAll().forEach((t) => t.kill());
  };
}, []);


  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-black text-white flex justify-center overflow-hidden"
    >
      <div className="w-full px-6 text-center">
        {/* TITLE */}
        <h1 ref={titleRef} className="font-bold tracking-tight leading-none">
          Achievement
        </h1>

        {/* SUBTITLE */}
        <p
          ref={subtitleRef}
          className="mt-6 mb-10 text-md md:text-lg opacity-0 font-mono text-gray-400"
        >
          Delivering excellence through innovation & precision
        </p>

        {/* COLLAGE */}
        <div
          ref={collageRef}
          className="mt-10 grid grid-cols-12 gap-4"
        >
          {collageData.map((item) => (
            <div
              key={item.id}
              className={`${item.colSpan} ${item.height} relative rounded-xl overflow-hidden group`}
            >
              {/* Image */}
              <Image
                src={item.image}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-500 flex items-end">
                <div className="p-4 md:p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150">
                    {item.title}
                  </h3>
                  <p className="text-gray-200 text-xs md:text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export const collageData = [
  {
    id: 1,
    image: "/images/industrial 1.png",
    alt: "Industrial Automation Project",
    title: "Industrial Automation",
    description: "Automated assembly line with 300% efficiency improvement",

    // layout control
    colSpan: "col-span-12 lg:col-span-6",
    height: "h-[280px] md:h-[320px]",
    visible: "block", // always visible
  },
  {
    id: 2,
    image: "/images/industrial 2.png",
    alt: "Precision Engineering",
    title: "Precision Engineering",
    description: "High-tolerance components manufacturing",

    colSpan: "col-span-6 sm:col-span-4 lg:col-span-3",
    height: "h-[180px] md:h-[200px]",
    visible: "block",
  },
  {
    id: 3,
    image: "/images/industrial 3.png",
    alt: "Smart Factory Solution",
    title: "Smart Factory",
    description: "IoT-enabled factory with real-time monitoring",

    colSpan: "col-span-6 sm:col-span-4 lg:col-span-3",
    height: "h-[220px] md:h-[260px]",
    visible: "block",
  },
  {
    id: 4,
    image: "/images/industrial 4.png",
    alt: "Quality Control System",
    title: "Quality Control",
    description: "AI-powered inspection system",

    colSpan: "hidden sm:block sm:col-span-4 lg:col-span-3",
    height: "h-[200px] md:h-[240px]",
    visible: "sm",
  },
  {
    id: 5,
    image: "/images/industrial 5.png",
    alt: "Sustainable Manufacturing",
    title: "Sustainable Tech",
    description: "Eco-friendly production processes",

    colSpan: "hidden lg:block lg:col-span-3",
    height: "h-[180px] md:h-[200px]",
    visible: "lg",
  },
];
