// "use client";

// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { favouriteData } from "@/lib/data";

// gsap.registerPlugin(ScrollTrigger);

// export default function FavouritesPage() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const curtainRef = useRef<HTMLDivElement>(null);
//   const fixedWordRef = useRef<HTMLHeadingElement>(null);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       const sections = gsap.utils.toArray(".fav-section");

//       sections.forEach((section: any) => {
//         const text = section.querySelector(".fav-text");
//         const image = section.querySelector(".fav-image");

//         // Animate content bottom to top
//         gsap.fromTo(
//           [text, image],
//           { y: 150, opacity: 0 },
//           {
//             y: 0,
//             opacity: 1,
//             duration: 1.2,
//             ease: "power3.out",
//             scrollTrigger: {
//               trigger: section,
//               start: "top center",
//               end: "bottom center",
//               toggleActions: "play none none reverse",
//             },
//           },
//         );

//         // Background color curtain effect (bottom to top)
//         ScrollTrigger.create({
//           trigger: section,
//           start: "top center",
//           onEnter: () => {
//             // First set the new background color
//             gsap.set(containerRef.current, {
//               backgroundColor: section.dataset.bg,
//             });

//             // Animate curtain from bottom to top
//             gsap.fromTo(
//               curtainRef.current,
//               {
//                 y: "100%",
//                 opacity: 1,
//               },
//               {
//                 y: "0%",
//                 duration: 1.2,
//                 ease: "power3.out",
//                 onComplete: () => {
//                   gsap.set(curtainRef.current, { y: "100%" });
//                 },
//               },
//             );
//           },
//           onEnterBack: () => {
//             // First set the new background color
//             gsap.set(containerRef.current, {
//               backgroundColor: section.dataset.bg,
//             });

//             // Animate curtain from bottom to top
//             gsap.fromTo(
//               curtainRef.current,
//               {
//                 y: "100%",
//                 opacity: 1,
//               },
//               {
//                 y: "0%",
//                 duration: 1.2,
//                 ease: "power3.out",
//                 onComplete: () => {
//                   gsap.set(curtainRef.current, { y: "100%" });
//                 },
//               },
//             );
//           },
//         });
//       });

//       // Pin the container
//       ScrollTrigger.create({
//         trigger: containerRef.current,
//         pin: true,
//         start: "top top",
//         end: `+=${favouriteData.length * 100}%`,
//         pinSpacing: true,
//       });
//     }, containerRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <div
//       ref={containerRef}
//       className="w-full h-screen overflow-hidden relative"
//       style={{ backgroundColor: favouriteData[0]?.bg || "#000000" }}
//     >
//       {/* Curtain overlay for color transition effect */}
//       <div
//         ref={curtainRef}
//         className="absolute inset-0 w-full h-full z-20 pointer-events-none"
//         style={{
//           backgroundColor: favouriteData[0]?.bg || "#000000",
//           transform: "translateY(100%)",
//         }}
//       />

//       {/* Fixed background container for scrolling content */}
//       <div className="relative h-full w-full z-10">
//         {/* Fixed Favourite Word */}
//         <div className="fixed left-8 lg:left-20 top-1/2 -translate-y-1/2 z-30 w-full lg:w-1/2">
//           <h1
//             ref={fixedWordRef}
//             className="text-5xl lg:text-7xl font-bold text-white"
//           >
//             Favourite
//           </h1>
//         </div>

//         {/* Scrollable Content */}
//         <div className="absolute right-0 top-0 w-full lg:w-1/2 h-full overflow-y-auto z-20">
//           {favouriteData.map((item) => (
//             <section
//               key={item.id}
//               className="fav-section h-screen flex flex-col items-center justify-center px-8 lg:px-20"
//               data-bg={item.bg}
//             >
//               <div className="w-full flex flex-col items-start gap-6">
//                 <div className="fav-text text-white">
//                   <h2 className="text-3xl lg:text-5xl font-semibold">
//                     {item.title}
//                   </h2>
//                   <p className="text-xl lg:text-3xl opacity-80 mt-3">
//                     {item.value}
//                   </p>
//                 </div>

//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   className="fav-image w-full max-w-md rounded-2xl shadow-2xl"
//                 />
//               </div>
//             </section>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
