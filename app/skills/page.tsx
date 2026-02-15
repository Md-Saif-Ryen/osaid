import { Metadata } from "next";
import SkillsPage from "./skillsPage";

export const metadata: Metadata = {
  title: "Skills & Expertise | S M Osaid Rizvi",
  description:
    "Explore professional expertise in Clinical Biochemistry, Microbiological Analysis, WHO–GMP compliance, Nanoparticle synthesis, ELISA diagnostics, biotechnology innovation, and research development.",
  keywords: [
    "Clinical Biochemistry",
    "Microbiological Testing",
    "Quality Assurance QA",
    "WHO GMP Compliance",
    "Nanoparticle Synthesis",
    "ELISA Diagnostics",
    "Biotechnology Research",
    "Scientific Innovation",
    "Laboratory Expertise",
  ],
  metadataBase: new URL("https://yourdomain.com"), // 👈 replace
  openGraph: {
    title: "Skills & Expertise | S M Osaid Rizvi",
    description:
      "Professional expertise in laboratory diagnostics, biotechnology research, compliance systems and innovation-driven solutions.",
    url: "https://yourdomain.com/skills",
    siteName: "Osaid Rizvi Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Skills & Expertise | S M Osaid Rizvi",
    description:
      "Biotechnology, diagnostics, QA/QC, and research innovation expertise.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <SkillsPage />;
}
