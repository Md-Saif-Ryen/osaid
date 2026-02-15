import { Metadata } from "next";
import ProjectDetailPage from "./homeSlug";

export const metadata: Metadata = {
  title: "Project Details | Research & Innovation Projects",
  description:
    "Explore detailed research and innovation projects including sustainable energy systems, biodegradable materials, nanotechnology-based drug delivery, and medical diagnostic advancements.",
  keywords: [
    "Research Projects",
    "Sustainable Energy",
    "Microbial Fuel Cells",
    "Biodegradable Materials",
    "Nanotechnology",
    "Alzheimer Therapy",
    "Medical Diagnostics",
  ],
  authors: [{ name: "Hessamuddin" }],
  creator: "Hessamuddin",
  openGraph: {
    title: "Project Details | Research & Innovation",
    description:
      "Detailed case studies on sustainable energy, biomedical nanotechnology, eco-friendly materials, and cardiovascular diagnostics.",
    url: "https://yourdomain.com/projects",
    siteName: "Portfolio",
    type: "article",
    images: [
      {
        url: "/images/project-1.png",
        width: 1200,
        height: 630,
        alt: "Research Project Showcase",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Project Details | Research & Innovation",
    description:
      "Explore in-depth research projects and sustainable innovations.",
    images: ["/images/project-1.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ProjectPage() {
  return <ProjectDetailPage />;
}
