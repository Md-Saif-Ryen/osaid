"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  FiCpu,
  FiActivity,
  FiTool,
  FiUsers,
  FiChevronDown,
  FiChevronUp,
  FiStar,
  FiAward,
  FiTarget,
  FiCheckCircle,
} from "react-icons/fi";
import { contentData } from "./skillcontent";

/* ---------------- PROFESSIONAL MOBILE/TABLET COMPONENT ---------------- */
export default function SkillContextMobile() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Technical");

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
    setActiveCategory(contentData[index]?.title.split(" ")[0] || "");
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.5,
      },
    },
    hover: {
      y: -4,
      transition: { duration: 0.2 },
    },
  };

  const iconVariants: Variants = {
    initial: { scale: 0, rotate: -180 },
    animate: (i: number) => ({
      scale: 1,
      rotate: 0,
      transition: {
        delay: i * 0.1 + 0.5,
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    }),
  };

  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const contentVariants: Variants = {
    collapsed: {
      height: 0,
      opacity: 0,
      transition: {
        height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
        opacity: { duration: 0.2 },
      },
    },
    expanded: {
      height: "auto",
      opacity: 1,
      transition: {
        height: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
        opacity: { duration: 0.3, delay: 0.1 },
      },
    },
  };

  const listItemVariants: Variants = {
    hidden: { opacity: 0, x: -5 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.03,
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const progressVariants: Variants = {
    hidden: { width: "0%" },
    visible: (i: number) => ({
      width: `${(i + 1) * 25}%`,
      transition: {
        delay: 1 + i * 0.1,
        duration: 1,
        ease: [0.4, 0, 0.2, 1],
      },
    }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100">
      {/* HEADER SECTION */}
      <section className="px-5 py-10 sm:px-6 sm:py-12 md:px-8 md:py-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          {/* Decorative element */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-64 bg-gradient-to-b from-red-50/30 to-transparent pointer-events-none" />

          <motion.div
            variants={titleVariants}
            className="relative z-10 text-center"
          >
            {/* Professional badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white rounded-full border border-gray-200 shadow-sm"
            >
              <FiAward className="text-red-600 w-4 h-4" />
              <span className="text-sm font-medium text-gray-700">
                Skills Portfolio
              </span>
            </motion.div>

            {/* Main heading with proper spacing */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
            >
              <span className="text-gray-900">Expertise & </span>
              <span className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
                Capabilities
              </span>
            </motion.h1>

            {/* Subtle divider */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "120px" }}
              transition={{ delay: 0.5, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              className="h-0.5 bg-gradient-to-r from-gray-300 to-gray-400 mx-auto mb-6 rounded-full"
            />

            {/* Description with proper line height and max width */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-8 px-4"
            >
              A comprehensive overview of technical proficiency, research
              capabilities, and professional competencies.
            </motion.p>
          </motion.div>

          {/* Progress indicator with better spacing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="max-w-md mx-auto px-4 mt-8"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">
                Skill Categories
              </span>
              <span className="text-sm font-semibold text-gray-800">
                {activeCategory}
              </span>
            </div>
            <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                variants={progressVariants}
                initial="hidden"
                animate="visible"
                custom={expandedIndex ?? 0}
                className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* MAIN CONTENT SECTION */}
      <section className="px-5 pb-16 sm:px-6 sm:pb-20 md:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="max-w-4xl mx-auto space-y-4"
        >
          {contentData.map((section, index) => (
            <motion.article
              key={index}
              variants={cardVariants}
              whileHover="hover"
              className={`
                relative rounded-xl
                bg-white
                border border-gray-200
                shadow-sm
                hover:shadow-md
                transition-all duration-300
                ${expandedIndex === index ? "ring-1 ring-red-200 shadow-md" : ""}
                overflow-hidden
              `}
            >
              {/* Card content with proper padding */}
              <div className="p-5 sm:p-6">
                {/* CARD HEADER */}
                <motion.header
                  whileTap={{ scale: 0.995 }}
                  onClick={() => toggleExpand(index)}
                  className="cursor-pointer flex items-start justify-between"
                >
                  <div className="flex items-start gap-4 flex-1">
                    {/* Icon with consistent sizing */}
                    <motion.div
                      custom={index}
                      variants={iconVariants}
                      initial="initial"
                      animate="animate"
                      className={`
                        w-12 h-12 sm:w-14 sm:h-14
                        rounded-lg
                        flex items-center justify-center
                        ${section.iconColor}
                        shadow-sm
                        flex-shrink-0
                        mt-1
                      `}
                    >
                      <section.icon className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                    </motion.div>

                    {/* Title and content section with proper word wrapping */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
                          {section.title}
                        </h3>
                        <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full whitespace-nowrap">
                          {section.items.length}
                        </span>
                      </div>

                      {/* Subtle divider */}
                      <div className="flex items-center gap-2 mb-3">
                        <div
                          className={`h-1 w-10 ${section.iconColor} rounded-full`}
                        />
                      </div>

                      {/* Preview text with proper truncation */}
                      <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                        {section.items.slice(0, 2).join(" • ")}
                      </p>
                    </div>
                  </div>

                  {/* Chevron button with proper padding */}
                  <motion.div
                    animate={{
                      rotate: expandedIndex === index ? 180 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="ml-3 p-2 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors flex-shrink-0 mt-1"
                  >
                    {expandedIndex === index ? (
                      <FiChevronUp className="w-4 h-4" />
                    ) : (
                      <FiChevronDown className="w-4 h-4" />
                    )}
                  </motion.div>
                </motion.header>

                {/* EXPANDABLE CONTENT - Only show when expanded */}
                <AnimatePresence>
                  {expandedIndex === index && (
                    <motion.div
                      key={`content-${index}`}
                      variants={contentVariants}
                      initial="collapsed"
                      animate="expanded"
                      exit="collapsed"
                      className="overflow-hidden"
                    >
                      <div className="pt-5 mt-5 border-t border-gray-100">
                        {/* Single column layout for better mobile readability */}
                        <div>
                          <div className="flex items-center gap-2 mb-4">
                            <FiTarget className="text-gray-400 w-4 h-4" />
                            <h4 className="font-medium text-gray-700">
                              Skills & Competencies
                            </h4>
                          </div>

                          {/* Skills list with proper spacing and wrapping */}
                          <ul className="space-y-3">
                            {section.items.map((item, itemIndex) => (
                              <motion.li
                                key={itemIndex}
                                custom={itemIndex}
                                initial="hidden"
                                animate="visible"
                                variants={listItemVariants}
                                className="flex items-start"
                              >
                                <div className="mr-3 mt-2 flex-shrink-0">
                                  <div
                                    className={`w-1.5 h-1.5 ${section.iconColor} rounded-full`}
                                  />
                                </div>
                                <span className="text-gray-700 text-sm leading-relaxed">
                                  {item}
                                </span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>

                        {/* Card footer with proper spacing */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3, duration: 0.3 }}
                          className="mt-6 pt-5 border-t border-gray-100"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg">
                                <FiStar className="text-yellow-500 w-3 h-3" />
                                <span className="text-xs font-medium text-gray-700">
                                  Core Expertise Area
                                </span>
                              </div>
                            </div>

                            <button
                              onClick={() => toggleExpand(index)}
                              className="text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg"
                            >
                              Close Details
                            </button>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>

      {/* FOOTER SECTION */}
      <section className="px-5 py-12 sm:px-6 sm:py-16 md:px-8">
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl border border-gray-200 shadow-sm mb-6">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-gray-700">
                {expandedIndex !== null
                  ? `Currently viewing: ${contentData[expandedIndex]?.title}`
                  : "Select a category to explore skills"}
              </span>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed max-w-md mx-auto mb-8">
              This portfolio showcases skills developed through academic
              training and professional experience, highlighting both technical
              abilities and collaborative competencies.
            </p>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent max-w-sm mx-auto"
            />
          </div>
        </motion.footer>
      </section>

      {/* FLOATING ACTION BUTTON */}
      {expandedIndex !== null && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.6, type: "spring" }}
          onClick={() => {
            const nextIndex = (expandedIndex + 1) % contentData.length;
            toggleExpand(nextIndex);
          }}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-gray-900 text-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
          aria-label="Next category"
        >
          <FiChevronDown className="w-5 h-5" />
        </motion.button>
      )}
    </div>
  );
}
