// "use client";

// import { useLayoutEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// export default function EthosSection() {
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const animatedPentagonRef = useRef<HTMLDivElement>(null);
//   const textRefs = useRef<HTMLDivElement[]>([]);
//   const finalPentagonsRef = useRef<(HTMLDivElement | null)[]>([]);

//   useLayoutEffect(() => {
//     const ctx = gsap.context(() => {
//       // Initial setup - hide final pentagons
//       gsap.set(".final-pentagon-container", { opacity: 0 });

//       // Setup for animated pentagon text
//       gsap.set(textRefs.current, { opacity: 0 });
//       gsap.set(textRefs.current[0], { opacity: 1 });

//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: "top top",
//           end: "+=600%",
//           scrub: 1,
//           pin: true,
//           anticipatePin: 1,
//         },
//       });

//       // STEP 1 – First text appear (Yellow)
//       tl.fromTo(
//         animatedPentagonRef.current,
//         { scale: 0.5, opacity: 0 },
//         {
//           scale: 1,
//           opacity: 1,
//           duration: 2,
//           background: "linear-gradient(180deg, #FFCC00 0%, #000000 100%)",
//         },
//       )

//         // STEP 2 – Rotate + color change to Red + second text
//         .to(animatedPentagonRef.current, {
//           rotation: 180,
//           background: "linear-gradient(180deg, #FF0000 0%, #000000 100%)",
//           duration: 2,
//         })
//         .to(textRefs.current[0], { opacity: 0, duration: 0.5 }, "-=1.5")
//         .to(textRefs.current[1], { opacity: 1, duration: 0.5 }, "-=1")

//         // STEP 3 – Rotate again + color change to Blue + third text
//         .to(animatedPentagonRef.current, {
//           rotation: 360,
//           background: "linear-gradient(180deg, #00B3FF 0%, #000000 100%)",
//           duration: 2,
//         })
//         .to(textRefs.current[1], { opacity: 0, duration: 0.5 }, "-=1.5")
//         .to(textRefs.current[2], { opacity: 1, duration: 0.5 }, "-=1")

//         // STEP 4 – Animated pentagon fades out
//         .to(animatedPentagonRef.current, {
//           opacity: 0,
//           scale: 0.8,
//           duration: 1.5,
//         })

//         // STEP 5 – Final pentagons appear in their positions
//         .to(
//           ".final-pentagon-container",
//           {
//             opacity: 1,
//             duration: 2,
//             stagger: 0.3,
//           },
//           "-=0.5",
//         );
//     }, sectionRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden"
//     >
//       {/* SINGLE ANIMATED PENTAGON (CENTRAL) */}
//       <div
//         ref={animatedPentagonRef}
//         className="absolute w-[280px] h-[280px] flex items-center justify-center text-white z-20"
//         style={{
//           clipPath: "polygon(50% 0%, 100% 35%, 80% 100%, 20% 100%, 0% 35%)",
//         }}
//       >
//         <div className="relative w-full h-full flex items-center justify-center">
//           {[
//             {
//               title: "Approach / Working Style",
//               desc: "I approach problems with a balance of scientific rigor and practical thinking. I value clarity, documentation, collaboration, and continuous learning while working in research and industry environments.",
//             },
//             {
//               title: "Motivation & Direction",
//               desc: "My curiosity lies in translating complex biological data into meaningful insights that can improve diagnostics, healthcare workflows, and patient outcomes.",
//             },
//             {
//               title: "Interdisciplinary Angle",
//               desc: "Alongside biotechnology, I have a growing interest in UX, data visualization, and digital health tools, believing that good design plays a key role in making scientific information more accessible and impactful.",
//             },
//           ].map((item, i) => (
//             <div
//               key={i}
//               ref={(el) => (textRefs.current[i] = el!)}
//               className="absolute w-full px-8 text-center"
//               style={{ opacity: i === 0 ? 1 : 0 }}
//             >
//               <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
//               <p className="text-sm opacity-90 leading-relaxed">{item.desc}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* FINAL 3 PENTAGONS IN THEIR POSITIONS */}
//       <div className="relative w-full max-w-6xl h-[650px] final-pentagon-container">
//         {/* TOP / SECOND – ROTATED (RED) */}
//         <div
//           ref={(el) => (finalPentagonsRef.current[1] = el)}
//           className="final-pentagon absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 flex items-center justify-center"
//           style={{
//             clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
//             background: "linear-gradient(180deg, #FF0000 0%, #000000 100%)",
//           }}
//         >
//           <div className="text-center rotate-180 text-white px-6">
//             <h3 className="font-bold text-lg mb-3">Motivation & Direction</h3>
//             <p className="text-sm leading-relaxed opacity-90">
//               My curiosity lies in translating complex biological data into
//               meaningful insights...
//             </p>
//           </div>
//         </div>

//         {/* LEFT / FIRST – YELLOW */}
//         <div
//           ref={(el) => (finalPentagonsRef.current[0] = el)}
//           className="final-pentagon absolute bottom-0 left-[12%] w-80 h-80 flex items-center justify-center"
//           style={{
//             clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
//             background: "linear-gradient(180deg, #FFCC00 0%, #000000 100%)",
//           }}
//         >
//           <div className="text-center text-white px-6">
//             <h3 className="font-bold text-lg mb-3">Approach / Working Style</h3>
//             <p className="text-sm leading-relaxed opacity-90">
//               I approach problems with a balance of scientific rigor and
//               practical thinking...
//             </p>
//           </div>
//         </div>

//         {/* RIGHT / THIRD – BLUE */}
//         <div
//           ref={(el) => (finalPentagonsRef.current[2] = el)}
//           className="final-pentagon absolute bottom-0 right-[12%] w-80 h-80 flex items-center justify-center"
//           style={{
//             clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
//             background: "linear-gradient(180deg, #00B3FF 0%, #000000 100%)",
//           }}
//         >
//           <div className="text-center text-white px-6">
//             <h3 className="font-bold text-lg mb-3">Interdisciplinary Angle</h3>
//             <p className="text-sm leading-relaxed opacity-90">
//               Alongside biotechnology, I have a growing interest in UX, data
//               visualization...
//             </p>
//           </div>
//         </div>
//       </div>

//       <h2 className="absolute top-10 text-white text-5xl font-bold tracking-widest z-10">
//         ETHOS
//       </h2>
//     </section>
//   );
// }
