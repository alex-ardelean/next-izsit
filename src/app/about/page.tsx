import MainLayout from "../layouts/MainLayout";
import AboutHero from "../../components/(AboutPageComponents)/AboutHero";
import HowWeSupportSection from "../../components/(AboutPageComponents)/HowWeSupportSection";
import Timeline from "../../components/(AboutPageComponents)/TimelineComponent";
import ContactUs from "../../components/(AboutPageComponents)/ContactUs";
import CEOAward from "../../components/(AboutPageComponents)/CEOAward";

export const metadata = {
  title: {
    template: "%s - Izsit",
    default: "About Izsit | Empowering AI Creators",
  },
  description:
    "Learn more about Izsit, our mission to empower AI creators, and how we're revolutionizing the future of storytelling through funding and global reach.",
  openGraph: {
    title: "About Izsit | Empowering AI Creators",
    description:
      "At Izsit, we're committed to supporting AI creators by providing funding, global distribution, and a vibrant community to bring bold ideas to life.",
    url: "https://izsit.com/about",
    type: "website",
    images: [
      {
        url: "/images/metapictures/Izsit-front-picture.jpg",
        width: 1200,
        height: 630,
        alt: "About Izsit: Empowering AI Creators",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Izsit | Empowering AI Creators",
    description:
      "Discover how Izsit is revolutionizing storytelling by supporting AI creators with funding, global distribution, and a mission-driven community.",
    images: ["/images/metapictures/Izsit-front-picture.jpg"],
  },
  schema: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url: "https://izsit.com/about",
    name: "About Izsit",
    description:
      "Learn more about Izsit, our mission to empower AI creators, and how we're revolutionizing the future of storytelling through funding and global reach.",
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

export default function AboutPage() {
  return (
    <MainLayout>
      <AboutHero />
      <HowWeSupportSection />
      <Timeline />
      <ContactUs />
      <CEOAward />
    </MainLayout>
  );
}
