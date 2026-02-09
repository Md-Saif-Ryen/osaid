export default function AbstractBanner() {
  return (
    <div className="w-full">
      <div className="w-full overflow-hidden rounded-[28px]">
        <svg
          viewBox="0 0 1600 260"
          preserveAspectRatio="none"
          className="w-full h-[140px] sm:h-[180px] md:h-[220px]"
        >
          {/* Base Background */}
          <rect width="1600" height="260" fill="#FBF3EA" />

          {/* LEFT TOP – Mint Shape */}
          <path
            d="M0,0 
               C260,40 260,220 80,260 
               L0,260 Z"
            fill="#BFE6DF"
          />

          {/* Mint White Stroke */}
          <path
            d="M120,0 
               C70,90 140,170 100,260"
            fill="none"
            stroke="white"
            strokeWidth="6"
            opacity="0.85"
          />

          {/* RIGHT BOTTOM – Yellow CURVED Shape */}
          <path
            d="M1600,210
               C1380,230 1220,170 1120,120
               C1040,80 960,120 900,170
               L900,260 Z"
            fill="#FBF1A9"
          />

          {/* Yellow White Stroke */}
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
    </div>
  );
}
