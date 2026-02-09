"use client";

import Link from "next/link";
import { FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

export default function FooterSection() {
  return (
    <section className="w-full bg-gradient-to-t from-[#0f2d28] via-[#0b1a18] to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          {/* LEFT */}
          <div className="space-y-2">
            <h2 className="text-gray-400 tracking-widest text-sm uppercase">
              S M Osaid Rizvi
            </h2>
            <p className="text-gray-500 italic text-sm">
              precision meets perception…
            </p>
          </div>

          {/* CENTER */}
          <div className="flex gap-12">
            {/* Navigation */}
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link
                  href="/educational"
                  className="hover:text-white transition"
                >
                  Education
                </Link>
              </li>
              <li>
                <Link href="/skills" className="hover:text-white transition">
                  Skills
                </Link>
              </li>
              <li>
                <Link href="/project" className="hover:text-white transition">
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/experience"
                  className="hover:text-white transition"
                >
                  Experience
                </Link>
              </li>
              <li>
                <Link href="/resume" className="hover:text-white transition">
                  Resume
                </Link>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex flex-col gap-4 text-gray-400 text-xl">
              <a href="#" className="hover:text-white transition">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-white transition">
                <FaLinkedin />
              </a>
              <a href="#" className="hover:text-white transition">
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-2 text-sm text-gray-400">
            <p>(+91) 9570877425</p>
            <p className="underline underline-offset-4">
              syedrizvi2510@gmail.com
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
