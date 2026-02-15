"use client";

import { motion, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function MobileHobbiesSection() {
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const imageVariants: Variants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const hobbies = [
    {
      id: "football",
      title: "playing",
      subtitle: "Football",
      image: "/images/hobbies/football.png",
      tagline: "⚽ Kick, score, repeat!",
      color: "red",
    },
    {
      id: "travelling",
      title: "travelling",
      subtitle: "mountain",
      image: "/images/hobbies/airplane.png",
      tagline: "✈️ Adventure awaits!",
      color: "blue",
    },
    {
      id: "reading",
      title: "reading",
      subtitle: "book",
      tagline: "📚 Lost in stories",
      color: "purple",
    },
    {
      id: "drawing",
      title: "drawing",
      subtitle: "sketch",
      tagline: "🎨 Create something beautiful",
      color: "yellow",
    },
  ];

  const getCardStyles = (color: string) => {
    const styles = {
      red: "bg-gradient-to-br from-red-950/40 to-red-900/20 border-red-500/30",
      blue: "bg-gradient-to-br from-blue-950/40 to-blue-900/20 border-blue-500/30",
      purple:
        "bg-gradient-to-br from-purple-950/40 to-purple-900/20 border-purple-500/30",
      yellow:
        "bg-gradient-to-br from-yellow-950/40 to-yellow-900/20 border-yellow-500/30",
    };
    return styles[color as keyof typeof styles];
  };

  const getTitleStyles = (id: string) => {
    if (id === "football")
      return "bg-red-600 text-white px-3 py-1 rounded-lg text-base font-medium";
    if (id === "drawing")
      return "bg-yellow-500 text-black px-3 py-1 rounded-lg text-base font-medium";
    return "text-white text-lg font-normal";
  };

  const getSubtitleStyles = (id: string) => {
    if (id === "football") return "text-white text-xl font-bold ml-2";
    if (id === "travelling") return "text-blue-400 text-lg ml-1";
    if (id === "reading") return "text-purple-400 text-lg italic ml-2";
    if (id === "drawing")
      return "bg-green-600 text-white px-3 py-1 rounded-lg text-sm ml-2";
    return "text-gray-300";
  };

  return (
    <section className="lg:hidden w-full bg-black text-white py-16 px-4">
      <div className="max-w-md mx-auto">
        {/* Header - Clean & Minimal */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center pb-12"
        >
          <h2 className="text-3xl font-bold">
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              My
            </span>
            <span className="bg-white text-black px-3 py-1 rounded-lg inline-block mx-2 text-2xl">
              Hobbies
            </span>
            <span className="text-white">is to</span>
          </h2>
        </motion.div>

        {/* Hobbies List - Clean Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          className="absolute flex flex-col gap-4"
        >
          {hobbies.map((hobby) => (
            <motion.div
              key={hobby.id}
              variants={itemVariants}
              className={`rounded-xl py-5 border backdrop-blur-sm ${getCardStyles(hobby.color)}`}
            >
              <div className="flex items-center p-5 justify-between">
                {/* Left - Text Content */}
                <div className="flex-1">
                  <div className="flex items-center flex-wrap gap-1 mb-1">
                    <span className={getTitleStyles(hobby.id)}>
                      {hobby.title}
                    </span>
                    <span className={getSubtitleStyles(hobby.id)}>
                      {hobby.subtitle}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">{hobby.tagline}</p>
                </div>

                {/* Right - Visual Element */}
                <motion.div
                  variants={imageVariants}
                  className="ml-3 flex-shrink-0"
                >
                  {hobby.id === "football" && (
                    <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center">
                      <img
                        src={hobby.image}
                        alt="Football"
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                  )}

                  {hobby.id === "travelling" && (
                    <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center">
                      <img
                        src={hobby.image}
                        alt="Airplane"
                        className="w-14 h-14 object-contain"
                      />
                    </div>
                  )}

                  {hobby.id === "reading" && (
                    <div className="w-16 h-16 bg-purple-500/10 rounded-lg flex items-center justify-center">
                      <span className="text-3xl">📘</span>
                    </div>
                  )}

                  {hobby.id === "drawing" && (
                    <div className="w-16 h-16 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                      <span className="text-3xl">✏️</span>
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Simple Footer Decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 0.5 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center mt-12"
        >
          <div className="w-16 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></div>
        </motion.div>
      </div>
    </section>
  );
}
