"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Lenis from "@studio-freight/lenis";
// import RadialHomeMenu from "@/components/FloatingHomeMenu";

gsap.registerPlugin(ScrollTrigger);

/* ---------------- DATA ---------------- */

const educationData = [
  {
    id: 1,
    institution: "Chandigarh University",
    location: "Mohali, Punjab",
    degree: "Bachelor of Engineering (B.E.)",
    specialization: "Specialization - Biotechnology",
    year: "Year of Completion: 2026",
    image: "/images/industrial 3.png",
  },
  {
    id: 2,
    institution: "Gyan Niketan",
    location: "Patna, Bihar",
    degree: "Senior Secondary Education (Class XII)",
    board: "(CBSE)",
    stream: "Medical Stream",
    year: "Year of Completion: 2021",
    image: "/images/industrial 1.png",
  },
  {
    id: 3,
    institution: "RPS Residential School",
    location: "Patna, Bihar",
    degree: "Senior Secondary Education (Class X)",
    board: "(CBSE)",
    year: "Year of Completion: 2019",
    image: "/images/industrial 2.png",
  },
];

/* ---------------- COMPONENT ---------------- */

export default function EducationTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subHeadingRef = useRef<HTMLParagraphElement>(null);
  const sectionRefs = useRef<HTMLDivElement[]>([]);
  const isSplit = useRef(false);

  /* ---------------- LENIS ---------------- */

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    ScrollTrigger.refresh(true);

    return () => lenis.destroy();
  }, []);

  /* ---------------- SPLIT TITLE / SUBTITLE ---------------- */

  useLayoutEffect(() => {
    if (isSplit.current || !headingRef.current || !subHeadingRef.current)
      return;

    splitTextWithWords(headingRef.current, "char-heading");
    splitTextWithWords(subHeadingRef.current, "char-subheading");
    isSplit.current = true;
  }, []);

  /* ---------------- TITLE PIN + ANIMATION ---------------- */

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const headingChars = gsap.utils.toArray<HTMLElement>(".char-heading");
      const subHeadingChars =
        gsap.utils.toArray<HTMLElement>(".char-subheading");

      gsap.set(headingChars, { y: 200, opacity: 0, rotationX: -45 });
      gsap.set(subHeadingChars, { y: 120, opacity: 0 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=1200",
            scrub: 1,
            pin: true,
          },
        })
        .to(headingChars, {
          y: 0,
          opacity: 1,
          rotationX: 0,
          stagger: { each: 0.05, from: "random" },
          ease: "power3.out",
        })
        .to(
          subHeadingChars,
          {
            y: 0,
            opacity: 1,
            stagger: { each: 0.04, from: "random" },
            ease: "power3.out",
          },
          "-=0.4",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ---------------- EDUCATION CARDS (FIXED) ---------------- */

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    const initAnimations = () => {
      sectionRefs.current.forEach((section) => {
        if (!section) return;

        const image = section.querySelector(".edu-image");
        const words = section.querySelectorAll(".edu-word");

        // FAIL-SAFE (important)
        gsap.set(words, { opacity: 1, x: 0 });

        if (!image || !words.length) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            end: "top 30%",
            toggleActions: "play none none reverse",
          },
        });

        tl.from(image, {
          x: -120,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        }).from(
          words,
          {
            x: 120,
            opacity: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.5",
        );

        triggers.push(tl.scrollTrigger!);
      });

      ScrollTrigger.refresh(true);
    };

    const timeout = setTimeout(initAnimations, 200);

    return () => {
      clearTimeout(timeout);
      triggers.forEach((t) => t.kill());
    };
  }, []);

  /* ---------------- JSX ---------------- */

  return (
    <div className="relative bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-800">
      {/* TITLE SECTION */}
      <section
        ref={sectionRef}
        className="h-[85vh] flex items-center justify-center text-white"
      >
        <div className="text-center px-4">
          <h2 ref={headingRef} className="text-5xl md:text-7xl font-bold mb-4">
            Education
          </h2>

          <p
            ref={subHeadingRef}
            className="text-lg md:text-2xl text-gray-400 max-w-2xl mx-auto"
          >
            My academic background and qualifications
          </p>
        </div>
      </section>

      {/* EDUCATION LIST */}
      <section className="bg-white text-black py-16 md:py-24">
        {educationData.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => {
              if (el) sectionRefs.current[index] = el;
            }}
            className="flex items-center justify-center px-4 sm:px-8"
          >
            <div className="w-full max-w-6xl bg-white rounded-3xl p-6 sm:p-8 md:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                {/* IMAGE */}
                <div className="edu-image flex justify-center lg:justify-start">
                  <Image
                    src={item.image}
                    alt={item.institution}
                    width={460}
                    height={340}
                    sizes="(max-width: 768px) 90vw, 420px"
                    className="rounded-2xl object-cover w-full max-w-[420px] shadow-md"
                  />
                </div>

                {/* CONTENT */}
                <div className="space-y-4 text-center lg:text-left">
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {renderWords(item.institution)}
                  </h3>

                  <p className="text-sm sm:text-base text-gray-600">
                    {renderWords(item.location)}
                  </p>

                  <p className="text-base sm:text-lg font-medium text-gray-800">
                    {renderWords(item.degree)}
                  </p>

                  {item.specialization && (
                    <p className="text-gray-700">
                      {renderWords(item.specialization)}
                    </p>
                  )}

                  {item.stream && (
                    <p className="text-gray-700">{renderWords(item.stream)}</p>
                  )}

                  {item.board && (
                    <p className="text-gray-700">{renderWords(item.board)}</p>
                  )}

                  <div className="pt-4">
                    <span className="inline-block px-4 py-1.5 rounded-full text-sm bg-gray-100 text-gray-700 font-medium">
                      {renderWords(item.year)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* GLOBAL STYLES */}
      <style jsx global>{`
        .char-heading,
        .char-subheading {
          display: inline-block;
          will-change: transform, opacity;
        }
        .edu-word {
          display: inline-block;
          margin-right: 0.35em;
          will-change: transform, opacity;
        }
      `}</style>
    </div>
  );

  /* ---------------- HELPERS ---------------- */

  function renderWords(text: string) {
    return (
      <span className="block">
        {text.split(" ").map((word, i) => (
          <span key={i} className="edu-word inline-block mr-1">
            {word}
          </span>
        ))}
      </span>
    );
  }

  function splitTextWithWords(element: HTMLElement, charClass: string) {
    const words = element.innerText.split(" ");

    element.innerHTML = words
      .map((word) => {
        const chars = word
          .split("")
          .map((c) => `<span class="char ${charClass}">${c}</span>`)
          .join("");
        return `<span class="word">${chars}</span>`;
      })
      .join(`<span class="space">&nbsp;</span>`);
  }
}
