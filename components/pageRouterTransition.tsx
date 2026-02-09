// PageTransitionRouter.tsx
"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const BLOCK_SIZE = 60;

export default function PageTransitionRouter({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const gridRef = useRef<HTMLDivElement | null>(null);
  const blocksRef = useRef<HTMLDivElement[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const buildGrid = () => {
    if (!gridRef.current) return;

    const el = gridRef.current;
    el.innerHTML = "";
    blocksRef.current = [];

    const cols = Math.ceil(window.innerWidth / BLOCK_SIZE);
    const rows = Math.ceil(window.innerHeight / BLOCK_SIZE);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const block = document.createElement("div");
        block.className = "transition-block bg-black";
        block.style.cssText = `
          position: absolute;
          width: ${BLOCK_SIZE}px;
          height: ${BLOCK_SIZE}px;
          left: ${c * BLOCK_SIZE}px;
          top: ${r * BLOCK_SIZE}px;
          opacity: 0;
          transform: scale(0.8);
        `;
        el.appendChild(block);
        blocksRef.current.push(block);
      }
    }
  };

  useEffect(() => {
    buildGrid();
    window.addEventListener("resize", buildGrid);

    return () => {
      window.removeEventListener("resize", buildGrid);
    };
  }, []);

  useEffect(() => {
    const animatePageTransition = async () => {
      if (!blocksRef.current.length || isAnimating) return;

      setIsAnimating(true);

      // Step 1: Blocks को show करें (page छुपाएं)
      await gsap.to(blocksRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        stagger: {
          amount: 0.5,
          from: "random",
        },
        ease: "power2.inOut",
      });

      // थोड़ी देर रुकें (transition effect के लिए)
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Step 2: Blocks को hide करें (नया page दिखाएं)
      gsap.to(blocksRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        stagger: {
          amount: 0.5,
          from: "random",
        },
        ease: "power2.inOut",
        onComplete: () => {
          setIsAnimating(false);
        },
      });
    };

    // Initial load पर animation न चलाएं

    animatePageTransition();
  }, [pathname]);

  return (
    <>
      {/* Transition Grid */}
      <div
        ref={gridRef}
        className="fixed inset-0 z-[9999] pointer-events-none"
      />

      {/* Main Content */}

      {children}
    </>
  );
}
