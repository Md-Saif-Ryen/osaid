"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import RadialHomeMenu from "@/components/FloatingHomeMenu";

import { ScrollTrigger } from "gsap/ScrollTrigger";

const resumeData = [
  {
    id: 1,
    title: "Professional Resume",
    description: "Detailed experience, projects, skills and education",
    icon: "/images/resume/resume.png",
    file: "/documents/resume.pdf",
    gradient: "from-red-600 to-black",
    tags: ["Experience", "Projects", "Skills", "Education"],
  },
  {
    id: 2,
    title: "Executive CV",
    description: "Concise professional summary for quick review",
    icon: "/images/resume/cv.png",
    file: "/documents/cv.pdf",
    gradient: "from-red-600 to-black",
    tags: ["Summary", "Skills", "Contact"],
  },
];

export default function ResumeSection() {
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    ScrollTrigger.refresh(true);
  }, []);

  /* ================= GSAP ENTRANCE ================= */
  useEffect(() => {
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.2,
      },
    );
  }, []);

  const handleDownload = (file: string) => {
    const link = document.createElement("a");
    link.href = file;
    link.download = file.split("/").pop() || "document.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <RadialHomeMenu />{" "}
      <section className="min-h-screen bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className=" mx-auto">
          {/* ================= HEADER ================= */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
              My <span className="text-red-600">Documents</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Download my resume and CV for professional review
            </p>
          </motion.div>

          {/* ================= CARDS ================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8  mx-auto">
            {resumeData.map((item, index) => (
              <motion.div
                key={item.id}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
                whileHover={{ y: 8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-xl"
              >
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-r ${item.gradient}`}
                  >
                    <img
                      src={item.icon}
                      alt={item.title}
                      className="w-7 h-7 object-contain"
                    />
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-6 py-2">{item.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 py-2 mb-8">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-2 text-sm rounded-full bg-gray-100 text-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Download Button */}
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleDownload(item.file)}
                  className={`w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r ${item.gradient} flex items-center justify-center gap-2`}
                >
                  <span>Download</span>
                  <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: 6 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    ↓
                  </motion.span>
                </motion.button>
              </motion.div>
            ))}
          </div>

          {/* ================= FOOTER ================= */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-24 text-center border-t border-gray-200 pt-12"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Thank You
            </h2>
            <p className="text-gray-600 mb-6">
              Thanks for visiting my portfolio
            </p>

            <div className="flex justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gradient-to-r from-red-600 to-black hover:text-white"
              >
                Contact Me
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-5 py-2 rounded-lg bg-gradient-to-r from-red-600 to-black text-white"
              >
                View Portfolio
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
