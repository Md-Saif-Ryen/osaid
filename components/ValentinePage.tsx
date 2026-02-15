"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ValentinePage() {
  const petalsRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const petals = petalsRef.current?.children;

    if (petals) {
      Array.from(petals).forEach((petal) => {
        gsap.to(petal, {
          y: "120vh",
          x: "random(-200, 200)",
          rotation: "random(-180, 180)",
          duration: "random(8, 15)",
          repeat: -1,
          ease: "none",
          delay: Math.random() * 5,
        });
      });
    }

    gsap.from(textRef.current, {
      y: 100,
      opacity: 0,
      duration: 1.5,
      ease: "power4.out",
    });
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-pink-200 via-red-200 to-rose-300 flex items-center justify-center">
      {/* Floating Petals */}
      <div ref={petalsRef} className="absolute inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute top-[-10vh] text-red-500 text-2xl opacity-70"
            style={{ left: `${Math.random() * 100}%` }}
          >
            🌸
          </div>
        ))}
      </div>

      {/* Center Content */}
      <div ref={textRef} className="relative z-10 text-center px-6">
        <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg">
          Happy Valentine's Day ❤️
        </h1>
        <p className="mt-6 text-lg md:text-2xl text-white max-w-xl mx-auto">
          You are the reason my world feels magical every single day.
        </p>

        <button className="mt-8 px-8 py-3 bg-white text-pink-600 rounded-full font-semibold shadow-xl hover:scale-105 transition-all duration-300">
          Forever & Always 💕
        </button>
      </div>
    </div>
  );
}
