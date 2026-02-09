"use client";

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export default function TornHero() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const heroImageRef = useRef<HTMLDivElement | null>(null);
  const heroTextRef = useRef<HTMLDivElement | null>(null);

  const aboutRef = useRef<HTMLDivElement | null>(null);
  const aboutImageSlotRef = useRef<HTMLDivElement | null>(null);
  const aboutTextRef = useRef<HTMLDivElement | null>(null);
  const aboutImageContainerRef = useRef<HTMLDivElement | null>(null);

  const [isMobile, setIsMobile] = useState(false);
  const [imageInAbout, setImageInAbout] = useState(false);

  // Detect mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useLayoutEffect(() => {
    if (isMobile) return; // Skip GSAP on mobile

    const hero = heroRef.current;
    const heroImg = heroImageRef.current;
    const heroText = heroTextRef.current;
    const about = aboutRef.current;
    const aboutSlot = aboutImageSlotRef.current;
    const aboutText = aboutTextRef.current;

    if (!hero || !heroImg || !heroText || !about || !aboutSlot || !aboutText)
      return;

    const ctx = gsap.context(() => {
      // Hero entry animation
      gsap.from(heroImg, {
        x: 200,
        scale: 1.25,
        opacity: 0,
        rotation: 12,
        duration: 1.3,
        ease: "power3.out",
      });

      gsap.from(gsap.utils.toArray(heroText.children), {
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 0.9,
        ease: "power3.out",
      });

      // Pin hero section
      ScrollTrigger.create({
        trigger: hero,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
      });

      // Calculate positions for smooth movement
      const calculateMovement = () => {
        const heroRect = heroImg.getBoundingClientRect();
        const targetRect = aboutSlot.getBoundingClientRect();
        const heroSectionRect = hero.getBoundingClientRect();

        // Calculate relative positions
        const dx = targetRect.left - heroRect.left;
        const dy = targetRect.top - (heroRect.top - heroSectionRect.top);

        return { dx, dy };
      };

      // Smooth image movement animation
      const { dx, dy } = calculateMovement();

      const animation = gsap.to(heroImg, {
        x: dx,
        y: dy,
        width: 300,
        height: 200,
        rotation: 0,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: about,
          start: "top 80%",
          end: "top top",
          scrub: 1.5,
          markers: false,
          onUpdate: (self) => {
            if (self.progress > 0.95) {
              setImageInAbout(true);
            } else {
              setImageInAbout(false);
            }
          },
          onEnterBack: () => setImageInAbout(false),
          onLeaveBack: () => setImageInAbout(false),
        },
      });

      // About text animation
      gsap.from(gsap.utils.toArray(aboutText.children), {
        scrollTrigger: {
          trigger: about,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
      });

      // Handle resize
      const handleResize = () => {
        animation.kill();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        ctx.revert();

        // Recreate with new positions
        const { dx: newDx, dy: newDy } = calculateMovement();

        gsap.set(heroImg, {
          x: imageInAbout ? newDx : 0,
          y: imageInAbout ? newDy : 0,
          width: imageInAbout ? 300 : 400,
          height: imageInAbout ? 200 : 300,
        });

        // Recreate animation
        gsap.to(heroImg, {
          x: newDx,
          y: newDy,
          width: 300,
          height: 200,
          rotation: 0,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: about,
            start: "top 80%",
            end: "top top",
            scrub: 1.5,
            onUpdate: (self) => {
              if (self.progress > 0.95) {
                setImageInAbout(true);
              } else {
                setImageInAbout(false);
              }
            },
            onEnterBack: () => setImageInAbout(false),
            onLeaveBack: () => setImageInAbout(false),
          },
        });
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    });

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isMobile, imageInAbout]);

  // Mobile animation variants for Framer Motion
  const mobileImageVariants = {
    initial: { x: 100, opacity: 0, scale: 1.2 },
    animate: { x: 0, opacity: 1, scale: 1 },
    about: { scale: 0.8, opacity: 1 },
  };

  const textVariants = {
    initial: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <>
      {/* ================= HERO SECTION (90vh) ================= */}
      <section
        ref={heroRef}
        className="relative bg-black overflow-hidden"
        style={{ height: "90vh" }}
      >
        {/* MOVING IMAGE - Conditionally rendered based on device */}
        {!isMobile ? (
          // Desktop - GSAP version
          <div
            ref={heroImageRef}
            className="absolute right-4 md:right-8 lg:right-20 top-1/2 -translate-y-1/2 z-30 pointer-events-none"
            style={{ width: 400, height: 300 }}
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/20">
              <Image
                src="/images/osaid_morphed.png"
                alt="Osaid"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover"
              />
            </div>
          </div>
        ) : (
          // Mobile - Framer Motion version
          <motion.div
            initial="initial"
            animate="animate"
            variants={mobileImageVariants}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30"
            style={{ width: 200, height: 150 }}
          >
            <div className="relative w-full h-full rounded-xl overflow-hidden shadow-xl border border-white/20">
              <Image
                src="/images/osaid_morphed.png"
                alt="Osaid"
                fill
                priority
                sizes="(max-width: 768px) 200px"
                className="object-cover"
              />
            </div>
          </motion.div>
        )}

        {/* HERO TEXT */}
        <div className="relative z-10 h-full flex items-center px-4 md:px-8 lg:px-12 xl:px-24">
          <div ref={heroTextRef} className="max-w-2xl">
            {isMobile ? (
              // Mobile - Framer Motion text
              <motion.div
                initial="initial"
                animate="animate"
                variants={{
                  animate: {
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                <motion.h1
                  variants={textVariants}
                  transition={{ duration: 0.6 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6"
                >
                  Innovation <br />
                  meets <span className="text-cyan-400">Design</span>
                </motion.h1>
                <motion.p
                  variants={textVariants}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-gray-300 text-base md:text-lg lg:text-xl"
                >
                  Turning complex science into simple experiences.
                </motion.p>
              </motion.div>
            ) : (
              // Desktop - GSAP text
              <>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
                  Innovation <br />
                  meets <span className="text-cyan-400">Design</span>
                </h1>
                <p className="text-gray-300 text-base md:text-lg lg:text-xl">
                  Turning complex science into simple experiences.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ================= ABOUT SECTION (70vh) ================= */}
      <section
        ref={aboutRef}
        className="relative bg-[#B8E3DC] flex items-center"
        style={{ height: "70vh" }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-16 items-center justify-center">
          {/* TARGET SLOT FOR IMAGE */}
          <div className="relative">
            <div
              ref={aboutImageSlotRef}
              className="w-[150px] h-[100px] md:w-[200px] md:h-[133px] lg:w-[300px] lg:h-[200px] rounded-xl md:rounded-2xl border-2 md:border-4 border-white shadow-lg md:shadow-xl"
            />

            {/* Mobile - Image in about section */}
            {isMobile && (
              <AnimatePresence>
                {imageInAbout && (
                  <motion.div
                    ref={aboutImageContainerRef}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 rounded-xl md:rounded-2xl overflow-hidden"
                  >
                    <Image
                      src="/images/osaid_morphed.png"
                      alt="Osaid"
                      fill
                      sizes="(max-width: 768px) 150px, (max-width: 1024px) 200px, 300px"
                      className="object-cover"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>

          {/* ABOUT TEXT */}
          <div ref={aboutTextRef} className="space-y-3 md:space-y-4 max-w-lg">
            {isMobile ? (
              // Mobile - Framer Motion text
              <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  animate: {
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                <motion.h2
                  variants={textVariants}
                  transition={{ duration: 0.5 }}
                  className="text-2xl md:text-3xl lg:text-4xl font-bold"
                >
                  About <span className="text-teal-700">Me</span>
                </motion.h2>
                <motion.p
                  variants={textVariants}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-sm md:text-base"
                >
                  I'm <strong>S M Osaid Rizvi</strong>, combining biotechnology
                  with modern UI/UX thinking.
                </motion.p>
                <motion.p
                  variants={textVariants}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-sm md:text-base"
                >
                  I design systems where science feels intuitive, visual and
                  human.
                </motion.p>
              </motion.div>
            ) : (
              // Desktop - GSAP text
              <>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                  About <span className="text-teal-700">Me</span>
                </h2>
                <p className="text-sm md:text-base lg:text-lg">
                  I'm <strong>S M Osaid Rizvi</strong>, combining biotechnology
                  with modern UI/UX thinking.
                </p>
                <p className="text-sm md:text-base lg:text-lg">
                  I design systems where science feels intuitive, visual and
                  human.
                </p>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
