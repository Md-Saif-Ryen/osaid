"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";

const aboutMeData = [
  "S M Osaid Rizvi",
  "Biotechnology Engineer",
  "UI/UX Designer",
  "Clinical Diagnostics",
];

export default function AboutMe() {
  const [index, setIndex] = useState(1);
  const roleRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Cuboid Rotation Animation
  useEffect(() => {
    const interval = setInterval(() => {
      if (roleRef.current) {
        gsap.fromTo(
          roleRef.current,
          {
            rotateX: -90,
            opacity: 0,
            transformOrigin: "bottom center",
          },
          {
            rotateX: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
          },
        );
      }

      setIndex((prev) => (prev + 1) % aboutMeData.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // Smooth Section Entrance Animation
  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current.children,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
        },
      );
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-50 bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white px-6 lg:px-20 py-20 overflow-hidden"
    >
      {/* LEFT SIDE */}
      <div className="max-w-2xl text-center lg:text-left space-y-6">
        <h3 className="text-sm py-10 tracking-widest text-white">
          Hello, Welcome{" "}
        </h3>
        <div className="flex items-center gap-4 flex-wrap justify-center lg:justify-start">
          <h1 className="text-5xl md:text-5xl font-bold">I'm</h1>

          {/* Cuboid Animated Role */}
          <div
            ref={roleRef}
            className="text-4xl md:text-5xl font-bold text-red-500 perspective-1000"
          >
            {aboutMeData[index]}
          </div>
        </div>

        {/* Updated Premium Paragraph */}
        <p className="text-gray-400 leading-relaxed text-[15px] pt-4 pb-10">
          I am a Biotechnology Engineering student passionate about merging
          scientific research with digital innovation. My experience spans
          clinical diagnostics, QA/QC systems, nanotechnology, and healthcare
          analytics — where precision and real-world impact go hand in hand.
          <br />
          <br />
          Beyond the lab, I explore UI/UX design and data visualization to
          transform complex healthcare information into intuitive, meaningful,
          and user-centered digital experiences.
        </p>

        {/* Contact Button */}
        <button
          onClick={() => router.push("/contact")}
          className="mt-6 px-8 py-3 bg-red-600 hover:bg-red-700 transition-all duration-300 rounded-2xl font-semibold text-lg shadow-lg hover:scale-105"
        >
          Contact Me
        </button>
      </div>

      {/* RIGHT SIDE IMAGE */}
      <div className="relative group">
        {/* Glow Background */}
        <div className="absolute inset-0 bg-red-700 blur-3xl opacity-20 rounded-2xl scale-110 group-hover:scale-125 transition-all duration-700"></div>

        <Image
          src="/images/osaid_morphed.png"
          alt="Profile Picture"
          width={380}
          height={380}
          className="relative rounded-full object-cover border-4 border-red-500 shadow-2xl transition-all duration-700 group-hover:scale-105"
        />
      </div>
    </section>
  );
}
