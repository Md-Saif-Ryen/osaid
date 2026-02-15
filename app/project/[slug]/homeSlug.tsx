"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { decryptIndex } from "@/utils/crypto";
import FooterSection from "@/components/FooterSection";
import RadialHomeMenu from "@/components/FloatingHomeMenu";

gsap.registerPlugin(ScrollTrigger);

const projectData = [
  {
    title: "Microbial Fuel Cells for Sustainable Energy",
    bulletPoint: "Research | Industry | Marketing",

    id: 1,
    cardBg: "bg-red-200",
    titleColor:
      "bg-gradient-to-b from-red-700 to-black bg-clip-text text-transparent font-bold",
    image: "/images/project-1.png",
    description: `Microbial Fuel Cells (MFCs) represent an innovative bioelectrochemical technology that enables the simultaneous treatment of waste and generation of bioelectricity under sustainable conditions. This study focuses on the design and optimization of a single-chamber microbial fuel cell derived from a conventional double-chamber system, utilizing organic waste as the primary substrate.

The research aims to enhance power density while reducing system complexity, without compromising microbial efficiency in energy conversion. Organic waste acts as a cost-effective and renewable fuel source, supporting sustainable waste management practices.

Comparative analysis between double- and single-chamber configurations revealed significant improvements in internal resistance reduction, electrode performance, and overall power output. The findings demonstrate that single-chamber MFCs can efficiently convert biodegradable organic matter into electrical energy with a simplified design and lower operational costs.

This study highlights the potential of organic-waste-based single-chamber MFCs as an eco-friendly solution for decentralized energy generation and wastewater treatment, paving the way for scalable and sustainable bioenergy systems.`,
  },
  {
    title: "Biodegradable Laboratory Gloves from Agro-Waste",
    bulletPoint: "Research | Industry | Marketing",
    cardBg: "bg-green-200",
    id: 2,
    image: "/images/project-1.png",

    titleColor:
      "bg-gradient-to-b from-green-700 to-black bg-clip-text text-transparent font-bold",
    description: `With the growing concern over environmental pollution and plastic waste—particularly from single-use laboratory gloves—the need for sustainable and eco-conscious alternatives has become increasingly urgent. This research presents the formulation and development of biodegradable laboratory gloves as an environmentally friendly solution for laboratory practices.

The primary raw materials used include apple peel, corn peel, and sago, which are renewable, biodegradable, and rich in cellulose, starch, and pectin. These components contribute to the flexibility, strength, and biodegradability of the final product. The process involves collection and pre-treatment of agro-waste, drying and grinding into fine powder, and blending with sago starch as a natural binder. Glycerol is used as a plasticizer, vinegar or citric acid as a mild cross-linking agent, and natural antimicrobial additives enhance safety and durability.

The mixture is cast into molds and dried under controlled conditions to form glove-like films. The gloves are evaluated for tensile strength, elasticity, puncture resistance, moisture barrier capacity, and biodegradability under composting and soil burial conditions. Preliminary results indicate sufficient mechanical integrity for handling non-hazardous laboratory materials, with degradation initiating within weeks under composting conditions.

This project emphasizes waste valorisation and supports green chemistry principles, offering a sustainable alternative to petroleum-based laboratory gloves and reducing environmental impact.`,
  },

  {
    title: "Hydroxyapatite Nanoparticles for Alzheimer’s Therapy",
    bulletPoint: "Literature Review | Research Analysis | Critical Evaluation",
    cardBg: "bg-purple-200",
    image: "/images/project-2.png",
    id: 3,
    titleColor:
      "bg-gradient-to-b from-purple-700 to-black bg-clip-text text-transparent font-bold",
    description: `Hydroxyapatite (HAp) nanoparticles have emerged as promising drug delivery systems for Alzheimer’s Disease (AD) due to their biocompatibility, stability, and tunable surface properties. Their nanoscale size enables effective drug encapsulation and controlled release, while surface functionalization with ligands or antibodies allows targeted delivery across the blood–brain barrier (BBB) to amyloid-beta plaques and tau aggregates.

HAp nanoparticles can transport anti-amyloid, anti-tau, and neuroprotective drugs, improving therapeutic efficacy while minimizing systemic side effects. Studies suggest that these nanoparticles can cross the BBB via adsorptive-mediated and receptor-mediated transcytosis. Additional strategies such as surface charge modification and temporary tight-junction modulation further enhance permeability.

Drug loading can be achieved through co-precipitation, adsorption, or encapsulation methods, often enabling pH-responsive release in the acidic microenvironment of diseased neural tissue. Despite their potential, challenges remain regarding large-scale production, long-term stability, in vivo clearance, and neural safety. Addressing these limitations is essential for translating HAp nanoparticle-based therapies into clinical applications.`,
  },

  {
    title: "Myocardial Infarction (MI) Diagnosis",
    bulletPoint: "Literature Review | Research Analysis | Critical Evaluation",
    cardBg: "bg-yellow-200",
    id: 4,
    titleColor:
      "bg-gradient-to-b from-yellow-700 to-black bg-clip-text text-transparent font-bold",
    image: "/images/project-3.png",
    description: `Myocardial Infarction (MI), commonly known as a heart attack, represents a major global health challenge due to its high morbidity and mortality rates. Accurate and timely diagnosis is critical for effective intervention and improved patient outcomes. Conventional diagnostic tools such as electrocardiograms (ECGs) and cardiac biomarkers—including myoglobin, creatinine kinase (CK), and cardiac troponin (cTn)—have been widely used but are limited by sensitivity, specificity, and real-time monitoring capabilities.

To overcome these limitations, emerging biomarkers such as heart-type fatty acid binding protein (hTFABP) and matrix metalloproteinases are being explored to enhance diagnostic accuracy. The integration of multiple biomarkers into unified biosensor platforms provides a comprehensive approach to MI detection and management.

Real-time biosensors have revolutionized MI diagnosis by enabling continuous monitoring of biomarker levels, facilitating early detection and timely intervention. Multi-biomarker biosensor systems offer deeper insights into cardiac health and support personalized treatment strategies. These advancements represent a significant step forward in cardiovascular medicine, with the potential to transform clinical decision-making and improve patient care outcomes.`,
  },
];

export default function ProjectDetailPage() {
  const params = useSearchParams();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  const encrypted = params.get("ref");
  const index = decryptIndex(encrypted);

  const pinRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bulletRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    ScrollTrigger.refresh(true);
  }, []);

  // मोबाइल डिटेक्शन
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  if (
    index === null ||
    isNaN(index) ||
    index < 0 ||
    index >= projectData.length
  ) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center bg-black text-white px-4">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">Invalid Project</h1>
        <button
          onClick={() => router.push("/")}
          className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
        >
          Go Home
        </button>
      </div>
    );
  }

  const project = projectData[index];

  useLayoutEffect(() => {
    if (!containerRef.current || !pinRef.current) return;

    const ctx = gsap.context(() => {
      // Reset animations - original जैसा ही
      gsap.set([titleRef.current, bulletRef.current, descRef.current], {
        opacity: 0,
        y: 80, // Original value maintain
      });

      gsap.set(imageRef.current, {
        width: "100vw",
        height: isMobile ? "70vh" : "100vh", // Mobile के लिए थोड़ा adjust
        borderRadius: 0,
        objectFit: isMobile ? "cover" : "contain",
      });

      // ScrollTrigger settings - mobile/desktop के हिसाब से
      const scrollDistance = isMobile ? "+=150%" : "+=200%";
      const scrubValue = isMobile ? 1.8 : 2;
      // const pinSpacing = isMobile ? false : true; // Mobile पर pinSpacing disable करें

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: scrollDistance,
          scrub: scrubValue,
          pin: pinRef.current,
          pinSpacing: true,
          anticipatePin: 1,
          markers: false,
          invalidateOnRefresh: true, // यह important है responsive के लिए
        },
      });

      // Original animation logic maintain करते हुए mobile values
      const endWidth = isMobile ? "85vw" : "50vw";
      const endHeight = isMobile ? "60vh" : "40vw"; // Mobile पर vh use करें
      const borderRadius = isMobile ? "20px" : "24px";

      tl.to(imageRef.current, {
        width: endWidth,
        height: endHeight,

        borderRadius: borderRadius,
        ease: "power3.out",
      })
        .to(titleRef.current, { opacity: 1, y: 0 }, "-=0.2")
        .to(bulletRef.current, { opacity: 1, y: 0 }, "-=0.3")
        .to(descRef.current, { opacity: 1, y: 0 }, "-=0.3");
    }, containerRef);

    return () => {
      // Proper cleanup
      ScrollTrigger.getAll().forEach((st) => st.kill());
      ctx.revert();
    };
  }, [isMobile]);

  return (
    <>
      <RadialHomeMenu />
      <section
        ref={containerRef}
        className={`min-h-screen w-full overflow-hidden ${project.cardBg} pb-10 `}
      >
        <div ref={pinRef}>
          {/* HERO IMAGE SECTION */}
          <div className="flex-1 flex justify-center items-center min-h-[70vh] md:min-h-screen px-4">
            <img
              ref={imageRef}
              src={project.image}
              alt={project.title}
              className="object-contain w-full h-auto max-w-full"
              loading="eager"
            />
          </div>

          {/* CONTENT SECTION */}
          <div
            ref={contentWrapperRef}
            className="
    relative
    w-full
    flex justify-center
    px-4 md:px-6 lg:px-8
    py-8 md:py-12
  "
          >
            {/* CENTER CONTENT */}
            <div className="w-full max-w-5xl mx-auto text-center">
              <h1
                ref={titleRef}
                className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 ${project.titleColor}`}
              >
                {project.title}
              </h1>

              <p
                ref={bulletRef}
                className="italic text-gray-600 pb-5 pt-1 mb-6 md:mb-8 tracking-wider text-sm md:text-base"
              >
                {project.bulletPoint}
              </p>

              <div className="mt-6 md:mt-8 text-start">
                <p
                  ref={descRef}
                  className="text-gray-900 leading-relaxed text-sm md:text-base lg:text-lg mx-auto"
                  style={{ lineHeight: "1.75" }}
                >
                  {project.description.split("\n\n").map((para, idx) => (
                    <span key={idx}>
                      {para}
                      {idx < project.description.split("\n\n").length - 1 && (
                        <>
                          <br />
                          <br />
                        </>
                      )}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer को अलग सेक्शन में */}
      <div className="w-full bg-white">
        <FooterSection />
      </div>

      {/* Mobile navigation helper */}
      {isMobile && (
        <div className="fixed bottom-4 right-4">
          <button
            onClick={() => {
              if (contentWrapperRef.current) {
                contentWrapperRef.current.scrollIntoView({
                  behavior: "smooth",
                });
              }
            }}
            className="bg-black/80 text-white p-3 rounded-full shadow-lg hover:bg-black transition-colors"
            aria-label="Scroll to content"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
