"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import CardFlip from "@/app/educational/cardFlip";
import EducationTimeline from "./EducationTimeline";
import FooterSection from "@/components/FooterSection";
import RacesSection from "@/components/raceSection";
import RadialHomeMenu from "@/components/FloatingHomeMenu";

import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function EducationalPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    ScrollTrigger.refresh(true);
  }, []);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      // direction: "vertical",
      // gestureDirection: "vertical",
      // smooth: true,
      // smoothTouch: false,
      touchMultiplier: 2,
    });

    // Animation frame loop
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Cleanup on component unmount
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-black">
      <RadialHomeMenu />
      <EducationTimeline />
      <CardFlip />
      <FooterSection />
    </div>
  );
}
