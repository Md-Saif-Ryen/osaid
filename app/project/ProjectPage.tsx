"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { image } from "framer-motion/client";
import { encryptIndex } from "@/utils/crypto";
import FooterSection from "@/components/FooterSection";
import RadialHomeMenu from "@/components/FloatingHomeMenu";
import { useEffect } from "react";

import { ScrollTrigger } from "gsap/ScrollTrigger";

const projectData = [
  {
    id: 1,
    title: "Microbial Fuel Cells for Sustainable Energy",
    bulletPoint: "Research | Industry | Marketing",
    cardBg: "bg-red-100",
    titleColor:
      "bg-gradient-to-b from-red-500 to-black bg-clip-text text-transparent font-bold",
    image: "/images/project-1.png",

    description:
      "Designed and optimized a single-chamber microbial fuel cell using organic waste to enable simultaneous wastewater treatment and bioelectricity generation. The simplified system improved power output, reduced internal resistance, and demonstrated potential for low-cost, decentralized bioenergy solutions...",
  },
  {
    id: 2,
    title: "Biodegradable Laboratory Gloves from Agro-Waste",
    bulletPoint: "Research | Industry | Marketing",
    cardBg: "bg-green-100",
    image: "/images/project-2.png",

    titleColor:
      "bg-gradient-to-b from-green-500 to-black bg-clip-text text-transparent font-bold",
    description:
      "Developed eco-friendly, biodegradable laboratory gloves using apple peel, corn peel, and sago-based biopolymers. The work emphasizes waste valorization, green chemistry, and sustainable lab practices while achieving functional strength and rapid biodegradation as an alternative to single-use plastic gloves...",
  },
  {
    id: 3,
    title: "Hydroxyapatite Nanoparticles for Alzheimer’s Therapy",
    bulletPoint: "Literature Review | Research Analysis | Critical Evaluation",
    cardBg: "bg-purple-100",
    image: "/images/project-3.png",

    titleColor:
      "bg-gradient-to-b from-purple-500 to-black bg-clip-text text-transparent font-bold",
    description:
      "Studied hydroxyapatite (HAp) nanoparticles as targeted drug delivery systems for Alzheimer’s disease, focusing on BBB penetration, controlled drug release, and reduced systemic toxicity. This approach supports precise delivery of anti-amyloid, anti-tau, and neuroprotective therapies while addressing key translational challenges...",
  },
  {
    id: 4,
    title: "Myocardial Infarction (MI) Diagnosis",
    bulletPoint: "Literature Review | Research Analysis | Critical Evaluation",
    cardBg: "bg-yellow-100",
    titleColor:
      "bg-gradient-to-b from-yellow-500 to-black bg-clip-text text-transparent font-bold",
    image: "/images/project-4.png",

    description:
      "Explored advanced MI diagnostic strategies by integrating emerging cardiac biomarkers with real-time biosensor technology. This approach enhances diagnostic accuracy, enables continuous monitoring, and supports timely, personalized clinical interventions—advancing modern cardiovascular care...",
  },
];

export default function ProjectPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    ScrollTrigger.refresh(true);
  }, []);

  return (
 <>
 <RadialHomeMenu />
    <main className="min-h-screen bg-white px-2">
      {projectData.map((project, index) => {
        const isEven = index % 2 === 0;

        return (
          <Link
            key={index}
            href={{
              pathname: `/project/${project.title
                .toLowerCase()
                .replace(/ /g, "-")
                .replace(/[^\w-]+/g, "")}`,
              query: { ref: encryptIndex(index) },
            }}
            className="block pb-2"
          >
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              variants={{
                hidden: {
                  opacity: 0,
                  x: isEven ? 120 : -120,
                  scale: 0.96,
                },
                visible: {
                  opacity: 1,
                  x: 0,
                  scale: 1,
                  transition: {
                    duration: 0.7,
                    ease: "easeOut",
                    staggerChildren: 0.12,
                  },
                },
              }}
              whileHover={{
                y: -6,
                boxShadow: "0px 25px 60px rgba(0,0,0,0.15)",
                transition: { duration: 0.3 },
              }}
              className={`
                w-full min-h-[320px]
                flex flex-col md:flex-row
                ${!isEven ? "md:flex-row" : "md:flex-row-reverse"}
                ${project.cardBg}
                shadow-lg
                overflow-hidden
                cursor-pointer
                transition-transform
              `}
            >
              {/* IMAGE */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, scale: 0.85 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.6, ease: "easeOut" },
                  },
                }}
                whileHover={{ scale: 1.05 }}
                className="flex md:flex-[3] items-center justify-center p-6"
              >
                <div className="w-56 h-56 md:w-64 md:h-64 border-2 border-white rounded-lg overflow-hidden">
                  <Image
                    src={project.image}
                    alt="Project Image"
                    width={256}
                    height={256}
                    className="object-contain w-full h-full"
                  />
                </div>
              </motion.div>

              {/* TEXT */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: "easeOut" },
                  },
                }}
                className={`
                  flex flex-col md:flex-[8] justify-center p-6
                  ${isEven ? "md:text-left" : "md:text-right"}
                `}
              >
                <motion.h2
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className={`text-3xl md:text-4xl ${project.titleColor}`}
                >
                  {project.title}
                </motion.h2>

                <motion.p
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 },
                  }}
                  className="text-lg italic text-gray-500 mt-2 pb-10"
                >
                  {project.bulletPoint}
                </motion.p>

                <motion.p
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 },
                  }}
                  className="text-base md:text-lg font-semibold text-black mt-4"
                >
                  {project.description}
                  <span className="ml-1 font-bold text-gray-500">more</span>
                </motion.p>
              </motion.div>
            </motion.div>
          </Link>
        );
      })}
    </main>
    <FooterSection />
    </>
  );
}

