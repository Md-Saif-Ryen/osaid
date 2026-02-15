"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Lenis from "@studio-freight/lenis";
import FooterSection from "@/components/FooterSection";
import RadialHomeMenu from "@/components/FloatingHomeMenu";

import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SkillsPage() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    ScrollTrigger.refresh(true);
  }, []);

  useEffect(() => {
    setMounted(true);

    // Check screen size
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    // Lenis initialization (only for desktop)
    if (isDesktop) {
      const lenis = new Lenis({
        lerp: 0.08,
        smoothWheel: true,
      });

      const raf = (t: number) => {
        lenis.raf(t);
        requestAnimationFrame(raf);
      };

      requestAnimationFrame(raf);

      return () => {
        lenis.destroy();
        window.removeEventListener("resize", checkScreenSize);
      };
    }

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, [isDesktop]);

  // Dynamically import components based on screen size
  const ActiveComponent = dynamic(
    () =>
      isDesktop ? import("./skillcontent") : import("./SkillContextMobile"),
    {
      ssr: false,
      loading: () => (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#FBF3EA] via-[#BFE6DF] to-[#FBF1A9]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        </div>
      ),
    },
  );

  // Prevent hydration errors
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FBF3EA] via-[#BFE6DF] to-[#FBF1A9] flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <RadialHomeMenu />
      <ActiveComponent />
      <FooterSection />
    </div>
  );
}
