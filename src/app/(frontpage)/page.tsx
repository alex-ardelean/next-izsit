import MainLayout from "../layouts/MainLayout";
import Hero from "../../components/(Frontpage)/Hero";
import StayUpToDate from "../../components/(Frontpage)/StayUpToDate";
import HowItWorksInShort from "../../components/(Frontpage)/HowItWorksInShort";
import FAQ from "../../components/(Frontpage)/FAQ";

export const metadata = {
  title: {
    template: "%s - Izsit",
    default: "Empowering AI Creators with Funding and Global Reach | Izsit",
  },
  description:
    "Izsit is the ultimate platform for AI creators to monetize their work. We provide funding, distribution, and a vibrant community to support visionary storytellers.",
  openGraph: {
    title: "Izsit | Empowering AI Creators",
    description:
      "Join Izsit and gain access to funding, distribution channels, and a global audience for your AI-powered films and series.",
    url: "https://izsit.com",
    type: "website",
    images: [
      {
        url: "/images/metapictures/Izsit-front-picture.jpg",
        width: 1200,
        height: 630,
        alt: "Empowering AI Creators | Izsit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Izsit | Empowering AI Creators",
    description:
      "Izsit provides AI creators with funding, distribution, and a vibrant community to push boundaries and captivate audiences.",
    images: ["/images/metapictures/Izsit-front-picture.jpg"],
  },
  schema: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://izsit.com",
    name: "Izsit",
    description:
      "Empowering AI creators with funding and global reach to produce groundbreaking stories.",
    image: "/images/metapictures/Izsit-front-picture.jpg",
    publisher: {
      "@type": "Organization",
      name: "Izsit",
      logo: {
        "@type": "ImageObject",
        url: "/images/metapictures/Izsit-front-picture.jpg",
      },
    },
  },
};

export default function FrontPage() {
  return (
    <MainLayout>
      <Hero />
      <StayUpToDate />
      <HowItWorksInShort />
      <FAQ />
    </MainLayout>
  );
}
