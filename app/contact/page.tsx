import { Metadata } from "next";
import ContactPage from "./contactPage";

export const metadata: Metadata = {
  title: "Contact | Hire S M Osaid Rizvi",
  description:
    "Get in touch with S M Osaid Rizvi for freelance projects, collaborations, research opportunities, and professional inquiries. Available for new opportunities and partnerships.",
  keywords: [
    "Contact S M Osaid Rizvi",
    "Hire Frontend Developer",
    "Freelance Developer India",
    "Collaboration Opportunities",
    "Research Collaboration",
    "Web Development Services",
  ],
  metadataBase: new URL("https://yourdomain.com"), // replace with real domain
  openGraph: {
    title: "Contact | Let's Build Something Amazing",
    description:
      "Reach out for collaborations, freelance projects, research partnerships, and professional opportunities.",
    url: "https://yourdomain.com/contact",
    siteName: "Osaid Rizvi Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | S M Osaid Rizvi",
    description:
      "Available for projects, research collaboration, and professional opportunities.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <ContactPage />;
}
