// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { motion, useInView } from "framer-motion";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { ArrowRightIcon } from "@heroicons/react/24/outline";
// import { encryptIndex } from "@/utils/crypto";

// gsap.registerPlugin(ScrollTrigger);

// /* ================= EXPERIENCE DATA ================= */

// export const experienceData = [
//   {
//     id: 1,
//     role: "Summer Intern",
//     duration: "May 2025 – Jul 2025",
//     location: "Solan, Himachal Pradesh, India",
//     image: "/images/exp/khusru.png",
//     slug: "summer-intern",
//     description:
//       "Developed responsive web applications using React and Next.js with modern UI/UX principles.",
//     tags: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
//   },
//   {
//     id: 2,
//     role: "Research Intern",
//     duration: "May 2024 – Jul 2024",
//     location: "Jamshedpur, Jharkhand, India",
//     image: "/images/exp/tata.png",
//     slug: "research-intern",
//     description:
//       "Conducted research on machine learning algorithms and AI models for predictive analytics.",
//     tags: ["Python", "TensorFlow", "Machine Learning"],
//   },
//   {
//     id: 3,
//     role: "Student Partner",
//     duration: "Mar 2024 – May 2024",
//     location: "Chandigarh, India",
//     image: "/images/exp/intershala.png",
//     slug: "student-partner",
//     description:
//       "Organized tech workshops and coding events for 500+ students across campuses.",
//     tags: ["Leadership", "Community", "Events"],
//   },
//   {
//     id: 4,
//     role: "Internship Trainee",
//     duration: "Dec 2023 – Jan 2024",
//     location: "Patna, Bihar, India",
//     image: "/images/exp/sudha-dairy.png",
//     slug: "internship-trainee",
//     description:
//       "Assisted in developing full-stack applications in a collaborative team environment.",
//     tags: ["JavaScript", "Node.js", "MongoDB"],
//   },
//   {
//     id: 5,
//     role: "Project Intern",
//     duration: "Aug 2023 – Sep 2023",
//     location: "Chandigarh, India",
//     image: "/images/exp/academor.png",
//     slug: "ui-ux-intern",
//     description:
//       "Designed user interfaces for mobile and web applications with focus on user experience",
//     tags: ["Figma", "UI Design", "Wireframing", "Prototyping"],
//   },
//   {
//     id: 6,
//     role: "Fundraising Assistant",
//     duration: "Jun 2023 – Jun 2023",
//     location: "Patna, Bihar, India",
//     image: "/images/exp/musk.png",
//     slug: "fundraising-assistant",
//     description:
//       "Built REST APIs and database architectures for enterprise-level applications",
//     tags: ["Java", "Spring Boot", "PostgreSQL", "AWS"],
//   },
// ];

// /* ================= COMPONENT ================= */
// export default function ExperienceTimeline() {
//   const router = useRouter();
//   const containerRef = useRef<HTMLDivElement>(null);
//   const timelineRef = useRef<HTMLDivElement>(null);
//   const lineRef = useRef<HTMLDivElement>(null);
//   const [scrollProgress, setScrollProgress] = useState(0);

//   const isInView = useInView(containerRef, { once: true, amount: 0.2 });

//   /* ================= GSAP ANIMATION (OPTIMIZED) ================= */

//   useEffect(() => {
//     const cards = gsap.utils.toArray(".timeline-card");

//     cards.forEach((card: any) => {
//       gsap.fromTo(
//         card,
//         { opacity: 0, y: 30 },
//         {
//           opacity: 1,
//           y: 0,
//           duration: window.innerWidth < 768 ? 0.5 : 0.8,
//           ease: "power2.out",
//           scrollTrigger: {
//             trigger: card,
//             start: "top 85%",
//           },
//         },
//       );
//     });

//     if (timelineRef.current && lineRef.current && window.innerWidth >= 1024) {
//       ScrollTrigger.create({
//         trigger: timelineRef.current,
//         start: "top 30%",
//         end: "bottom bottom",
//         scrub: true,
//         onUpdate: (self) => {
//           setScrollProgress(self.progress);
//           gsap.to(lineRef.current, {
//             height: `${self.progress * 100}%`,
//             ease: "none",
//             duration: 0.1,
//           });
//         },
//       });
//     }

//     return () => {
//       ScrollTrigger.getAll().forEach((t) => t.kill());
//     };
//   }, []);

//   /* ================= UI ================= */

//   return (
//     <section
//       ref={containerRef}
//       className="min-h-screen bg-gradient-to-b from-[#FBF3EA] via-white to-[#E8F4F1]"
//     >
//       <div className="container mx-auto px-4 py-14 md:py-24">
//         {/* HEADER */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.5 }}
//           className="text-center mb-10 md:mb-20 px-2"
//         >
//           <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 mb-3">
//             Experience <span className="text-red-600">Timeline</span>
//           </h1>
//           <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto">
//             A chronological overview of my professional journey and growth.
//           </p>
//         </motion.div>

//         {/* TIMELINE */}
//         <div ref={timelineRef} className="relative">
//           {/* DESKTOP CENTER LINE */}
//           <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2">
//             <div className="absolute inset-0 bg-gray-300 rounded-full" />
//             <div
//               ref={lineRef}
//               className="absolute top-0 left-0 w-full bg-gradient-to-b from-red-600 to-red-400 rounded-full origin-top"
//               style={{ height: `${scrollProgress * 100}%` }}
//             />
//           </div>

//           {/* CARDS */}
//           <div className="flex flex-col gap-8 md:gap-12 lg:gap-16">
//             {experienceData.map((item, index) => {
//               const isLeft = index % 2 === 0;

//               return (
//                 <div
//                   key={item.id}
//                   className={`timeline-card flex ${
//                     isLeft ? "lg:justify-start" : "lg:justify-end"
//                   }`}
//                 >
//                   <motion.div
//                     onClick={() =>
//                       router.push(
//                         `/experience/${item.slug}?id=${encryptIndex(item.id)}`,
//                       )
//                     }
//                     whileHover={{ y: window.innerWidth >= 1024 ? -4 : 0 }}
//                     className="w-full max-w-4xl lg:w-[calc(50%-60px)]
//                       bg-white rounded-2xl shadow-md hover:shadow-xl
//                       transition-transform duration-300 overflow-hidden cursor-pointer
//                       will-change-transform"
//                   >
//                     {/* CARD CONTENT */}
//                     <div className="flex flex-col md:flex-row">
//                       {/* IMAGE (2 PARTS) */}
//                       <div className="relative flex-[2] h-52 md:h-auto">
//                         <Image
//                           src={item.image}
//                           alt={item.role}
//                           fill
//                           sizes="(max-width: 768px) 70vw, 20vw"
//                           className="object-contain"
//                         />
//                       </div>

//                       {/* DATA (3 PARTS) */}
//                       <div className="flex-[3] p-6 md:p-8 flex flex-col justify-center">
//                         <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
//                           {item.role}
//                         </h3>

//                         <p className="text-gray-600 leading-relaxed mb-4">
//                           {item.description}
//                         </p>

//                         <div className="flex flex-wrap gap-2 mb-6">
//                           {item.tags.map((tag, i) => (
//                             <span
//                               key={i}
//                               className="px-3 py-1 text-sm rounded-lg bg-red-50 text-red-700 font-medium"
//                             >
//                               {tag}
//                             </span>
//                           ))}
//                         </div>

//                         <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//                           <span className="text-sm text-gray-500">
//                             {item.duration}
//                           </span>
//                           <span className="inline-flex items-center gap-2 text-sm font-semibold text-red-600">
//                             View Details <ArrowRightIcon className="w-4 h-4" />
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </motion.div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { encryptIndex } from "@/utils/crypto";
import RadialHomeMenu from "@/components/FloatingHomeMenu";

gsap.registerPlugin(ScrollTrigger);

/* ================= EXPERIENCE DATA ================= */

export const experienceData = [
  {
    id: 1,
    role: "Summer Intern",
    duration: "May 2025 – Jul 2025",
    location: "Solan, Himachal Pradesh, India",
    image: "/images/exp/khusru.png",
    slug: "summer-intern",
    description:
      "Developed responsive web applications using React and Next.js with modern UI/UX principles.",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    id: 2,
    role: "Research Intern",
    duration: "May 2024 – Jul 2024",
    location: "Jamshedpur, Jharkhand, India",
    image: "/images/exp/tata.png",
    slug: "research-intern",
    description:
      "Conducted research on machine learning algorithms and AI models for predictive analytics.",
    tags: ["Python", "TensorFlow", "Machine Learning"],
  },
  {
    id: 3,
    role: "Student Partner",
    duration: "Mar 2024 – May 2024",
    location: "Chandigarh, India",
    image: "/images/exp/intershala.png",
    slug: "student-partner",
    description:
      "Organized tech workshops and coding events for 500+ students across campuses.",
    tags: ["Leadership", "Community", "Events"],
  },
  {
    id: 4,
    role: "Internship Trainee",
    duration: "Dec 2023 – Jan 2024",
    location: "Patna, Bihar, India",
    image: "/images/exp/sudha-dairy.png",
    slug: "internship-trainee",
    description:
      "Assisted in developing full-stack applications in a collaborative team environment.",
    tags: ["JavaScript", "Node.js", "MongoDB"],
  },
  {
    id: 5,
    role: "Project Intern",
    duration: "Aug 2023 – Sep 2023",
    location: "Chandigarh, India",
    image: "/images/exp/academor.png",
    slug: "ui-ux-intern",
    description:
      "Designed user interfaces for mobile and web applications with focus on user experience",
    tags: ["Figma", "UI Design", "Wireframing", "Prototyping"],
  },
  {
    id: 6,
    role: "Fundraising Assistant",
    duration: "Jun 2023 – Jun 2023",
    location: "Patna, Bihar, India",
    image: "/images/exp/musk.png",
    slug: "fundraising-assistant",
    description:
      "Built REST APIs and database architectures for enterprise-level applications",
    tags: ["Java", "Spring Boot", "PostgreSQL", "AWS"],
  },
];

/* ================= COMPONENT ================= */

export default function ExperienceTimeline() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  useEffect(() => {
  window.scrollTo(0, 0);
  ScrollTrigger.refresh(true);
}, []);


  /* ================= GSAP ANIMATIONS ================= */

  useEffect(() => {
    /* CARD REVEAL */
    const cards = gsap.utils.toArray(".timeline-card");

    cards.forEach((card: any) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: window.innerWidth < 768 ? 0.5 : 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        },
      );
    });

    /* CENTER LINE FILL */
    if (timelineRef.current && lineRef.current && window.innerWidth >= 1024) {
      ScrollTrigger.create({
        trigger: timelineRef.current,
        start: "top 30%",
        end: "bottom bottom",
        scrub: 2.4,
        markers: true,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
          gsap.to(lineRef.current, {
            height: `${self.progress * 100}%`,
            ease: "none",
            duration: 0.1,
          });
        },
      });
    }

    /* 🔥 DIRECTIONAL ARROWS */
    const arrows = gsap.utils.toArray(".reveal-arrow");

    arrows.forEach((arrow: any) => {
      const direction = arrow.dataset.direction;

      gsap.fromTo(
        arrow,
        {
          opacity: 0,
          x: direction === "right" ? -20 : 20,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: arrow.closest(".timeline-card"),
            start: "top 80%",
            end: "top 60%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });

    /* 🔥 TITLE PARALLAX */
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { y: 0 },
        {
          y: -70,
          ease: "none",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2.4,
          },
        },
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  /* ================= UI ================= */

  return (
    <>
    <RadialHomeMenu />
      <section
        ref={containerRef}
        className="min-h-screen bg-gradient-to-b from-[#FBF3EA] via-white to-[#E8F4F1]"
      >
        <div className="container mx-auto px-4 py-14 md:py-24">
          {/* HEADER */}
          <motion.div
            ref={titleRef}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center pb-10 md:mb-20 px-2"
          >
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold text-gray-900 mb-3">
              Expe<span className="text-red-600">ri</span>
              <span className="text-black">ence</span>
            </h1>

            <p className="text-gray-600 text-sm sm:text-base max-w-xl">
              A chronological overview of my professional journey and growth.
            </p>
          </motion.div>

          {/* TIMELINE */}
          <div ref={timelineRef} className="relative">
            {/* CENTER LINE */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2">
              <div className="absolute inset-0 bg-gray-300 rounded-full" />
              <div
                ref={lineRef}
                className="absolute top-0 left-0 w-full bg-gradient-to-b from-red-600 to-red-400 rounded-full origin-top"
                style={{ height: `${scrollProgress * 100}%` }}
              />
            </div>

            {/* CARDS */}
            <div className="flex flex-col gap-10 md:gap-14 lg:gap-20">
              {experienceData.map((item, index) => {
                const isLeft = index % 2 === 0;

                return (
                  <div
                    key={item.id}
                    className={`timeline-card relative flex ${
                      isLeft ? "lg:justify-start" : "lg:justify-end"
                    }`}
                  >
                    {/* 🔥 DIRECTION ARROW */}
                    <div
                      className={`reveal-arrow hidden lg:block absolute top-1/2 ${
                        !isLeft ? "left-1/2 ml-10" : "right-1/2 mr-10"
                      } -translate-y-1/2 opacity-0`}
                      data-direction={!isLeft ? "right" : "left"}
                    >
                      <ArrowRightIcon
                        className={`w-6 h-6 text-red-600 ${
                          isLeft ? "rotate-180" : ""
                        }`}
                      />
                    </div>

                    {/* CARD */}
                    <motion.div
                      onClick={() =>
                        router.push(
                          `/experience/${item.slug}?id=${encryptIndex(item.id)}`,
                        )
                      }
                      whileHover={{
                        y: window.innerWidth >= 1024 ? -6 : 0,
                      }}
                      className="
            group w-full max-w-4xl lg:w-[calc(50%-70px)]
            bg-white/90 backdrop-blur
            rounded-3xl border border-gray-100
            shadow-[0_10px_30px_rgba(0,0,0,0.08)]
            hover:shadow-[0_20px_45px_rgba(0,0,0,0.12)]
            transition-all duration-300
            overflow-hidden cursor-pointer
          "
                    >
                      <div className="flex flex-col md:flex-row">
                        {/* IMAGE SECTION */}
                        <div className="relative md:w-[38%] h-56 md:h-auto bg-gradient-to-br from-red-50 to-white flex items-center justify-center">
                          <Image
                            src={item.image}
                            alt={item.role}
                            fill
                            className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
                          />

                          {/* MOBILE BADGE */}
                          <span className="absolute top-4 left-4 md:hidden px-3 py-1 text-xs font-semibold bg-red-600 text-white rounded-full">
                            Experience
                          </span>
                        </div>

                        {/* CONTENT */}
                        <div className="flex-1 p-6 sm:p-7 md:p-8 flex flex-col">
                          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                            {item.role}
                          </h3>

                          <span className="text-sm text-gray-500 mb-3">
                            {item.location}
                          </span>

                          <p className="text-gray-600 leading-relaxed mb-5">
                            {item.description}
                          </p>

                          {/* TAGS */}
                          <div className="flex flex-wrap gap-2 mb-6">
                            {item.tags.map((tag, i) => (
                              <span
                                key={i}
                                className="
                      px-3 py-1 text-xs sm:text-sm
                      rounded-full
                      bg-red-50 text-red-700
                      font-medium
                    "
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* FOOTER */}
                          <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                            <span className="text-sm text-gray-500">
                              {item.duration}
                            </span>

                            <span className="inline-flex items-center gap-2 text-sm font-semibold text-red-600 group-hover:gap-3 transition-all">
                              View Details
                              <ArrowRightIcon className="w-4 h-4" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
