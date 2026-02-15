// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/navbar";
import "./globals.css";
import PageTransitionRouter from "@/components/pageRouterTransition";
import LenisProvider from "@/components/LenisProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yourdomain.com"), // 👈 apna real domain daalna
  title: {
    default: "S M Osaid Rizvi | Frontend Developer Portfolio",
    template: "%s | Osaid Rizvi",
  },
  description:
    "Portfolio of S M Osaid Rizvi – Frontend Developer specializing in Next.js, React, GSAP animations and modern UI development.",
  keywords: [
    "Osaid Rizvi",
    "Frontend Developer",
    "Next.js Developer",
    "React Developer",
    "GSAP Animation",
    "Portfolio Website",
  ],
  authors: [{ name: "S M Osaid Rizvi" }],
  creator: "S M Osaid Rizvi",
  openGraph: {
    title: "S M Osaid Rizvi | Frontend Developer",
    description:
      "Modern frontend developer portfolio built with Next.js and advanced animations.",
    url: "https://yourdomain.com",
    siteName: "Osaid Rizvi Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "S M Osaid Rizvi | Frontend Developer",
    description:
      "Frontend developer portfolio with modern UI and performance-focused design.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "S M Osaid Rizvi",
              url: "https://yourdomain.com",
              jobTitle: "Frontend Developer",
              sameAs: [
                "https://linkedin.com/in/yourprofile",
                "https://github.com/yourprofile",
              ],
              hasOccupation: {
  "@type": "Occupation",
  name: "Research & Technology Professional",
},
              knowsAbout: [
                "Clinical Biochemistry",
                "Microbiology",
                "WHO GMP Compliance",
                "Nanoparticle Drug Delivery",
                "ELISA Diagnostics",
                "Biotechnology Innovation",
                "Quality Assurance",
                "Scientific Research",
              ],
            }),
          }}
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LenisProvider>
          <PageTransitionRouter>
            <div className="relative z-10">
              <Navbar />
              <main>{children}</main>
            </div>
          </PageTransitionRouter>
        </LenisProvider>
      </body>
    </html>
  );
}
