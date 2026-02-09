"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";

const NAV_ITEMS = [
  { label: "Educational", href: "/educational" },
  { label: "Skills", href: "/skills" },
  { label: "Projects", href: "/project" },
  { label: "Experience", href: "/experience" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const navRef = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<HTMLLIElement[]>([]);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const menuItemsRef = useRef<HTMLLIElement[]>([]);
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);

  /* ---------------- INITIAL LOAD ANIMATION ---------------- */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(itemsRef.current, {
        opacity: 0,
        x: -10,
        stagger: 0.1,
        duration: 0.6,
        ease: "back.out(1.2)",
        delay: 0.3,
      });
    });

    return () => ctx.revert();
  }, []);

  /* ---------------- HAMBURGER ICON ANIMATION ---------------- */
  useEffect(() => {
    if (!hamburgerRef.current) return;

    const topLine = hamburgerRef.current.querySelector(".line-top");
    const middleLine = hamburgerRef.current.querySelector(".line-middle");
    const bottomLine = hamburgerRef.current.querySelector(".line-bottom");

    if (!topLine || !middleLine || !bottomLine) return;

    if (open) {
      // Transform to X
      gsap.to(topLine, {
        y: 6,
        rotate: 45,
        duration: 0.3,
        ease: "power2.inOut",
      });
      gsap.to(middleLine, {
        opacity: 0,
        duration: 0.2,
      });
      gsap.to(bottomLine, {
        y: -6,
        rotate: -45,
        duration: 0.3,
        ease: "power2.inOut",
      });
    } else {
      // Transform back to hamburger
      gsap.to(topLine, {
        y: 0,
        rotate: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });
      gsap.to(middleLine, {
        opacity: 1,
        duration: 0.3,
        delay: 0.1,
      });
      gsap.to(bottomLine, {
        y: 0,
        rotate: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });
    }
  }, [open]);

  /* ---------------- MOBILE MENU ANIMATION ---------------- */
  useEffect(() => {
    if (!mobileMenuRef.current || isAnimating) return;

    const menuItems = mobileMenuRef.current.querySelectorAll("li");
    menuItemsRef.current = Array.from(menuItems) as HTMLLIElement[];

    setIsAnimating(true);

    if (open) {
      // Open animation
      gsap.fromTo(
        mobileMenuRef.current,
        {
          opacity: 0,
          y: -20,
          scaleY: 0,
          transformOrigin: "top center",
        },
        {
          opacity: 1,
          y: 0,
          scaleY: 1,
          duration: 0.5,
          ease: "power3.out",
          onComplete: () => {
            // Animate menu items
            gsap.fromTo(
              menuItemsRef.current,
              {
                x: -30,
                opacity: 0,
              },
              {
                x: 0,
                opacity: 1,
                stagger: 0.08,
                duration: 0.4,
                ease: "back.out(1.2)",
                onComplete: () => setIsAnimating(false),
              },
            );
          },
        },
      );
    } else {
      // Close animation
      gsap.to(menuItemsRef.current, {
        x: -30,
        opacity: 0,
        stagger: 0.05,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          gsap.to(mobileMenuRef.current, {
            opacity: 0,
            y: -20,
            scaleY: 0,
            duration: 0.4,
            ease: "power3.in",
            onComplete: () => setIsAnimating(false),
          });
        },
      });
    }
  }, [open]);

  // Close mobile menu on route change
  useEffect(() => {
    if (open) {
      setOpen(false);
    }
  }, [pathname]);

  const toggleMenu = () => {
    if (!isAnimating) {
      setOpen(!open);
    }
  };

  return (
    <>
      <header ref={navRef} className=" w-full">
        {/* ================= FIXED HEIGHT BACKGROUND CONTAINER ================= */}
        <div className="absolute inset-0 z-0 h-[64px] md:h-[130px] overflow-hidden pointer-events-none">
          <svg
            viewBox="0 0 1600 260"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            <rect width="1600" height="260" fill="#FBF3EA" />

            {/* Mint shape */}
            <path d="M0,0 C260,40 260,220 80,260 L0,260 Z" fill="#BFE6DF" />
            <path
              d="M120,0 C70,90 140,170 100,260"
              fill="none"
              stroke="white"
              strokeWidth="6"
              opacity="0.85"
            />

            {/* Yellow bottom-right */}
            <path
              d="M1600,210
               C1380,230 1220,170 1120,120
               C1040,80 960,120 900,170
               L900,260 Z"
              fill="#FBF1A9"
            />
            <path
              d="M950,360
               C1320,200 1780,160 1840,450"
              fill="none"
              stroke="white"
              strokeWidth="6"
              opacity="0.85"
            />
          </svg>
        </div>

        {/* ================= CONTENT WITH FIXED HEIGHT ================= */}
        <div className="relative h-[64px] md:h-[130px] px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <div className="flex flex-col leading-tight z-10">
            <span className="text-xs tracking-widest text-black/70">
              HI, I'M
            </span>
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-b from-red-600 to-black bg-clip-text text-transparent">
              S M Osaid Rizvi
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:block">
            <ul className="flex gap-4 lg:gap-6">
              {NAV_ITEMS.map((item, i) => {
                const active = pathname === item.href;
                return (
                  <li
                    key={item.href}
                    ref={(el) => {
                      if (el) itemsRef.current[i] = el;
                    }}
                  >
                    <Link
                      href={item.href}
                      className={`relative px-4 font-semibold text-sm lg:text-base rounded-lg transition-all duration-300
                      ${
                        active
                          ? "text-black"
                          : "text-black/70 hover:text-black hover:bg-white/20"
                      }
                      after:absolute after:left-1/2 after:-bottom-1 
                      after:h-[2px] after:bg-black after:transition-all after:duration-300
                      after:-translate-x-1/2
                      ${
                        active ? "after:w-3/4" : "after:w-0 hover:after:w-3/4"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            ref={hamburgerRef}
            onClick={toggleMenu}
            className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center z-50"
            aria-label="Toggle menu"
            disabled={isAnimating}
          >
            {/* Hamburger Lines */}
            <div className="line-top w-6 h-0.5 bg-black mb-1.5 transition-all"></div>
            <div className="line-middle w-6 h-0.5 bg-black mb-1.5 transition-all"></div>
            <div className="line-bottom w-6 h-0.5 bg-black transition-all"></div>

            {/* Pulsing Circle Effect */}
            <div
              className={`absolute inset-0 rounded-full border-2 border-black/20 transition-all duration-300 ${
                open ? "scale-100 opacity-100" : "scale-0 opacity-0"
              }`}
            ></div>
          </button>
        </div>
      </header>
      {/* ================= MOBILE MENU ================= */}
      <div
        ref={mobileMenuRef}
        className={`md:hidden fixed z-[9999] top-[64px] left-0 w-full bg-white/90 backdrop-blur-lg shadow-xl overflow-hidden ${
          !open ? "pointer-events-none" : ""
        }`}
        style={{
          opacity: 0,
          transform: "scaleY(0) translateY(-12px)",
          transformOrigin: "top center",
        }}
      >
        <ul className="py-2">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;

            return (
              <li
                key={item.href}
                className="border-b border-gray-100 last:border-b-0"
              >
                <Link
                  href={item.href}
                  onClick={() => !isAnimating && setOpen(false)}
                  className={`
              relative flex items-center px-7 py-4 text-[15px] font-medium
              transition-all duration-200
              ${
                active
                  ? "text-gray-900 bg-gray-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }
            `}
                >
                  {/* Left indicator */}
                  <span
                    className={`
                absolute left-0 top-0 h-full w-[3px] bg-red-600
                transition-opacity duration-200
                ${active ? "opacity-100" : "opacity-0"}
              `}
                  />

                  <span className="pl-3">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Footer action */}
        <div className="px-6 py-4 border-t border-gray-200 bg-white">
          <button
            onClick={() => !isAnimating && setOpen(false)}
            className="
        w-full py-3 rounded-lg text-sm font-medium
        text-gray-700 border border-gray-300
        hover:bg-gray-100 transition-colors duration-200
      "
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
}
