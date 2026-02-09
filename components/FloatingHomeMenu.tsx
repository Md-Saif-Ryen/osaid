// "use client";

// import { useEffect, useRef, useState } from "react";
// import gsap from "gsap";
// import { Home } from "lucide-react";
// import { useRouter } from "next/navigation";

// export default function RadialHomeMenu() {
//   const containerRef = useRef<HTMLDivElement | null>(null);
//   const lastScroll = useRef(0);
//   const router = useRouter();

//   /* ---------------- CLICK ---------------- */
//  const toggleMenu = () => {
//    if (!containerRef.current) {
    
//     router.push("/");
//      return;
//    }

//    // 🔥 RESET POSITION BEFORE NAVIGATION
//    gsap.to(containerRef.current, {
//      x: 0,
//      opacity: 1,
//      duration: 0.2,
//      ease: "power2.out",
//      onComplete: () => {
//        router.push("/");
//      },
//    });
//  };

//   /* ---------------- SCROLL HIDE / SHOW ---------------- */
//   useEffect(() => {
//     const onScroll = () => {
//       if (!containerRef.current) return;

//       const current = window.scrollY;

//       gsap.to(containerRef.current, {
//         x: current > lastScroll.current ? 80 : 0,
//         opacity: current > lastScroll.current ? 0 : 1,
//         duration: 0.2,
//         ease: "power2.out",
//       });

//       lastScroll.current = current;
//     };

//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   return (
//     <div
//       ref={containerRef}
//       className="
//         fixed z-50 right-0
//         top-1/2 
//       "
//     >
//       {/* HOME BUTTON */}
//       <button
//         onClick={toggleMenu}
//         className="
//           w-14 h-16 sm:w-16 sm:h-16

//           bg-black/50 backdrop-blur-xl
//           border border-white/20

//           text-white flex items-center justify-center

//           /* SHAPE */
//           rounded-tl-2xl rounded-bl-2xl
//           rounded-tr-none rounded-br-none

//           /* SHADOW ONLY LEFT */
//           shadow-[-8px_0_25px_rgba(0,0,0,0.45)]

//           hover:scale-105
//           transition-all duration-300
//         "
//       >
//         <Home size={22} />
//       </button>
//     </div>
//   );
// }



"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Home } from "lucide-react";
import { useRouter } from "next/navigation";

interface RadialHomeMenuProps {
  /** pass true when mobile menu / dialog is open */
  menuOpen?: boolean;
}

export default function RadialHomeMenu({
  menuOpen = false,
}: RadialHomeMenuProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lastScroll = useRef(0);
  const router = useRouter();

  /* ---------------- CLICK ---------------- */
  const handleClick = () => {
    if (!containerRef.current) {
      router.push("/");
      return;
    }

    gsap.to(containerRef.current, {
      scale: 0.95,
      duration: 0.15,
      ease: "power2.out",
      onComplete: () => router.push("/"),
    });
  };

  /* ---------------- SCROLL BEHAVIOR ---------------- */
  useEffect(() => {
    const onScroll = () => {
      if (!containerRef.current) return;

      const current = window.scrollY;
      const isMobile = window.innerWidth < 768;

      const scrollingDown = current > lastScroll.current;

      gsap.to(containerRef.current, {
        x: scrollingDown ? (isMobile ? 40 : 80) : 0,
        opacity: scrollingDown ? (isMobile ? 0.4 : 0) : 1,
        duration: 0.25,
        ease: "power2.out",
      });

      lastScroll.current = current;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---------------- AUTO HIDE WHEN MENU OPEN ---------------- */
  useEffect(() => {
    if (!containerRef.current) return;

    gsap.to(containerRef.current, {
      x: menuOpen ? 120 : 0,
      opacity: menuOpen ? 0 : 1,
      duration: 0.25,
      ease: "power2.out",
      pointerEvents: menuOpen ? "none" : "auto",
    });
  }, [menuOpen]);

  return (
    <div
      ref={containerRef}
      className="
        fixed z-[9999]

        /* Mobile position */
        right-0 bottom-24

        /* Desktop position */
        md:right-0 md:top-1/2 md:bottom-auto
      "
    >
      {/* HOME BUTTON */}
      <button
        onClick={handleClick}
        aria-label="Go to home"
        className="
          flex items-center justify-center gap-2
          text-white
 cursor-pointer
          /* SIZE */
          w-14 h-14
          sm:w-16 sm:h-16

          /* HALF PILL (mobile) */
          rounded-full
          md:rounded-tl-2xl md:rounded-bl-2xl
          md:rounded-tr-none md:rounded-br-none

          /* BACKGROUND */
          bg-black/60 backdrop-blur-xl
          border border-white/20

          /* SHADOW */
          shadow-[-8px_0_25px_rgba(0,0,0,0.45)]

          transition-all duration-300
          hover:scale-105
          active:scale-95
        "
      >
        <Home size={22} />

        {/* Desktop label (optional) */}
        <span className="hidden md:inline text-sm font-medium pr-2">Home</span>
      </button>
    </div>
  );
}
