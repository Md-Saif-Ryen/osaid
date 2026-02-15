import { Metadata } from "next";
import ExperienceDetailPage from "./ExperienceSlugPage";

const experienceMeta = [
  {
    slug: "khushru-medicare-intern",
    title: "Summer Intern at Khushru Medicare",
    description:
      "Internship experience in pharmaceutical QA/QC operations under WHO-GMP compliance, including sterility testing and regulatory documentation.",
  },
  {
    slug: "tata-main-hospital-research-intern",
    title: "Research Intern at Tata Main Hospital",
    description:
      "Hands-on laboratory experience in Biochemistry and Microbiology, including ELISA, VITEK systems, and clinical diagnostics.",
  },
  {
    slug: "internshala-student-partner",
    title: "Student Partner at Internshala",
    description:
      "Leadership role promoting career development, organizing workshops, and mentoring students.",
  },
  {
    slug: "sudha-dairy-internship-trainee",
    title: "Internship Trainee at Sudha Dairy",
    description:
      "Practical exposure to dairy quality control, chemical and microbiological testing, and food safety standards.",
  },
  {
    slug: "academor-project-intern",
    title: "Project Intern – Nanotechnology Research",
    description:
      "Research internship focusing on green synthesis of nanoparticles and antimicrobial studies.",
  },
  {
    slug: "muskurahat-foundation-fundraising-assistant",
    title: "Fundraising Assistant at Muskurahat Foundation",
    description:
      "Supported fundraising strategies, donor engagement, and nonprofit impact initiatives.",
  },
];

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const exp = experienceMeta.find((e) => e.slug === params.slug);

  if (!exp) {
    return {
      title: "Experience Detail",
    };
  }

  return {
    title: `${exp.title} | Professional Experience`,
    description: exp.description,
    openGraph: {
      title: exp.title,
      description: exp.description,
      url: `https://yourdomain.com/experience/${params.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: exp.title,
      description: exp.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function Page() {
  return <ExperienceDetailPage />;
}
