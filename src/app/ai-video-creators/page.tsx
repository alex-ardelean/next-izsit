import MainLayout from "../layouts/MainLayout";
import HeroHowItWorksPage from "../../components/(CreatorsComponents)/CreatorsHero";
import CreatorsContentSection from "../../components/(AboutPageComponents)/HowWeSupportSection";
import SendUsYourPortfolio from "../../components/(CreatorsComponents)/SendUsYourPortfolio";
import WhyIzsit from "../../components/(CreatorsComponents)/WhyIzsit";

export const metadata = {
  title: {
    template: "%s - Izsit",
    default: "Empowering AI Creators with Funding and Revenue Sharing | Izsit",
  },
  description:
    "Izsit backs AI creators with funding and global distribution. Join us to captivate audiences and revolutionize storytelling through AI-powered films and series.",
  openGraph: {
    title: "Izsit | Empowering AI Creators with Funding and Revenue Sharing",
    description:
      "At Izsit, we're backing AI creators by providing up to $25k in funding, broad distribution channels, and a supportive community to bring bold ideas to life.",
    url: "https://izsit.com/ai-video-creators",
    type: "website",
    images: [
      {
        url: "/images/metapictures/Izsit-front-picture.jpg",
        width: 1200,
        height: 630,
        alt: "Izsit: Empowering AI Creators",
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
    "@type": "WebPage",
    url: "https://izsit.com/ai-video-creators",
    name: "AI Video Creators",
    description:
      "Empowering AI creators with funding and global reach to produce groundbreaking stories. Join the revolution in AI storytelling with Izsit.",
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

export default function AIVideoCreators() {
  return (
    <MainLayout>
      <HeroHowItWorksPage />
      <WhyIzsit />
      <SendUsYourPortfolio />
    </MainLayout>
  );
}
