"use client";

import { useSearchParams } from "next/navigation";
import { decryptIndex } from "@/utils/crypto";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RadialHomeMenu from "@/components/FloatingHomeMenu";

gsap.registerPlugin(ScrollTrigger);

/* ================= DATA ================= */

const myExperienceData = [
  {
    id: 1,
    slug: "khushru-medicare-intern",
    title: "Summer Intern",
    duration: "May 2025 – Jul 2025",
    location: "Solan, Himachal Pradesh, India",
    smallImage: "/images/exp/khusru.png",
    bgImage: "/images/exp/khushro-bg.png",
    about:
      "Khushru Medicare is an India-based pharmaceutical company engaged in the manufacturing, marketing, and third-party production of a wide range of healthcare formulations. Located in Solan, Himachal Pradesh, the company operates with a strong focus on quality, affordability, and regulatory compliance, following WHO-GMP standards. Khushru Medicare offers diversified dosage forms including tablets, capsules, syrups, injectables, and topical formulations, serving hospitals, pharmacies, and healthcare partners across India with a commitment to patient-centric and reliable healthcare solutions.",
    desc: "During my internship at Khushru Medicare, I gained practical exposure to pharmaceutical Quality Assurance (QA) and Quality Control (QC) operations within a WHO-GMP–compliant environment. I was actively involved in laboratory and quality processes, including sterility testing, packaging inspection, and regulatory documentation. This experience strengthened my understanding of pharmaceutical quality systems, SOP-driven workflows, and compliance-oriented lab practices while enhancing my teamwork and professional communication skills.",
    contributions: [
      "Hands-on sterility testing and quality verification",
      "Packaging inspection & compliance checks",
      "Exposure to WHO-GMP regulatory standards",
      "Understanding pharmaceutical QC workflows",
      "QA/QC documentation assistance",
      "Worked in controlled lab environments",
      "Improved teamwork & professional communication",
    ],
  },

  {
    id: 2,
    slug: "tata-main-hospital-research-intern",
    title: "Research Intern",
    duration: "May 2024 – Jul 2024",
    location: "Jamshedpur, Jharkhand, India",
    smallImage: "/images/exp/tata.png",
    bgImage: "/images/exp/tata-bg.png",
    about:
      "Tata Main Hospital (TMH) is a leading multi-specialty tertiary care hospital located in Jamshedpur, Jharkhand. Established in 1908 by Tata Steel, it provides comprehensive outpatient, inpatient, and 24/7 emergency healthcare services. Equipped with advanced diagnostic and critical care facilities, TMH also functions as a teaching hospital and is widely recognized for its commitment to quality, ethics, and patient-centric care.",
    desc: "During my training at the Pathology Department of Tata Main Hospital, I gained hands-on experience in Biochemistry and Microbiology. I performed biochemical assays, microbiological cultures, and antibiotic sensitivity testing while operating advanced diagnostic instruments. I also assisted in result interpretation, followed strict quality control protocols, and collaborated with clinical professionals on real diagnostic cases, strengthening my laboratory and analytical skills.",
    contributions: [
      "Operated VITEK system for microbial identification and antibiotic susceptibility testing",
      "Performed HbA1c analysis for long-term glycemic monitoring",
      "Conducted routine and specialized tests using biochemistry analyzers",
      "Worked with CLIA-based immunoassay systems",
      "Executed ELISA assays using automated ELISA analyzers",
      "Managed automated blood culture systems",
      "Performed Gram staining and Ziehl–Neelsen (ZN) staining",
      "Conducted blood and urine cultures with microbial isolation",
    ],
  },
  {
    id: 3,
    slug: "internshala-student-partner",
    title: "Student Partner",
    duration: "Mar 2024 – May 2024",
    location: "Chandigarh, India",
    smallImage: "/images/exp/internshala.png",
    bgImage: "/images/exp/internshala-bg.png",
    about:
      "Internshala is an Indian career-tech and EdTech platform founded by Sarvesh Agrawal. It focuses on providing internship and entry-level job opportunities to students and fresh graduates. The platform also offers online training programs to build practical, industry-relevant skills and bridge the gap between academic learning and real-world experience.",
    desc: "As an Internshala Student Partner, I actively supported career development within my university by mentoring peers, organizing workshops, promoting internship opportunities, creating digital content, and facilitating networking events. This role helped foster a culture of professional growth while strengthening my leadership, communication, and outreach skills.",
    contributions: [
      "Mentored students on internships, career planning, and skill development",
      "Organized career-focused workshops and awareness sessions",
      "Promoted internship and training opportunities on campus",
      "Created engaging digital content for student outreach",
      "Facilitated networking between students and recruiters",
      "Strengthened leadership and public-speaking skills",
      "Executed structured marketing and outreach campaigns",
      "Gained experience in community building and teamwork",
    ],
  },
  {
    id: 4,
    slug: "sudha-dairy-internship-trainee",
    title: "Internship Trainee",
    duration: "Dec 2023 – Jan 2024",
    location: "Patna, Bihar, India",
    smallImage: "/images/exp/sudha-dairy.png",
    bgImage: "/images/exp/sudha-bg.png",
    about:
      "Sudha Dairy is the flagship brand of the Bihar State Milk Co-operative Federation Ltd. (COMFED), established in 1983 under India’s Operation Flood program. Operating on a cooperative model, Sudha ensures fair pricing for dairy farmers while delivering high-quality milk and dairy products, known for strict quality control and hygienic processing standards.",
    desc: "During my dairy project apprenticeship, I gained practical exposure to chemical and microbiological analysis of milk and dairy products. I developed a strong understanding of dairy processing, quality control measures, and food safety standards. This experience enhanced my laboratory skills and strengthened my foundation for roles in the food and beverage industry.",
    contributions: [
      "Conducted chemical and microbiological testing of dairy products",
      "Applied dairy treatment methods for quality improvement",
      "Gained hands-on experience with laboratory equipment",
      "Understood dairy processing and production workflows",
      "Assisted in quality assurance procedures",
      "Followed food safety and hygiene standards",
      "Improved analytical and documentation skills",
      "Built industry-relevant dairy sector knowledge",
    ],
  },
  {
    id: 5,
    slug: "academor-project-intern",
    title: "Project Intern",
    duration: "Aug 2023 – Sep 2023",
    location: "Chandigarh, India",
    smallImage: "/images/exp/academor.png",
    bgImage: "/images/exp/academor-bg.png",
    about:
      "Academor is an Indian ed-tech company offering online skill-development and internship programs focused on industry-relevant learning. It conducted an internship program in collaboration with Techfest IIT Bombay, combining expert-led training with hands-on project work and real-world research exposure.",
    desc: "During this research internship, I worked on the green synthesis of silver and zinc oxide nanoparticles using sustainable nanotechnology approaches. I studied their antimicrobial and cytotoxic properties while applying bioreduction and surface modification techniques. The experience strengthened my research, experimental design, and scientific communication skills.",
    contributions: [
      "Synthesized silver and zinc oxide nanoparticles via green synthesis",
      "Studied antimicrobial and cytotoxic properties",
      "Applied bioreduction and surface modification techniques",
      "Designed experiments and performed data analysis",
      "Contributed to sustainable nanotechnology research",
      "Gained exposure to biomedicine and materials science",
      "Collaborated within a multicultural research team",
      "Enhanced research presentation and professional skills",
    ],
  },
  {
    id: 6,
    slug: "muskurahat-foundation-fundraising-assistant",
    title: "Fundraising Assistant",
    duration: "Jun 2023 – Jul 2023",
    location: "Patna, Bihar, India",
    smallImage: "/images/exp/musk.png",
    bgImage: "/images/exp/musk-bg.png",
    about:
      "Muskurahat Foundation is a Mumbai-based non-profit organization founded in 2014, focused on empowering underprivileged children through education, social-emotional learning, and mental well-being. Its flagship initiative, Project KEYtaab, promotes holistic child development. The organization is registered under the Mumbai Public Trust Act and holds 12A and 80G certifications.",
    desc: "As a Fundraising Assistant at Muskurahat Foundation, I supported initiatives aimed at improving the lives of underprivileged children. I gained hands-on experience in donor engagement, fundraising strategy, event coordination, and campaign analysis while working closely with a dedicated nonprofit team.",
    contributions: [
      "Developed and implemented fundraising strategies",
      "Managed donor communication and engagement",
      "Assisted in organizing fundraising events",
      "Conducted research and campaign data analysis",
      "Evaluated the impact of fundraising initiatives",
      "Collaborated with a mission-driven nonprofit team",
      "Gained insights into nonprofit operations",
      "Developed empathy, resilience, and problem-solving skills",
    ],
  },
];

/* ================= COMPONENT ================= */

export default function ExperienceDetailPage() {
  const searchParams = useSearchParams();
  const encryptedId = searchParams.get("id");
  const parallaxRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const id = encryptedId ? Number(decryptIndex(encryptedId)) : null;
  const item = myExperienceData.find((exp) => exp.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
    ScrollTrigger.refresh(true);
  }, []);

  
  /* HERO PARALLAX */
  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current) return;
      parallaxRef.current.style.transform = `translateY(${
        window.scrollY * 0.35
      }px)`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* DETAIL CARD + LIST ANIMATION */
  useEffect(() => {
    if (!cardRef.current || !listRef.current) return;

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 80%",
        },
      },
    );

    gsap.fromTo(
      listRef.current.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: listRef.current,
          start: "top 85%",
        },
      },
    );
  }, []);

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Experience not found
      </div>
    );
  }

  return (
    <>
    <RadialHomeMenu />
      <section className="min-h-screen bg-white relative overflow-hidden">
        {/* ================= HERO BACKGROUND ================= */}
        <div
          ref={parallaxRef}
          className="absolute inset-0 h-[26rem] md:h-[900px] z-0"
        >
          <Image
            src={item.bgImage}
            alt=""
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/25" />
        </div>

        {/* ================= HERO CONTENT ================= */}
        <div className="relative z-0 h-[26rem] md:h-[34rem]">
          <div className="container mx-auto h-full px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 h-full gap-6">
              {/* LEFT */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col justify-between py-8 md:py-14"
              >
                <Image
                  src={item.smallImage}
                  alt={item.title}
                  width={140}
                  height={140}
                  className="rounded-xl bg-white p-2"
                />

                <div className="space-y-3">
                  <h1 className="text-3xl md:text-5xl font-bold text-white">
                    {item.title}
                  </h1>
                  <div className="text-sm md:text-base text-white/80 space-y-1">
                    <p>{item.duration}</p>
                    <p>{item.location}</p>
                  </div>
                </div>
              </motion.div>

              {/* RIGHT GLASS */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="flex items-center md:justify-end py-8 md:py-14"
              >
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 max-w-md">
                  <p className="text-white text-sm md:text-base leading-relaxed">
                    {item.about}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ================= DETAIL CARD ================= */}
        <div className="relative z-10 py-16 md:py-28">
          <div className="flex justify-center px-4">
            <div
              ref={cardRef}
              className="
              w-full max-w-5xl
              bg-pink-200
              rounded-3xl
              shadow-[0_30px_70px_rgba(0,0,0,0.15)]
              px-[50px] py-12
              sm:px-8
              md:px-[50px]
              lg:px-[60px]
            "
            >
              <div className="max-w-3xl mx-auto space-y-10 ">
                <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 pb-10">
                  Role Overview
                </h2>

                <p className="text-gray-700 text-sm sm:text-base leading-relaxed text-start">
                  {item.desc}
                </p>

                <div className="text-start pt-10">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Key Contributions & Learnings:
                  </h3>
                  <div className="w-full h-[2px] bg-red-600 mx-auto rounded-full" />
                </div>
                <div
                  ref={listRef}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-8"
                >
                  {item.contributions.map((point, i) => (
                    <div
                      key={i}
                      className="
                      flex gap-3
                      bg-pink-200
                      rounded-xl
                      p-4
                      border border-gray-100
                      hover:shadow-md transition
                    "
                    >
                      <span className="mt-1 w-2.5 h-2.5 rounded-full bg-red-600" />
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
