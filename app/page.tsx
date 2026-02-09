"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TornHero from "@/components/TornHero";
import HomePage from "@/app/home";
import FooterSection from "@/components/FooterSection";
// import AboutMe from "@/components/AboutMe";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
    ScrollTrigger.refresh(true);
  }, []);

  // useEffect(() => {
  //   // Animation for the subsequent sections (Skills, etc.)
  //   const sections = gsap.utils.toArray<HTMLElement>(".extra-section");
  //   sections.forEach((section) => {
  //     gsap.from(section.querySelectorAll(".animate-up"), {
  //       y: 50,
  //       opacity: 0,
  //       duration: 1,
  //       stagger: 0.2,
  //       scrollTrigger: {
  //         trigger: section,
  //         start: "top 80%",
  //       },
  //     });
  //   });

  //   return () => {
  //     ScrollTrigger.getAll().forEach((t) => t.kill());
  //   };
  // }, []);

  return (
    <main className="relative bg-white">
      {/* <TornHero /> */}
      <HomePage />
      <FooterSection />
      {/* <AboutMe /> */}

      {/* Other Sections */}
      {/* {[
        { id: "skills", title: "Skills & Expertise", bg: "bg-white" },
        { id: "projects", title: "Projects", bg: "bg-gray-50" },
      ].map((section) => (
        <section
          key={section.id}
          id={section.id}
          className={`extra-section min-h-screen flex items-center justify-center ${section.bg} p-6`}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="animate-up text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {section.title}
            </h2>
            <p className="animate-up text-lg text-gray-600">
              Exploring the boundaries of Biotech and UI/UX.
            </p>
          </div>
        </section>
      ))} */}
    </main>
  );
}
