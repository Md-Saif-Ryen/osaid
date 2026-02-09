// "use client";

// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Image from "next/image";

// gsap.registerPlugin(ScrollTrigger);

// const educationData = [
//   {
//     id: 1,
//     institution: "Chandigarh University",
//     location: "Mohali, Punjab",
//     degree: "Bachelor of Engineering (B.E.)",
//     specialization: "Specialization - Biotechnology",
//     year: "Year of Completion: 2026",
//     image: "/images/industrial 3.png",
//   },
//   {
//     id: 2,
//     institution: "Gyan Niketan",
//     location: "Patna, Bihar",
//     degree: "Senior Secondary Education (Class XII)",
//     board: "(CBSE)",
//     stream: "Medical Stream",
//     year: "Year of Completion: 2021",
//     image: "/images/industrial 1.png",
//   },
//   {
//     id: 3,
//     institution: "RPS Residential School",
//     location: "Patna, Bihar",
//     degree: "Senior Secondary Education (Class X)",
//     board: "(CBSE)",
//     year: "Year of Completion: 2019",
//     image: "/images/industrial 2.png",
//   },
// ];

// export default function EducationSection() {
//   const sectionRefs = useRef<HTMLDivElement[]>([]);

//   useEffect(() => {
//     sectionRefs.current.forEach((section) => {
//       const image = section.querySelector(".edu-image");
//       const words = section.querySelectorAll(".edu-word");

//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: section,
//           start: "top 75%",
//           end: "top 30%",
//           toggleActions: "play none none reverse",
//         },
//       });

//       // Image animation (left → center)
//       tl.from(image, {
//         x: -120,
//         opacity: 0,
//         duration: 1.1,
//         ease: "power3.out",
//       });

//       // Text animation (right → left, word by word)
//       tl.from(
//         words,
//         {
//           x: 140,
//           opacity: 0,
//           duration: 0.6,
//           ease: "power3.out",
//           stagger: {
//             each: 0.08,
//             from: "start",
//           },
//         },
//         "-=0.5"
//       );
//     });

//     ScrollTrigger.refresh();
//   }, []);

//   return (
//     <section className="w-full bg-white py-16 sm:py-20">
//       {educationData.map((item, index) => (
//         <div
//           key={item.id}
//           ref={(el) => {
//             if (el) sectionRefs.current[index] = el;
//           }}
//           className="min-h-[50vh] flex items-center justify-center px-4 sm:px-6 lg:px-12"
//         >
//           <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5 items-center">
//             {/* Image */}
//             <div className="edu-image flex justify-center">
//               <Image
//                 src={item.image}
//                 alt={item.institution}
//                 width={460}
//                 height={340}
//                 className="rounded-2xl object-cover w-full max-w-[420px]"
//                 priority
//               />
//             </div>

//             {/* Text */}
//             <div className="text-center gap-10 lg:text-left space-y-3 sm:space-y-14">
//               {renderWords(
//                 item.institution,
//                 "text-3xl sm:text-4xl font-bold"
//               )}
//               {renderWords(item.location, "text-lg opacity-80")}
//               {renderWords(item.degree, "font-xl")}
//               {item.specialization && renderWords(item.specialization)}
//               {item.stream && renderWords(item.stream)}
//               {item.board && renderWords(item.board)}
//               {renderWords(item.year, "text-lg opacity-70")}
//             </div>
//           </div>
//         </div>
//       ))}
//     </section>
//   );
// }

// /* 🔥 Helper: split text into animated words */
// function renderWords(text: string, className = "") {
//   return (
//     <p className={`overflow-hidden ${className}`}>
//       {text.split(" ").map((word, i) => (
//         <span
//           key={i}
//           className="edu-word text-black inline-block will-change-transform"
//         >
//           {word}
//           <span className="inline-block w-[0.35em]">&nbsp;</span>
//         </span>
//       ))}
//     </p>
//   );

// }
