"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function RacesPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const racesRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const races = racesRef.current!;
      const maps = gsap.utils.toArray<SVGSVGElement>(".map");

      // INITIAL STATE
      gsap.set(maps, { opacity: 0, scale: 0.85 });

      maps.forEach((map) => {
        map.querySelectorAll(".outline, .highlight").forEach((p) => {
          const path = p as SVGPathElement;
          const len = path.getTotalLength();
          gsap.set(path, {
            strokeDasharray: len,
            strokeDashoffset: len,
          });
        });
      });

      const getScrollAmount = () => {
        const last = races.querySelector<HTMLHeadingElement>(
          ".race:last-of-type h2"
        )!;
        const padding = window.innerWidth / 2 - last.offsetWidth / 2;
        return -(races.scrollWidth - window.innerWidth) - padding;
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=3500",
          scrub: true,
          pin: true,
        },
      });

      // TEXT SCROLL
      tl.fromTo(
        races,
        { x: window.innerWidth },
        { x: getScrollAmount, duration: 1, ease: "none" }
      );

      // MAP SEQUENCES
      maps.forEach((map, i) => {
        const paths = map.querySelectorAll(".highlight");

        tl.to(maps, { opacity: 0, scale: 0.85, duration: 0.2 }, i);
        tl.to(map, { opacity: 1, scale: 1, duration: 0.3 }, i);
        tl.to(
          paths,
          { strokeDashoffset: 0, duration: 0.7, ease: "power2.out" },
          i
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#15151e] overflow-hidden">
    

      {/* RACE NAMES */}
      <div className="overflow-hidden">
        <div ref={racesRef} className="flex w-fit">
          {["Austria", "Hungary", "Italy", "Great Britain", "Bahrain"].map(
            (race) => (
              <div className="race" key={race}>
                <h2 className="font-['Staatliches'] text-[#e10600] text-[clamp(100px,30vw,30vh)] px-[0.3em] whitespace-nowrap">
                  {race}
                </h2>
              </div>
            )
          )}
        </div>
      </div>

      {/* MAPS */}
      <div className="relative h-[40vh] flex items-center justify-center">
        {/* ================= AUSTRIA ================= */}
        <svg className="map absolute h-full" viewBox="0 0 200 200">
          <rect width="200" height="200" fill="#15151e" />
          <ellipse cx="100" cy="100" rx="78" ry="78" fill="#212238" />
          <g className="track">
            <path
              className="outline"
              d="M52 44C52 44 76 39 94 40C112 41 130 41 140 37C146 34 158 31 165 30C167 30 169 32 168 34L161 51C161 51 121 118 116 119C111 120 99 105 106 92C114 80 132 62 122 55C112 49 85 52 85 60C85 68 95 76 90 86C85 96 65 146 60 147C55 149 34 146 33 139C33 132 45 45 52 44Z"
              stroke="#374d5e"
              strokeWidth="12"
              fill="none"
            />
            <path
              className="highlight"
              d="M43 71C43 71 50 45 52 44C52 44 76 39 94 40C112 41 130 41 140 37C146 34 158 31 165 30C167 30 169 32 168 34L161 51C161 51 121 118 116 119C111 120 99 105 106 92C114 80 132 62 122 55C112 49 85 52 85 60C85 68 95 76 90 86C85 96 65 146 60 147C55 149 34 146 33 139"
              stroke="#e10600"
              strokeWidth="6"
              fill="none"
            />
          </g>
        </svg>

        {/* ================= HUNGARY ================= */}
        <svg className="map absolute h-full" viewBox="0 0 200 200">
          <rect width="200" height="200" fill="#15151e" />
          <ellipse cx="100" cy="100" rx="78" ry="78" fill="#212238" />
          <g className="track">
            <path
              className="outline"
              d="M18 138V56C18 50 23 45 29 45C35 45 40 50 40 56V88C40 93 43 96 48 96C51 96 54 94 55 92L62 77C64 73 68 69 73 68L121 58C127 57 132 56 138 56H144C148 56 151 54 154 51L172 28C174 25 177 24 179 24C185 24 189 29 189 34L185 74C185 77 182 80 179 81C177 81 176 82 175 83L162 100C159 103 159 108 161 112L165 117C168 123 167 130 161 134L146 144"
              stroke="#374d5e"
              strokeWidth="12"
              fill="none"
            />
            <path
              className="highlight"
              d="M18 138V56C18 50 23 45 29 45C35 45 40 50 40 56V88C40 93 43 96 48 96C51 96 54 94 55 92L62 77C64 73 68 69 73 68L121 58C127 57 132 56 138 56H144C148 56 151 54 154 51"
              stroke="#e10600"
              strokeWidth="6"
              fill="none"
            />
          </g>
        </svg>

        {/* ================= ITALY ================= */}
        <svg className="map absolute h-full" viewBox="0 0 200 200">
          <rect width="200" height="200" fill="#15151e" />
          <ellipse cx="100" cy="100" rx="78" ry="78" fill="#212238" />
          <g className="track">
            <path
              className="outline"
              d="M84 137C84 135 82 133 80 133H52C42 133 33 127 31 117L28 107C28 105 26 104 24 104C21 104 19 102 19 100L11 60C10 56 13 52 16 51L29 48C33 47 36 48 38 51C44 62 59 86 68 96"
              stroke="#374d5e"
              strokeWidth="12"
              fill="none"
            />
            <path
              className="highlight"
              d="M84 137C84 135 82 133 80 133H52C42 133 33 127 31 117L28 107C28 105 26 104 24 104"
              stroke="#e10600"
              strokeWidth="6"
              fill="none"
            />
          </g>
        </svg>

        {/* ================= GREAT BRITAIN ================= */}
        <svg className="map absolute h-full" viewBox="0 0 200 200">
          <rect width="200" height="200" fill="#15151e" />
          <ellipse cx="100" cy="100" rx="78" ry="78" fill="#212238" />
          <g className="track">
            <path
              className="outline"
              d="M90 93L92 103C93 107 95 110 98 112L112 120C114 122 115 125 113 127L109 132"
              stroke="#374d5e"
              strokeWidth="12"
              fill="none"
            />
            <path
              className="highlight"
              d="M71 80L39 69C36 68 34 69 32 71L25 80"
              stroke="#e10600"
              strokeWidth="6"
              fill="none"
            />
          </g>
        </svg>

        {/* ================= BAHRAIN ================= */}
        <svg className="map absolute h-full" viewBox="0 0 200 200">
          <rect width="200" height="200" fill="#15151e" />
          <ellipse cx="100" cy="100" rx="78" ry="78" fill="#212238" />
          <g className="track">
            <path
              className="outline"
              d="M137 153H20C18 153 16 150 17 148C20 143 21 137 19 132C16 124 16 115 17 107L30 40"
              stroke="#374d5e"
              strokeWidth="12"
              fill="none"
            />
            <path
              className="highlight"
              d="M104 153H19C17 153 16 150 17 148"
              stroke="#e10600"
              strokeWidth="6"
              fill="none"
            />
          </g>
        </svg>
      </div>

    </section>
  );
}
