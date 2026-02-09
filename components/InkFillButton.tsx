"use client";

import { useRef, useEffect, ReactNode } from "react";
import gsap from "gsap";

interface WaveButtonProps {
  text?: string;
  onClick?: () => void;
  animationType?: 1 | 2 | 3 | 4 | 5;
  children?: ReactNode;
  className?: string;
  waveColor?: string;
  textColor?: string;
  hoverTextColor?: string;
}

interface AnimationConfig {
  enter: () => void;
  leave: () => void;
  wavePath?: string;
  setup?: () => void;
}

export default function PremiumWaveButton({
  text = "About Me",
  onClick = () => console.log("Button clicked"),
  animationType = 1,
  children,
  className = "",
  waveColor = "black",
  textColor = "black",
  hoverTextColor = "white",
}: WaveButtonProps) {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const waveRef = useRef<HTMLDivElement | null>(null);
  const btnTextRef = useRef<HTMLSpanElement | null>(null);
  const rippleContainerRef = useRef<HTMLDivElement | null>(null);

  // Helper function to safely animate elements
  const safeAnimate = (
    element: Element | null | undefined,
    animation: gsap.TweenVars
  ) => {
    if (element) {
      gsap.to(element, animation);
    }
  };

  // Premium Animation Configurations
  const animationConfigs: Record<1 | 2 | 3 | 4 | 5, AnimationConfig> = {
    1: {
      // Liquid Mercury Effect
      enter: () => {
        if (!waveRef.current || !btnRef.current || !btnTextRef.current) return;

        // Main wave animation
        gsap.to(waveRef.current, {
          y: "0%",
          duration: 1.2,
          ease: "elastic.out(1, 0.5)",
        });

        // Text color change with delay
        gsap.to(btnTextRef.current, {
          color: hoverTextColor,
          duration: 0.8,
          delay: 0.3,
        });

        // Subtle scale animation
        gsap.to(waveRef.current, {
          scale: 1.05,
          duration: 0.4,
          yoyo: true,
          repeat: 1,
          ease: "sine.inOut",
        });

        // Add shimmer effect
        gsap.to(waveRef.current, {
          background: `linear-gradient(90deg, transparent, ${waveColor}40, transparent)`,
          backgroundPosition: "200% 0",
          duration: 1.5,
          ease: "none",
          repeat: -1,
        });
      },
      leave: () => {
        if (!waveRef.current || !btnRef.current || !btnTextRef.current) return;

        // Slow retreat with overshoot
        gsap.to(waveRef.current, {
          y: "110%",
          duration: 1,
          ease: "back.in(1.2)",
        });

        // Text fade back
        gsap.to(btnTextRef.current, {
          color: textColor,
          duration: 0.5,
          delay: 0.2,
        });

        // Reset shimmer
        gsap.to(waveRef.current, {
          background: waveColor,
          backgroundPosition: "0% 0",
          duration: 0.3,
        });
      },
      wavePath: "M0,100 C200,50 300,130 500,100 L500,200 L0,200 Z",
    },

    2: {
      // Magnetic Pull Effect
      setup: () => {
        if (!rippleContainerRef.current) return;
        // Create 8 ripple circles
        for (let i = 0; i < 8; i++) {
          const ripple = document.createElement("div");
          ripple.className = "ripple-circle";
          ripple.style.cssText = `
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            border: 2px solid ${waveColor};
            opacity: 0;
            transform: scale(0);
          `;
          rippleContainerRef.current.appendChild(ripple);
        }
      },
      enter: () => {
        if (!waveRef.current || !btnRef.current || !btnTextRef.current) return;

        // Wave comes in from center
        gsap.to(waveRef.current, {
          scale: 1,
          y: "0%",
          duration: 0.8,
          ease: "power3.out",
        });

        // Ripple effect from center
        const ripples = rippleContainerRef.current?.children;
        if (ripples) {
          Array.from(ripples).forEach((ripple, i) => {
            gsap.to(ripple, {
              scale: 1.5,
              opacity: 0.3,
              duration: 1.2,
              delay: i * 0.15,
              ease: "power2.out",
              onComplete: () => {
                gsap.to(ripple, {
                  scale: 0,
                  opacity: 0,
                  duration: 0.5,
                });
              },
            });
          });
        }

        // Text animation with bounce
        gsap.fromTo(
          btnTextRef.current,
          { y: 10, opacity: 0.7 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
            color: hoverTextColor,
          }
        );

        // Button slight lift
        gsap.to(btnRef.current, {
          y: -3,
          duration: 0.4,
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        });
      },
      leave: () => {
        if (!waveRef.current || !btnRef.current || !btnTextRef.current) return;

        // Wave retreats to center
        gsap.to(waveRef.current, {
          scale: 0,
          y: "50%",
          duration: 0.7,
          ease: "power3.in",
        });

        // Button returns to position
        gsap.to(btnRef.current, {
          y: 0,
          duration: 0.5,
          boxShadow: "none",
        });

        // Text returns
        gsap.to(btnTextRef.current, {
          color: textColor,
          duration: 0.4,
        });
      },
      wavePath: "M0,100 C150,70 350,130 500,100 L500,200 L0,200 Z",
    },

    3: {
      // Ink Drop + Ripple
      enter: () => {
        if (!waveRef.current || !btnRef.current || !btnTextRef.current) return;

        // Initial drop effect
        gsap.fromTo(
          waveRef.current,
          { y: "-20%", scale: 0.5 },
          {
            y: "0%",
            scale: 1,
            duration: 0.6,
            ease: "bounce.out",
          }
        );

        // Ripple waves
        for (let i = 0; i < 3; i++) {
          const ripple = document.createElement("div");
          ripple.className = "ink-ripple";
          ripple.style.cssText = `
            position: absolute;
            inset: 0;
            border: 2px solid ${waveColor};
            border-radius: 50%;
            opacity: 0;
            transform: scale(0);
          `;
          waveRef.current.appendChild(ripple);

          gsap.to(ripple, {
            scale: 2,
            opacity: 0.4,
            duration: 1,
            delay: i * 0.2,
            ease: "power2.out",
            onComplete: () => ripple.remove(),
          });
        }

        // Text glow effect
        gsap.to(btnTextRef.current, {
          textShadow: `0 0 10px ${hoverTextColor}`,
          color: hoverTextColor,
          duration: 0.5,
        });

        // Button pulse
        gsap.to(btnRef.current, {
          scale: 1.02,
          duration: 0.3,
          yoyo: true,
          repeat: 1,
          ease: "sine.inOut",
        });
      },
      leave: () => {
        if (!waveRef.current || !btnRef.current || !btnTextRef.current) return;

        // Ink absorbs back
        gsap.to(waveRef.current, {
          y: "120%",
          scale: 0.8,
          duration: 0.8,
          ease: "power4.in",
        });

        // Text effect fades
        gsap.to(btnTextRef.current, {
          textShadow: "none",
          color: textColor,
          duration: 0.4,
        });
      },
      wavePath: "M0,120 C180,80 320,140 500,120 L500,200 L0,200 Z",
    },

    4: {
      // Neon Wave Glow
      enter: () => {
        if (!waveRef.current || !btnRef.current || !btnTextRef.current) return;

        // Wave enters with glow
        gsap.to(waveRef.current, {
          y: "0%",
          duration: 0.9,
          ease: "power4.out",
          onStart: () => {
            // Add glow filter
            if (waveRef.current) {
              waveRef.current.style.filter = `drop-shadow(0 0 20px ${waveColor})`;
            }
          },
        });

        // Text neon effect
        gsap.to(btnTextRef.current, {
          color: hoverTextColor,
          textShadow: `
            0 0 10px ${hoverTextColor},
            0 0 20px ${hoverTextColor},
            0 0 30px ${waveColor}
          `,
          duration: 0.6,
        });

        // Pulsing glow
        gsap.to(waveRef.current, {
          filter: `drop-shadow(0 0 25px ${waveColor})`,
          duration: 0.5,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });

        // Sparkle particles
        for (let i = 0; i < 15; i++) {
          const sparkle = document.createElement("div");
          sparkle.className = "sparkle";
          sparkle.style.cssText = `
            position: absolute;
            width: 3px;
            height: 3px;
            background: white;
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            opacity: 0;
          `;
          waveRef.current.appendChild(sparkle);

          gsap.to(sparkle, {
            x: (Math.random() - 0.5) * 50,
            y: (Math.random() - 0.5) * 50,
            opacity: 0.8,
            duration: 0.8,
            delay: Math.random() * 0.5,
            ease: "power2.out",
            onComplete: () => sparkle.remove(),
          });
        }
      },
      leave: () => {
        if (!waveRef.current || !btnRef.current || !btnTextRef.current) return;

        // Fade out with glow
        gsap.to(waveRef.current, {
          y: "100%",
          filter: "drop-shadow(0 0 0px transparent)",
          duration: 0.7,
          ease: "power4.in",
        });

        // Text glow fades
        gsap.to(btnTextRef.current, {
          color: textColor,
          textShadow: "none",
          duration: 0.4,
        });
      },
      wavePath: "M0,90 C200,40 300,140 500,90 L500,200 L0,200 Z",
    },

    5: {
      // Quantum Particle Effect
      enter: () => {
        if (!waveRef.current || !btnRef.current || !btnTextRef.current) return;

        // Wave forms from particles
        gsap.to(waveRef.current, {
          y: "0%",
          duration: 1.1,
          ease: "elastic.out(1.2, 0.5)",
        });

        // Create particle explosion
        const particleCount = 20;
        for (let i = 0; i < particleCount; i++) {
          const particle = document.createElement("div");
          particle.className = "quantum-particle";
          particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: ${waveColor};
            border-radius: 50%;
            top: 50%;
            left: 50%;
            opacity: 0;
          `;
          btnRef.current.appendChild(particle);

          gsap.to(particle, {
            x: (Math.random() - 0.5) * 100,
            y: (Math.random() - 0.5) * 50,
            opacity: 1,
            duration: 0.6,
            delay: Math.random() * 0.3,
            ease: "power2.out",
            onComplete: () => {
              gsap.to(particle, {
                x: 0,
                y: 0,
                opacity: 0,
                duration: 0.4,
                onComplete: () => particle.remove(),
              });
            },
          });
        }

        // Text quantum effect
        gsap.to(btnTextRef.current, {
          color: hoverTextColor,
          duration: 0.4,
          onStart: () => {
            // Add glitch effect
            gsap.to(btnTextRef.current, {
              x: () => Math.random() * 4 - 2,
              duration: 0.1,
              repeat: 5,
              yoyo: true,
            });
          },
        });

        // Wave wobble effect
        const wavePath = waveRef.current.querySelector("path");
        if (wavePath) {
          gsap.to(wavePath, {
            attr: { d: "M0,100 C150,60 350,140 500,100 L500,200 L0,200 Z" },
            duration: 0.2,
            repeat: 3,
            yoyo: true,
            ease: "sine.inOut",
          });
        }
      },
      leave: () => {
        if (!waveRef.current || !btnRef.current || !btnTextRef.current) return;

        // Wave dissolves into particles
        gsap.to(waveRef.current, {
          y: "100%",
          opacity: 0,
          duration: 0.8,
          ease: "power3.in",
        });

        // Reverse particles
        for (let i = 0; i < 10; i++) {
          const particle = document.createElement("div");
          particle.className = "reverse-particle";
          particle.style.cssText = `
            position: absolute;
            width: 3px;
            height: 3px;
            background: ${waveColor};
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            opacity: 0;
          `;
          btnRef.current.appendChild(particle);

          gsap.to(particle, {
            x: 0,
            y: 0,
            opacity: 0.7,
            duration: 0.5,
            ease: "power2.in",
            onComplete: () => particle.remove(),
          });
        }

        // Text returns
        gsap.to(btnTextRef.current, {
          color: textColor,
          duration: 0.3,
        });
      },
      wavePath: "M0,110 C200,70 300,150 500,110 L500,200 L0,200 Z",
    },
  };

  useEffect(() => {
    if (!btnRef.current || !waveRef.current) return;

    const config = animationConfigs[animationType];

    // Call setup if exists
    if (config.setup) config.setup();

    // Initialize wave position
    gsap.set(waveRef.current, { y: "100%" });

    const enter = config.enter;
    const leave = config.leave;

    const btn = btnRef.current;
    btn.addEventListener("mouseenter", enter);
    btn.addEventListener("mouseleave", leave);

    return () => {
      btn.removeEventListener("mouseenter", enter);
      btn.removeEventListener("mouseleave", leave);
      // Cleanup particles
      if (rippleContainerRef.current) {
        rippleContainerRef.current.innerHTML = "";
      }
    };
  }, [animationType]);

  const getWavePath = () => {
    const config = animationConfigs[animationType];
    return config.wavePath || "M0,80 C150,120 280,20 500,80 L500,150 L0,150 Z";
  };

  const renderWaveSVG = () => {
    const wavePath = getWavePath();

    return (
      <svg
        viewBox="0 0 500 200"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 w-full h-full"
      >
        <path d={wavePath} fill={waveColor} />
      </svg>
    );
  };

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      className={`
        relative overflow-hidden px-10 py-4 w-full
        border-2 border-gray-800 rounded-2xl font-bold
        transition-all duration-300 hover:shadow-2xl
        group active:scale-95
        ${className}
      `}
      style={{
        color: textColor,
        borderColor: waveColor,
        background: "transparent",
      }}
    >
      {/* Particle Container */}
      <div
        ref={rippleContainerRef}
        className="absolute inset-0 z-0 pointer-events-none"
      />

      {/* Wave Container */}
      <div
        ref={waveRef}
        className="absolute inset-0 z-1 overflow-hidden rounded-2xl"
      >
        {renderWaveSVG()}
      </div>

      {/* Text */}
      <span
        ref={btnTextRef}
        className="relative z-10 flex items-center justify-center gap-3 text-lg tracking-wide"
      >
        {children || text}

        {/* Optional arrow icon */}
        {!children && (
          <svg
            className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        )}
      </span>

      {/* Edge glow effect */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-white/30 transition-all duration-500 z-2" />
    </button>
  );
}
