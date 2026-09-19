import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./global.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import Preloader from "@/components/Preloader";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});
// lkwehfjkshgksjdhgdkjlh
const baseUrl = "https://taapti.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Taapti Technologies | Custom Software Engineering & AI Solutions Company",
    template: "%s | Taapti Technologies",
  },
  description:
    "Taapti Technologies is a premier software engineering & AI development agency. We build scalable custom web applications, enterprise software, AI & RAG solutions, and cloud architectures for growing businesses.",
  keywords: [
    "Taapti Technologies",
    "Software Engineering",
    "Custom Software Development",
    "AI Development Agency",
    "RAG Solutions",
    "Web Application Development",
    "Cloud Architecture",
    "Next.js Development",
    "React Native Development",
    "Enterprise Software",
    "DevOps Services",
  ],
  authors: [{ name: "Taapti Technologies", url: baseUrl }],
  publisher: "Taapti Technologies",
  alternates: {
    canonical: baseUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "Taapti Technologies",
    title: "Taapti Technologies | Custom Software Engineering & AI Solutions",
    description:
      "Build scalable custom web applications, enterprise software, AI & RAG solutions, and cloud architectures for growing businesses with Taapti Technologies.",
    images: [
      {
        url: `${baseUrl}/logo-icon.png`,
        width: 1200,
        height: 630,
        alt: "Taapti Technologies Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Taapti Technologies | Custom Software Engineering & AI Solutions",
    description:
      "Build scalable custom web applications, enterprise software, AI & RAG solutions, and cloud architectures for growing businesses.",
    images: [`${baseUrl}/logo-icon.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/logo-icon.png" type="image/png" />
        <link rel="shortcut icon" href="/logo-icon.png" type="image/png" />
      </head>
      <body className={jakartaSans.className} suppressHydrationWarning>
        <Preloader />
        <ScrollReveal />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}