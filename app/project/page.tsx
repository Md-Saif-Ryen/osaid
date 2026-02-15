import { Metadata } from "next";
import ProjectsPage from "./ProjectPage";

export const metadata: Metadata = {
  title: "Research Projects | Biotechnology & Clinical Innovation",
  description:
    "Explore advanced research projects in sustainable bioenergy, biodegradable materials, nanoparticle drug delivery systems, and cardiovascular diagnostics.",
  keywords: [
    "Research Portfolio",
    "Biotechnology Projects",
    "Microbial Fuel Cells",
    "Nanoparticle Drug Delivery",
    "Biodegradable Materials",
    "Cardiac Diagnostics",
    "Scientific Research Projects",
  ],
  metadataBase: new URL("https://yourdomain.com"), // replace
  openGraph: {
    title: "Research Projects | Biotechnology & Clinical Innovation",
    description:
      "A curated portfolio of research work in bioenergy, nanomedicine, sustainability, and medical diagnostics.",
    url: "https://yourdomain.com/projects",
    siteName: "Osaid Rizvi Portfolio",
    type: "website",
    images: [
      {
        url: "/images/project-1.png",
        width: 1200,
        height: 630,
        alt: "Research Project Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Research Projects Portfolio",
    description:
      "Biotechnology, nanomedicine, and sustainable research innovations.",
    images: ["/images/project-1.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <ProjectsPage />;
}
