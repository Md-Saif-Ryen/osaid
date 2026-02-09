import Image from "next/image";
import { ReactNode } from "react";

interface TornFrameProps {
  children?: ReactNode;
}

export default function TornFrame({ children }: TornFrameProps) {
  return (
    <div className="relative w-full min-h-screen bg-black flex items-center justify-center overflow-hidden">
      {/* Torn frame image */}
      <Image
        src="/images/watermark.png"
        alt="Torn paper frame"
        fill
        priority
        className="object-cover pointer-events-none select-none"
      />

      {/* Content inside torn area */}
      <div className="relative z-10 w-[85%] h-[70%] flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
