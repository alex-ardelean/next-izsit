import "server-only";
import MainLayout from "../layouts/MainLayout";
import News from "../../components/(NewsComponents)/NewsComponent";

export const metadata = {
  title: {
    template: "%s - Izsit",
    default: "Latest AI Video News and Innovations | Stay Updated with Izsit",
  },
  description:
    "Stay updated with the latest advancements and stories in AI video. Explore how AI is transforming storytelling and visual creativity.",
  openGraph: {
    title: "AI Video News | Izsit",
    description:
      "Stay updated with the latest advancements and stories in AI video. Explore how AI is transforming storytelling and visual creativity.",
    url: "https://izsit.com/news",
    type: "website",
    images: [
      {
        url: "/images/metapictures/Izsit-front-picture.jpg",
        width: 1200,
        height: 630,
        alt: "Latest AI Video News on Izsit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Video News | Izsit",
    description:
      "Discover the latest in AI video advancements and insights. Stay informed on how AI is transforming visual storytelling.",
    images: ["/images/metapictures/Izsit-front-picture.jpg"],
  },
  schema: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url: "https://izsit.com/news",
    name: "AI Video News",
    description:
      "Stay updated with the latest advancements and stories in AI video. Explore how AI is transforming storytelling and visual creativity.",
    image: "/images/metapictures/Izsit-front-picture.jpg",
    publisher: {
      "@type": "Organization",
      name: "Izsit",
      logo: {
        "@type": "ImageObject",
        url: "/images/metapictures/Izsit-logo.jpg",
      },
    },
  },
};

export const revalidate = 60;

export default function NewsPage() {
  return (
    <MainLayout>
      <News />
    </MainLayout>
  );
}
