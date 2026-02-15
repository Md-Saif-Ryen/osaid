"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import InkFillButton from "../components/InkFillButton";
import { testimonials, certificates, industries, skills } from "@/lib/data";

export default function HomePage() {
  const certRowRef = useRef<HTMLDivElement>(null);
  const testimonialSectionRef = useRef<HTMLDivElement>(null);
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const aboutImageRef = useRef<HTMLDivElement>(null);
  const aboutTextRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [showAboutSection, setShowAboutSection] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // ✅ New state to track mount



  // Handle responsive visible count AND About section visibility
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      // Set visible count for testimonials
      if (width >= 1024) {
        setVisibleCount(3);
      } else if (width >= 768) {
        setVisibleCount(2);
      } else {
        setVisibleCount(1);
      }

      // ✅ Logic for About section: show only if width > 768px
      setShowAboutSection(width > 768);

      // Reset current index to ensure proper display
      setCurrentIndex((prev) => Math.min(prev, testimonials.length - 1));
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Set mounted to true after initial render
    setIsMounted(true);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Get visible testimonials
  const getVisibleTestimonials = () => {
    const visibleTestimonials = [];
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visibleTestimonials.push(testimonials[index]);
    }
    return visibleTestimonials;
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + visibleCount) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev - visibleCount;
      return newIndex < 0 ? testimonials.length - visibleCount : newIndex;
    });
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex * visibleCount);
  };

  // Calculate total slides based on visible count
  const totalSlides = Math.ceil(testimonials.length / visibleCount);

  const hasSplit = useRef(false);

  useLayoutEffect(() => {
    if (!aboutTextRef.current || hasSplit.current || !showAboutSection) return;

    const element = aboutTextRef.current;
    const text = element.textContent || "";

    element.innerHTML = text
      .split("")
      .map((char) =>
        char === " "
          ? `<span class="char">&nbsp;</span>`
          : `<span class="char">${char}</span>`,
      )
      .join("");

    hasSplit.current = true;
  }, [showAboutSection]);

  // Main GSAP animations effect
  useEffect(() => {
    // Don't run animations until component is mounted
    if (!isMounted) return;

    gsap.registerPlugin(ScrollTrigger);

    // Clean all existing ScrollTriggers
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    // ✅ Only setup About section animations if it's visible
    if (showAboutSection && aboutSectionRef.current) {
      gsap.from(".about-char-text .char", {
        opacity: 0,
        stagger: 0.45,
        ease: "power3.out",
        scrollTrigger: {
          trigger: aboutSectionRef.current,
          start: "top 60%",
          end: "top 0%",
          scrub: 1,
          markers: false, // Set to true for debugging
        },
      });

      // Image animation
      if (aboutImageRef.current) {
        gsap.from(aboutImageRef.current, {
          x: -100,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: aboutSectionRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
          },
        });
      }

      // Text animation
      if (aboutTextRef.current) {
        gsap.from(aboutTextRef.current, {
          x: 100,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: aboutSectionRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
          },
        });
      }

      gsap.from(".skill-tag", {
        y: 200,
        opacity: 0,
        stagger: 0.22,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".skill-tags",
          start: "top 80%",
          once: true,
        },
      });
    }

    // Hero image animation (always runs)
    // Hero image animation (only for width > 768px)
    const heroImage = heroImageRef.current;
    if (heroImage) {
      ScrollTrigger.create({
        trigger: ".hero-section",
        start: "top top",
        end: "bottom 30%",
        scrub: 2,
        onUpdate: (self) => {
          const progress = self.progress;
          const width = window.innerWidth;

          let x = 0;
          let y = 0;
          let scale = 1;

          // ✅ Only apply animation if width > 768px
          if (width > 768) {
            if (width >= 768 && width < 1024) {
              x = progress * -580;
              y = progress * 730;
              scale = 1 + progress * 0.03;
            } else if (width >= 1024 && width < 1440) {
              x = progress * -700;
              y = progress * 420;
              scale = 1 + progress * 0.07;
            } else {
              x = progress * -970;
              y = progress * 596;
              scale = 1 + progress * 0.1;
            }
          }
          // ✅ If width <= 768px, no animation (x=0, y=0, scale=1)

          gsap.to(heroImage, {
            x,
            y,
            scale,
            ease: "none",
            duration: 0.1,
          });
        },
      });
    }

    // Experience animation
    gsap.set(".experience h1", { xPercent: 60 });
    gsap.to(".experience h1", {
      xPercent: -40,
      ease: "none",
      scrollTrigger: {
        trigger: ".main-experience",
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
        pin: true,
      },
    });

    // Certificates animation
    gsap.from(".certificate-card", {
      scale: 0.8,
      opacity: 0,
      stagger: 0.15,
      duration: 1.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".certificate-section",
        start: "top 70%",
        once: true,
      },
    });

    if (certRowRef.current) {
      gsap.to(certRowRef.current, {
        x: () => -(certRowRef.current!.scrollWidth - window.innerWidth + 280),
        ease: "none",
        scrollTrigger: {
          trigger: ".certificate-section",
          start: "top 20%",
          end: "bottom top",
          scrub: 2.2,
          pin: true,
        },
      });
    }

    // Testimonial title animation
    gsap.set(".testimonial h1", {
      xPercent: 50,
    });
    gsap.to(".testimonial h1", {
      xPercent: -40,
      ease: "none",
      scrollTrigger: {
        trigger: ".main-testimonial",
        start: "top 10%",
        end: "top -20%",
        scrub: 1.8,
        pin: true,
      },
    });

    // Testimonial slider animation
    gsap.from(".testimonial-item", {
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".testimonial-slider-section",
        start: "top 80%",
        once: true,
      },
    });

    // Industry animation
    gsap.from(".industry-card", {
      y: 40,
      opacity: 0,
      stagger: 0.32,
      duration: 0.7,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".industry-section",
        start: "top 85%",
      },
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger) {
          t.kill();
        }
      });
    };
  }, [showAboutSection, isMounted]); // ✅ Re-run when showAboutSection OR isMounted changes

  // Single auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, visibleCount]);

  return (
    <main className="relative w-full bg-white">
      {/* ================= HERO ================= */}
      <section className="hero-section min-h-screen bg-white flex items-center relative overflow-visible">
        <div className="mx-auto px-4 sm:px-6 lg:px-20 grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="space-y-6 text-center md:text-left z-10">
            <h1 className="font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-black">
              Innovation Begins When Science Meets{" "}
              <span className="bg-gradient-to-b from-red-600 to-black bg-clip-text text-transparent">
                Design
              </span>
            </h1>
            <p className="text-gray-700 text-lg md:text-xl max-w-xl mx-auto md:mx-0">
              Bridging scientific expertise with modern design to create
              meaningful, data-driven interfaces
            </p>
            <InkFillButton />
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="relative w-[260px] sm:w-[320px] md:w-[400px] aspect-[4/5] rounded-2xl shadow-xl overflow-visible">
              <div
                ref={heroImageRef}
                className="osaid-image relative w-full h-full rounded-2xl overflow-hidden"
              >
                <Image
                  src="/images/osaid_morphed.png"
                  alt="Osaid"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ABOUT US ================= */}
      {showAboutSection && (
        <section
          ref={aboutSectionRef}
          className="about-section bg-[#B8E3DC] py-6"
        >
          <div className="px-4 sm:px-60 lg:px-20">
            <div className="grid md:grid-cols-2 items-center">
              <div ref={aboutImageRef} className="space-y-1 md:space-y-2">
                <div className="relative w-[260px] sm:w-[320px] md:w-[400px] aspect-[4/5] rounded-2xl shadow-xl overflow-visible"></div>
              </div>

              <div className="space-y-1 md:space-y-2">
                <div>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 bg-gradient-to-b from-red-600 to-black bg-clip-text text-transparent">
                    S M Osaid Rizvi
                  </h3>
                  <p className="text-lg md:text-xl text-gray-600 pb-3">
                    Biotechnology Engineer & UI/UX Designer
                  </p>
                </div>

                <div>
                  <p
                    ref={aboutTextRef}
                    className="about-char-text flex flex-wrap text-black leading-[100%] tracking-[0%] font-normal text-2xl pb-10"
                  >
                    I'm S M Osaid Rizvi, a biotechnology engineering student
                    from India with hands-on experience in clinical diagnostics,
                    QA/QC systems, nanotechnology, and healthcare data analysis.
                    My work focuses on applying scientific precision to
                    real-world problems while exploring how design and data
                    visualization can make complex healthcare information
                    clearer and more usable. I created this website to document
                    my journey, showcase my projects, and demonstrate how
                    science-driven thinking and thoughtful UI/UX design can come
                    together to improve digital health and biotech innovation.
                  </p>
                </div>

                <div className="skill-tags flex flex-wrap gap-3">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="skill-tag px-4 py-2 bg-gradient-to-r from-red-50 to-gray-50 text-gray-800 rounded-full text-sm md:text-base font-medium border border-red-100"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ================= EXPERIENCE ================= */}
      <section className="main-experience h-screen overflow-hidden">
        <div className="experience h-full flex items-center justify-center">
          <h1 className="text-[25vw] md:text-[40vw] font-extrabold uppercase bg-gradient-to-b from-red-600 to-black bg-clip-text text-transparent select-none">
            EXPERIENCE
          </h1>
        </div>
      </section>

      {/* ================= CERTIFICATES ================= */}
      <section className="certificate-section pt-15 md:pt-25 overflow-hidden">
        <div ref={certRowRef} className="flex gap-4 md:gap-6 px-4 md:px-6">
          {certificates.map((src, i) => (
            <div
              key={i}
              className="certificate-card shrink-0 w-[280px] sm:w-[320px] md:w-[360px] lg:w-[420px] h-[180px] sm:h-[220px] md:h-[300px] p-1"
            >
              <div className="relative w-full h-full rounded-[30px] overflow-hidden">
                <Image
                  src={src}
                  alt={`Certificate ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="w-full flex justify-center mt-8 md:mt-[3px]">
          <p className="max-w-[943px] w-full text-[#5B5A5A] text-center italic font-normal leading-[100%] px-4 md:px-6 pt-12 md:pt-40 text-xl sm:text-2xl md:text-3xl lg:text-[36px]">
            "Innovation Thrives Where Precision Meets Perception And Design
            Brings Meaning"
          </p>
        </div>
      </section>

      {/* ================= TESTIMONIAL TITLE SECTION ================= */}
      <section className="main-testimonial min-h-screen overflow-hidden bg-gradient-to-b from-white via-red-100 via-red-500 via-red-900 to-black">
        <div className="testimonial h-screen flex items-center justify-center">
          <h1 className="text-[25vw] md:text-[40vw] font-extrabold uppercase text-white select-none m-0 p-0 leading-none">
            TESTIMONIAL
          </h1>
        </div>
      </section>

      {/* ================= TESTIMONIAL SLIDER ================= */}
      <section
        ref={testimonialSectionRef}
        className="testimonial-slider-section py-1 md:py-2 bg-transparent overflow-hidden relative"
      >
        <div className="mx-auto px-4 md:px-10 relative">
          <button
            onClick={prevSlide}
            className="absolute left-3 md:left-13 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all duration-300 border border-gray-200"
          >
            ‹
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all duration-300 border border-gray-200"
          >
            ›
          </button>

          <div className="overflow-hidden px-4 md:px-6 lg:px-8">
            <div className="flex gap-4 md:gap-6 lg:gap-8 transition-transform duration-500 ease-in-out">
              {getVisibleTestimonials().map((testimonial, index) => (
                <div
                  key={`${testimonial.id}-${index}`}
                  className="testimonial-item flex-shrink-0"
                  style={{
                    width: `calc((100% - ${
                      (visibleCount - 1) * 1
                    }rem) / ${visibleCount})`,
                  }}
                >
                  <div className="overflow-hidden">
                    <div className="relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px]">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-contain p-4"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center items-center gap-2 md:gap-3 mt-8 md:mt-12">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 ${
                  Math.floor(currentIndex / visibleCount) === index
                    ? "w-8 md:w-10 h-2 md:h-3 rounded-full bg-gradient-to-r from-red-600 to-black"
                    : "w-2 h-2 md:w-3 md:h-3 rounded-full bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================= INDUSTRY ================= */}
      <section className="industry-section py-10 md:py-20 flex items-center justify-center bg-white">
        <div className="text-center max-w-[1440px] mx-auto px-4 md:px-6">
          <h2 className="text-lg sm:text-xl md:text-2xl pb-6 sm:pb-10 mb-8 text-gray-600">
            Industries Training At
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 items-center justify-center place-items-center">
            {industries.map((src, i) => (
              <div key={i} className="industry-card">
                <div className="relative w-[160px] sm:w-[180px] md:w-[200px] h-[60px] sm:h-[70px] md:h-[80px]">
                  <Image
                    src={src}
                    alt={`Industry ${i + 1}`}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
