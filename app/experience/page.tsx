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
//           duration: screenWidth  < 768 ? 0.5 : 0.8,
//           ease: "power2.out",
//           scrollTrigger: {
//             trigger: card,
//             start: "top 85%",
//           },
//         },
//       );
//     });

//     if (timelineRef.current && lineRef.current && screenWidth  >= 1024) {
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
//                     whileHover={{ y: screenWidth  >= 1024 ? -4 : 0 }}
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

import { Metadata } from "next";
import ExperienceTimeline from "./ExperiencePage";

export const metadata: Metadata = {
  title: "Professional Experience | S M Osaid Rizvi",
  description:
    "Explore the professional journey of S M Osaid Rizvi including internships, research roles, technical development, leadership experiences, and industry collaborations.",
  keywords: [
    "Professional Experience",
    "Research Intern",
    "Summer Internship",
    "Technical Experience",
    "Leadership Experience",
    "Machine Learning Internship",
    "Web Development Internship",
  ],
  metadataBase: new URL("https://yourdomain.com"), // replace with real domain
  openGraph: {
    title: "Professional Experience | S M Osaid Rizvi",
    description:
      "A detailed timeline of internships, research roles, and technical growth.",
    url: "https://yourdomain.com/experience",
    siteName: "Osaid Rizvi Portfolio",
    type: "website",
    images: [
      {
        url: "/images/exp/khusru.png",
        width: 1200,
        height: 630,
        alt: "Professional Experience Timeline",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Experience | S M Osaid Rizvi",
    description: "Timeline of internships, research, and technical growth.",
    images: ["/images/exp/khusru.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <ExperienceTimeline />;
}

