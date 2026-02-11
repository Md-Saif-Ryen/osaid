"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { skills, testimonials, certificates, industries } from "../lib/data";

export default function MobileHome() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeList, setActiveList] = useState<"cert" | "test" | null>(null);

  const openModal = (index: number, type: "cert" | "test") => {
    setActiveIndex(index);
    setActiveList(type);
  };

  const closeModal = () => {
    setActiveIndex(null);
    setActiveList(null);
  };

  // ✅ Safe image resolver
  const images = useMemo(() => {
    if (activeList === "cert") {
      return Array.isArray(certificates) ? certificates : [];
    }

    if (activeList === "test") {
      return Array.isArray(testimonials)
        ? testimonials.map((t) => t.image).filter(Boolean)
        : [];
    }

    return [];
  }, [activeList]);

  const nextImage = () => {
    if (activeIndex === null || images.length === 0) return;

    setActiveIndex((prev) => {
      if (prev === null) return 0;
      return prev === images.length - 1 ? 0 : prev + 1;
    });
  };

  const prevImage = () => {
    if (activeIndex === null || images.length === 0) return;

    setActiveIndex((prev) => {
      if (prev === null) return 0;
      return prev === 0 ? images.length - 1 : prev - 1;
    });
  };

  return (
    <main className="min-h-screen bg-white text-black overflow-x-hidden">
      {/* HERO */}
      <section className="min-h-screen px-4 py-8 flex flex-col justify-center items-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl text-left font-bold"
        >
          Innovation Begins When Science Meets {"" }
        
          <span className="bg-gradient-to-r from-red-600 to-black bg-clip-text text-transparent">
            Design
          </span>
        </motion.h1>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative w-[280px] h-[360px] mt-12 rounded-3xl overflow-hidden shadow-2xl"
        >
          <Image
            src="/images/osaid_morphed.png"
            fill
            className="object-cover"
            alt="Osaid Rizvi"
            priority
          />
        </motion.div>
      </section>

      {/* CERTIFICATES */}
      <section className="px-4 py-1">
        <h2 className="text-3xl font-bold text-center mb-8 pb-5">
          Professional <span className="text-red-600">Experience</span>
        </h2>

        <div className="flex gap-1 overflow-x-auto  no-scrollbar">
          {Array.isArray(certificates) &&
            certificates.map((c: string, i: number) => (
              <motion.div
                key={i}
                whileHover={{ y: -8 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => openModal(i, "cert")}
                className="relative min-w-[280px] h-[200px] rounded-2xl overflow-hidden shadow-lg cursor-pointer"
              >
                <Image
                  src={c}
                  fill
                  className="object-cover"
                  alt={`Certificate ${i + 1}`}
                />
              </motion.div>
            ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="px-4 py-10 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-8 pb-5">
          Client <span className="text-red-600">Testimonials</span>
        </h2>

        <div className="flex gap-1 overflow-x-auto pb-6 no-scrollbar">
          {Array.isArray(testimonials) &&
            testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                whileHover={{ y: -8 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => openModal(i, "test")}
                className="relative min-w-[280px] h-[220px] rounded-2xl overflow-hidden shadow-lg cursor-pointer"
              >
                {t.image && (
                  <Image
                    src={t.image}
                    fill
                    className="object-cover"
                    alt={t.name}
                  />
                )}
              </motion.div>
            ))}
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="px-4 py-10">
        <h2 className="text-3xl font-bold text-center mb-8 pb-5">
          Industries <span className="text-red-600">Served</span>
        </h2>

        <div className="grid grid-cols-2 gap-6">
          {Array.isArray(industries) &&
            industries.map((src: string, i: number) => (
              <div
                key={i}
                className="relative h-20 rounded-2xl"
              >
                <Image
                  src={src}
                  alt={`Industry ${i + 1}`}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 bg-gray-900 text-white text-center">
        © {new Date().getFullYear()} S M Osaid Rizvi
      </footer>

      {/* MODAL */}
      <AnimatePresence>
        {activeIndex !== null && images.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/65 flex items-center justify-center z-50 px-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-4xl h-[75vh] rounded-3xl overflow-hidden"
            >
              {images[activeIndex] && (
                <Image
                  src={images[activeIndex]}
                  fill
                  className="object-contain"
                  alt="Preview"
                />
              )}

              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white text-2xl"
              >
                ✕
              </button>

              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl"
              >
                ‹
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl"
              >
                ›
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white">
                {activeIndex + 1} / {images.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hide Scrollbar */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </main>
  );
}
