"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import MobileHobbiesSection from "./MobileHobbiesSection";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function PremiumHobbiesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth < 1024) return;

    const ctx = gsap.context(() => {
      const container = document.querySelector(".horizontal-wrapper");
      const words = gsap.utils.toArray(".word");
      const circle = document.querySelector(".circle");

      // --- Horizontal Scroll ---
      gsap.to(container, {
        xPercent: -100,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=3500",
          scrub: 1,
          pin: true,
        },
      });

      // --- INTRO TEXT "My Hobbies is to" ENTIRELY FROM RIGHT (no reverse) ---
      const introTexts = gsap.utils.toArray(".word").filter((el: any) => {
        const text = el.textContent;
        return (
          text === "My" || text === "Hobbies" || text === "is" || text === "to"
        );
      });

      gsap.set(introTexts, { x: 400, opacity: 0 });
      gsap.to(introTexts, {
        x: 0,
        opacity: 1,
        duration: 1.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          scrub: 1,
          once: true,
        },
      });

      // --- OTHER WORDS: single forward animation, no reverse ---
      words.forEach((word: any) => {
        const text = word.textContent;
        if (
          text === "My" ||
          text === "Hobbies" ||
          text === "is" ||
          text === "to"
        )
          return;

        const directions = [
          { x: -250, y: 0 },
          { x: 250, y: 0 },
          { x: 0, y: -250 },
          { x: 0, y: 250 },
        ];
        const randomDir =
          directions[Math.floor(Math.random() * directions.length)];

        gsap.from(word, {
          ...randomDir,
          opacity: 0,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: word,
            start: "left center",
            once: true,
          },
        });
      });

      // --- CIRCLE becomes RING (outer radius = inner radius + 10px) and emits SHAPES ---
      // First, set initial state as a ring with inner transparent area
      gsap.set(circle, {
        borderRadius: "50%",
        width: "10rem",
        height: "10rem",
        background: "transparent",
        boxShadow: "0 0 0 0px rgba(236,72,153,0)",
        border: "4px solid #ec4899",
      });

      // Animate to a thicker ring with glow, then emit shapes
      gsap.fromTo(
        circle,
        {
          borderWidth: "4px",
          borderColor: "#ec4899",
          width: "10rem",
          height: "10rem",
          boxShadow: "0 0 20px rgba(236,72,153,0.3)",
          borderRadius: "50%",
          borderStyle: "solid",
          background: "transparent",
        },
        {
          borderWidth: "10px",
          borderColor: "#c084fc",

          width: "14rem",
          height: "7rem", // must be exactly half

          borderRadius: "7rem 7rem 0 0", // PERFECT semi-circle

          boxShadow: "0 0 50px rgba(219,39,119,0.8)",
          duration: 2,
          ease: "power2.inOut",

          scrollTrigger: {
            trigger: circle,
            start: "left center",
            scrub: 1.5,
            once: true,
          },
          onComplete: () => {
            // Add loader animation after semi-circle forms
            gsap.to(circle, {
              duration: 1.5,
              ease: "linear",
              transformOrigin: "center center",
              borderColor: "#f472b6",
              boxShadow: "0 0 30px rgba(244,114,182,0.9)",
            });

            // Emit shapes
            createShapes();
          },
        },
      );

      // Function to create floating shapes
      function createShapes() {
        const shapesContainer =
          document.querySelector(".circle")?.parentElement;
        if (!shapesContainer) return;

        const shapes = ["timer", "pyramid", "rhombus", "flower"];
        const colors = [
          "#f472b6",
          "#60a5fa",
          "#fbbf24",
          "#34d399",
          "#c084fc",
          "#f87171",
        ];
        const shapeCount = 16;

        for (let i = 0; i < shapeCount; i++) {
          const shape = document.createElement("div");
          const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
          const randomColor = colors[Math.floor(Math.random() * colors.length)];

          shape.className = `floating-shape ${randomShape}`;
          shape.style.position = "absolute";
          shape.style.width = "2.5rem";
          shape.style.height = "2.5rem";
          shape.style.background = randomColor;
          shape.style.boxShadow = `0 0 20px ${randomColor}`;
          shape.style.borderRadius =
            randomShape === "flower"
              ? "50% 50% 0 50%"
              : randomShape === "pyramid"
                ? "0"
                : randomShape === "rhombus"
                  ? "20% 80% 20% 80%"
                  : "50%";
          shape.style.transform = "rotate(45deg)";
          shape.style.opacity = "0";
          shape.style.left = "50%";
          shape.style.top = "50%";
          shape.style.zIndex = "30";
          shape.style.pointerEvents = "none";

          // Add pseudo-element for timer (ring)
          if (randomShape === "timer") {
            shape.style.background = "transparent";
            shape.style.border = `4px solid ${randomColor}`;
            shape.style.borderRadius = "50%";
            shape.style.width = "2.8rem";
            shape.style.height = "2.8rem";
            shape.innerHTML = `<span style="position:absolute; top:10%; left:45%; width:4px; height:1.2rem; background:${randomColor}; transform-origin:bottom; transform:rotate(45deg);"></span>`;
          }

          // For pyramid: triangle
          if (randomShape === "pyramid") {
            shape.style.background = "transparent";
            shape.style.width = "0";
            shape.style.height = "0";
            shape.style.borderLeft = "1.5rem solid transparent";
            shape.style.borderRight = "1.5rem solid transparent";
            shape.style.borderBottom = `2.5rem solid ${randomColor}`;
            shape.style.background = "transparent";
            shape.style.boxShadow = "none";
          }

          // Rhombus
          if (randomShape === "rhombus") {
            shape.style.transform = "rotate(45deg) scale(0.8)";
            shape.style.borderRadius = "4px";
          }

          // Flower: multi-petal simulation with box-shadow
          if (randomShape === "flower") {
            shape.style.background = randomColor;
            shape.style.borderRadius = "50%";
            shape.style.boxShadow = `0 0 0 4px ${randomColor}80, 0 0 0 8px ${randomColor}40`;
            shape.style.width = "2rem";
            shape.style.height = "2rem";
          }

          shapesContainer.appendChild(shape);

          // Animate each shape outward
          const angle = (i / shapeCount) * Math.PI * 2;
          const x = Math.cos(angle) * 250 + (Math.random() * 100 - 50);
          const y = Math.sin(angle) * 200 + (Math.random() * 80 - 40);

          gsap.to(shape, {
            x: x,
            y: y,
            opacity: 0.9,
            scale: 1.3,
            rotation: `+=${Math.random() * 360}`,
            duration: 2.5,
            delay: i * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: circle,
              start: "left center",
              scrub: 0.8,
              once: true,
            },
          });

          // Fade out and remove
          gsap.to(shape, {
            opacity: 0,
            scale: 0.5,
            duration: 1.5,
            delay: i * 0.08 + 1.8,
            ease: "power2.in",
            scrollTrigger: {
              trigger: circle,
              start: "left center",
              scrub: 0.8,
              once: true,
            },
            onComplete: () => {
              if (shape.parentNode) shape.remove();
            },
          });
        }
      }

      const footballWord = document.querySelector(".football");
      const playingSpan = document.querySelector(".football .playing-part");
      const footballSpan = document.querySelector(".football .football-part");
      const footballImg = document.querySelector(".football-img");
      if (playingSpan && footballSpan && footballImg && footballWord) {
        gsap.set(playingSpan, {
          backgroundColor: "#b91c1c",
          padding: "0.25rem 0.75rem",
          borderRadius: "0.375rem",
          color: "white",
          display: "inline-block",
        });

        gsap.from(footballSpan, {
          opacity: 0,
          scale: 0.2,
          x: -40,
          duration: 1.2,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: footballWord,
            start: "left center",
            once: true,
          },
        });

        // IMAGE moves ONLY on X axis with scroll
        gsap.fromTo(
          footballImg,
          {
            x: 0,
            opacity: 1,
            scale: 1,
            rotation: 0,
          },
          {
            x: 580, // Only X axis movement
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 5,
            ease: "none",
            scrollTrigger: {
              trigger: footballWord,
              start: "left end",
              end: "right center",
              scrub: 2.5,
              //   markers: true,
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      // ---------- AIRPLANE IMAGE - MOVES DIAGONALLY WITH SCROLL ----------
      const travellingWord = document.querySelector(".travelling");
      const travellingSpan = document.querySelector(
        ".travelling .travelling-part",
      );
      const mountainSpan = document.querySelector(".travelling .mountain-part");
      const airplaneImg = document.querySelector(".airplane-img");

      if (travellingSpan && mountainSpan && travellingWord && airplaneImg) {
        // Remove background
        gsap.set(travellingWord, { backgroundColor: "transparent" });

        // Split ONLY "travelling" into characters
        const split = new SplitText(travellingSpan, { type: "chars" });
        const chars = split.chars;

        // Reset any existing transforms
        gsap.set(chars, {
          y: -150,
          x: 100,
          opacity: 0,
          scale: 0.7,
          rotation: 20,
          transformOrigin: "center center",
        });

        // Character by character reveal - ONLY for travelling word
        gsap.to(chars, {
          y: 0,
          x: 0,
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.8,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: travellingWord,
            start: "left center",
            once: true,
          },
        });

        // Simple fade in for mountain (no character split)
        gsap.from(mountainSpan, {
          opacity: 0,
          x: 50,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: travellingWord,
            start: "left center",
            once: true,
          },
        });

        // AIRPLANE - SLOW TAKEOFF TILT animation
        gsap.fromTo(
          airplaneImg,
          {
            x: -600,
            y: 120,
            rotation: -20, // Nose down for takeoff
            opacity: 0,
            scale: 0.4,
          },
          {
            x: 600,
            y: -200, // Gradual climb
            rotation: 30, // Nose up during ascent
            opacity: 1,
            scale: 2,
            duration: 8, // Much slower
            ease: "sine.inOut", // Smoother, slower easing
            scrollTrigger: {
              trigger: travellingWord,
              start: "left -50%",
              end: "right 50%",
              scrub: 3, // Slower scrub
              toggleActions: "play none none reverse",
            },
          },
        );

        // Additional gentle tilt variation during flight - slower
        gsap.to(airplaneImg, {
          rotation: 20,
          duration: 2,
          ease: "sine.inOut",
          scrollTrigger: {
            trigger: travellingWord,
            start: "left -20%",
            end: "right 30%",
            scrub: 2,
            toggleActions: "play none none reverse",
          },
        });

        // Subtle wing wobble for realism - very slow
        gsap.to(airplaneImg, {
          rotationZ: "+=2",
          rotationX: "+=1",
          repeat: -1,
          yoyo: true,
          duration: 3,
          ease: "sine.inOut",
          scrollTrigger: {
            trigger: travellingWord,
            start: "left center",
            end: "right center",
            scrub: 1,
          },
        });
      }

      // ---------- READING - UNIQUE FADE-IN BOOK ANIMATION ----------
      // ---------- READING - UNIQUE FADE-IN BOOK ANIMATION ----------
      const bookWord = document.querySelector(".book");
      const readingSpan = document.querySelector(".book .reading-part");
      const bookSpan = document.querySelector(".book .book-part");

      if (readingSpan && bookSpan && bookWord) {
        // Style the reading part
        gsap.set(readingSpan, {
          fontStyle: "italic",
          textShadow: "3px 3px 0 rgba(0,0,0,0.2)",
        });

        // CREATE and ANIMATE book elements in a unique way
        // First, create book container and pages
        const bookContainer = document.createElement("span");
        bookContainer.className = "book-container relative inline-block ml-2";
        bookContainer.style.position = "relative";
        bookContainer.style.display = "inline-block";
        bookContainer.style.width = "auto";
        bookContainer.style.minWidth = "80px";

        // Move the book-part text into our container - fix TypeScript error by casting
        if (bookSpan.parentNode) {
          bookSpan.parentNode.insertBefore(bookContainer, bookSpan);
          bookContainer.appendChild(bookSpan);
        }

        // Cast bookSpan to HTMLElement to access style properties
        const bookSpanElement = bookSpan as HTMLElement;

        // Create book cover effect
        const bookCover = document.createElement("span");
        bookCover.className = "book-cover absolute inset-0";
        bookCover.style.position = "absolute";
        bookCover.style.top = "0";
        bookCover.style.left = "0";
        bookCover.style.width = "100%";
        bookCover.style.height = "100%";
        bookCover.style.backgroundColor = "#8B5CF6";
        bookCover.style.borderRadius = "4px 12px 12px 4px";
        bookCover.style.boxShadow = "4px 4px 10px rgba(0,0,0,0.3)";
        bookCover.style.zIndex = "5";
        bookCover.style.border = "2px solid #6D28D9";
        bookCover.style.borderLeft = "6px solid #5B21B6";
        bookContainer.appendChild(bookCover);

        // Create book pages (multiple layers for depth)
        for (let i = 0; i < 3; i++) {
          const page = document.createElement("span");
          page.className = `book-page page-${i + 1}`;
          page.style.position = "absolute";
          page.style.top = `${2 + i * 2}px`;
          page.style.left = `${6 + i * 3}px`;
          page.style.width = "96%";
          page.style.height = "92%";
          page.style.backgroundColor =
            i === 2 ? "#FEF9C3" : i === 1 ? "#FEF08A" : "#FDE047";
          page.style.borderRadius = "0 8px 8px 0";
          page.style.boxShadow = "2px 2px 5px rgba(0,0,0,0.1)";
          page.style.zIndex = `${4 - i}`;
          bookContainer.appendChild(page);
        }

        // Create bookmark ribbon
        const bookmark = document.createElement("span");
        bookmark.className = "bookmark";
        bookmark.style.position = "absolute";
        bookmark.style.top = "10px";
        bookmark.style.right = "-8px";
        bookmark.style.width = "4px";
        bookmark.style.height = "30px";
        bookmark.style.backgroundColor = "#F43F5E";
        bookmark.style.borderRadius = "2px";
        bookmark.style.boxShadow = "2px 2px 5px rgba(0,0,0,0.2)";
        bookmark.style.zIndex = "10";
        bookmark.style.transform = "rotate(5deg)";
        bookContainer.appendChild(bookmark);

        // Create reading glasses icon
        const glasses = document.createElement("span");
        glasses.className = "reading-glasses";
        glasses.innerHTML = "👓";
        glasses.style.position = "absolute";
        glasses.style.top = "-20px";
        glasses.style.right = "-10px";
        glasses.style.fontSize = "24px";
        glasses.style.transform = "rotate(-10deg)";
        glasses.style.zIndex = "15";
        glasses.style.opacity = "0";
        bookContainer.appendChild(glasses);

        // Style the book text - now using casted element
        bookSpanElement.style.position = "relative";
        bookSpanElement.style.zIndex = "20";
        bookSpanElement.style.color = "white";
        bookSpanElement.style.fontWeight = "bold";
        bookSpanElement.style.padding = "0 12px";
        bookSpanElement.style.textShadow = "2px 2px 4px rgba(0,0,0,0.5)";

        // INITIAL STATE - All elements hidden with fade properties
        gsap.set(
          [
            bookCover,
            ...document.querySelectorAll(".book-page"),
            bookmark,
            bookSpanElement,
          ],
          {
            opacity: 0,
            scale: 0.8,
            filter: "blur(8px)",
          },
        );

        gsap.set(glasses, {
          opacity: 0,
          scale: 0.5,
          rotation: -20,
        });

        // UNIQUE FADE-IN SEQUENCE
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: bookWord,
            start: "left center",
            once: true,
          },
        });

        // 1. First, the book cover fades in with blur
        tl.to(bookCover, {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power2.out",
        })
          // 2. Pages fade in sequentially
          .to(
            document.querySelectorAll(".book-page"),
            {
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              duration: 0.6,
              stagger: 0.15,
              ease: "power2.out",
            },
            "-=0.4",
          )
          // 3. Bookmark slides in from top
          .fromTo(
            bookmark,
            { y: -20, opacity: 0, rotation: 15 },
            {
              y: 0,
              opacity: 1,
              rotation: 5,
              duration: 0.5,
              ease: "back.out(1.2)",
            },
            "-=0.3",
          )
          // 4. Book text fades in with a pop
          .to(
            bookSpanElement,
            {
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              duration: 0.7,
              ease: "elastic.out(1, 0.4)",
            },
            "-=0.2",
          )
          // 5. Glasses pop in with bounce
          .to(
            glasses,
            {
              opacity: 1,
              scale: 1,
              rotation: -10,
              duration: 0.6,
              ease: "back.out(1.7)",
            },
            "-=0.2",
          )
          // 6. Add gentle floating animation to the book
          .to(
            bookContainer,
            {
              y: -5,
              duration: 1.5,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            },
            "+=0.3",
          );

        // Add sparkle effects around the book
        for (let i = 0; i < 8; i++) {
          const sparkle = document.createElement("span");
          sparkle.innerHTML = "✨";
          sparkle.style.position = "absolute";
          sparkle.style.fontSize = "16px";
          sparkle.style.opacity = "0";
          sparkle.style.left = `${Math.random() * 100}%`;
          sparkle.style.top = `${Math.random() * 100}%`;
          sparkle.style.transform = "scale(0)";
          sparkle.style.zIndex = "25";
          sparkle.style.pointerEvents = "none";
          bookContainer.appendChild(sparkle);

          gsap.to(sparkle, {
            opacity: 0.8,
            scale: 1,
            duration: 0.4,
            delay: 0.8 + i * 0.1,
            y: -20,
            x: i % 2 === 0 ? 15 : -15,
            rotation: 45,
            repeat: 2,
            yoyo: true,
            ease: "power1.inOut",
            scrollTrigger: {
              trigger: bookWord,
              start: "left center",
              once: true,
            },
          });

          gsap.to(sparkle, {
            opacity: 0,
            scale: 0,
            duration: 0.3,
            delay: 1.6 + i * 0.1,
            scrollTrigger: {
              trigger: bookWord,
              start: "left center",
              once: true,
            },
          });
        }
      }

      // ---------- DRAWING (sketch tilted) ----------
      const drawingWord = document.querySelector(".drawing");
      const drawingSpan = document.querySelector(".drawing .drawing-part");
      const sketchSpan = document.querySelector(".drawing .sketch-part");

      if (drawingSpan && sketchSpan && drawingWord) {
        gsap.set(drawingSpan, {
          backgroundColor: "#f59e0b",
          padding: "0.25rem 0.75rem",
          borderRadius: "0.375rem",
          color: "black",
        });

        gsap.from(sketchSpan, {
          scale: 0,
          rotationX: 45,
          opacity: 0,
          duration: 1.6,
          ease: "elastic.out(1, 0.4)",
          scrollTrigger: {
            trigger: drawingWord,
            start: "left center",
            once: true,
          },
        });
      }

      
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {" "}
      <section
        ref={sectionRef}
        className="hidden lg:block w-full h-screen bg-black text-white overflow-hidden relative"
      >
        <div className="horizontal-wrapper flex w-[200vw] h-full items-center px-32 relative">
          <div className="flex gap-12 text-7xl lg:text-8xl font-black whitespace-nowrap items-center relative">
            <span className="word">My</span>
            <span className="word bg-white text-black px-6 py-3 rounded-2xl shadow-lg">
              Hobbies
            </span>
            <span className="word">is</span>
            <span className="word">to</span>

            {/* FOOTBALL */}
            <span className="word football relative flex items-center gap-4">
              <span className="playing-part">playing</span>
              <span className="football-part">Football</span>
              <div className="absolute top-full mt-6 left-0">
                <img
                  src="/images/hobbies/football.png"
                  className="football-img w-28"
                />
              </div>
            </span>

            {/* TRAVELLING (no bg) */}
            <span className="word travelling relative flex items-center gap-4 px-3 py-1">
              <span className="travelling-part">travelling </span>
              <span className="mountain-part">mountain</span>
              <div className="absolute top-full mt-6 left-0">
                <img
                  src="/images/hobbies/airplane.png"
                  className="airplane-img w-28"
                />
              </div>
            </span>

            {/* READING (no images) */}
            <span className="word book relative flex items-center gap-4">
              <span className="reading-part">reading </span>
              <span className="book-part">book</span>
            </span>

            {/* DRAWING (no images) */}
            <span className="word drawing relative flex items-center gap-4 text-black px-6 py-3 rounded-2xl shadow-lg">
              <span className="drawing-part  bg-yellow-400 p-10">drawing</span>
              <span className="sketch-part relative bg-green-500 text-2xl rotate-12 translate-y-20 -top-[150px] -left-[80px] px-6 py-3 rounded-2xl shadow-xl inline-block">
                sketch
              </span>
            </span>
          </div>

          {/* Circle - transforms into a RING (border thickness = 10px, outer radius = inner radius + 10px) */}
          <div className="circle absolute left-1/2 top-1/4 w-40 h-40 -translate-x-5/2 -translate-y-1/2 rounded-full z-20"></div>
        </div>
      </section>
      {/* Mobile Version */}
      <MobileHobbiesSection />
    </>
  );
}
