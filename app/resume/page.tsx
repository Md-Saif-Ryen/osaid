import { Metadata } from "next";
import ResumeSection from "./resumeSection";

export const metadata: Metadata = {
  title: "Resume & CV | S M Osaid Rizvi | Research & Innovation Portfolio",
  description:
    "Download my professional resume and executive CV showcasing research projects, technical skills, sustainable innovations, and academic achievements.",
  keywords: [
    "S M Osaid Rizvi Resume",
    "Professional CV",
    "Research Portfolio",
    "Sustainable Energy Research",
    "Nanotechnology Research",
    "Biomedical Projects",
    "Academic CV",
  ],
  authors: [{ name: "Hessamuddin" }],
  creator: "Hessamuddin",
  metadataBase: new URL("https://yourdomain.com"),
  openGraph: {
    title: "Resume & CV | S M Osaid Rizvi",
    description:
      "Download professional resume and executive CV including research, projects, and skills.",
    url: "https://yourdomain.com/resume",
    siteName: "S M Osaid Rizvi Portfolio",
    type: "profile",
    images: [
      {
        url: "/images/resume/resume.png",
        width: 1200,
        height: 630,
        alt: "S M Osaid Rizvi Resume and CV",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume & CV | S M Osaid Rizvi",
    description: "Download my professional resume and executive CV.",
    images: ["/images/resume/resume.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ResumePage() {
  return <ResumeSection />;
}
