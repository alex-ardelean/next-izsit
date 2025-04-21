import MainLayout from "../../layouts/MainLayout";
import Image from "next/image";

export const metadata = {
  title: {
    template: "%s - Izsit",
    default: "AI Film Forecasts for 2025 | Izsit",
  },
  description:
    "Explore the AI film industry's transformative growth, insights into AI-driven storytelling, and predictions for 2025, featuring key trends and opportunities from Izsit.",
  openGraph: {
    title: "AI Film Forecasts for 2025 | Izsit",
    description:
      "Explore the AI film industry's transformative growth, insights into AI-driven storytelling, and predictions for 2025, featuring key trends and opportunities from Izsit.",
    url: "https://izsit.com/blog/ai-film-forecasts-2025",
    type: "article",
    images: [
      {
        url: "/images/ai-forecasts-2025-blog-post.jpeg",
        width: 1200,
        height: 630,
        alt: "AI Film Forecasts for 2025 | Izsit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Film Forecasts for 2025 | Izsit",
    description:
      "Explore the transformative growth of the AI film industry, featuring key insights, trends, and opportunities for 2025.",
    images: ["/images/ai-forecasts-2025-blog-post.jpeg"],
  },
  schema: {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "AI Film Forecasts for 2025",
    description:
      "A detailed exploration of the AI film industry's transformative growth and predictions for 2025, including trends, opportunities, and challenges.",
    image: {
      "@type": "ImageObject",
      url: "/images/ai-forecasts-2025-blog-post.jpeg",
      width: 1200,
      height: 630,
    },
    author: {
      "@type": "Person",
      name: "Giacomo Bonavera",
    },
    publisher: {
      "@type": "Organization",
      name: "Izsit",
      logo: {
        "@type": "ImageObject",
        url: "/images/metapictures/Izsit-front-picture.jpg",
      },
    },
    datePublished: "2025-01-10",
    dateModified: "2025-01-10",
  },
};
export default function AIFilmForecasts2025() {
  return (
    <MainLayout>
      <div className="relative isolate overflow-hidden bg-gray-900">
        <div className="px-6 py-16 lg:px-8">
          <div className="mx-auto max-w-3xl text-base/7 text-gray-300">
            <p className="text-base/7 font-semibold text-emerald-400">
              AI Film Forecasts
            </p>
            <h1 className="font-rajdhani mt-2 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              AI Film Forecasts for 2025
            </h1>
            <div className="mt-4 text-sm text-gray-400">
              <p>Published on January 10, 2025</p>
              <p>
                By{" "}
                <a
                  href="https://www.linkedin.com/in/giacomobonavera/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-gray-300 hover:underline"
                >
                  Giacomo Bonavera
                </a>
              </p>
            </div>

            <p className="mt-6 text-lg text-gray-300">
              IZSIT brings you the first ever AI film forecast based on internal
              analytics and external research.
            </p>

            <div
              id="youtube-video"
              className="mt-6 aspect-video rounded-xl overflow-hidden"
            >
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/St0QgE9-gZA?si=bC1FYqjlmgIxcAvb"
                title="AI Film Forecasts for 2025"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <div className="mt-10 max-w-2xl">
              <h2 className="text-2xl font-semibold text-white">Summary:</h2>
              <ul className="mt-4 space-y-4 list-disc list-inside">
                <li>
                  By 2030, the AI film industry is expected to grow
                  significantly: 20,000–25,000 expert studios, each employing
                  5–10 creators, generating $250k+ annually per studio through
                  platforms like IZSIT.
                </li>
                <li>
                  Creativity and storytelling will flourish, amplified by strong
                  network effects as more creators join.
                </li>
                <li>
                  AI tools are democratizing filmmaking by reducing costs,
                  empowering screenwriters to independently produce and retain
                  creative control, and diversifying storytelling.
                </li>
                <li>
                  Blocked from Traditional Platforms: Major studios (Disney,
                  Warner Bros., Netflix, etc.) signed agreements preventing
                  fully AI-generated films.
                </li>
                <li>
                  YouTube&rsquo;s Limitations: Lacks categorization and features
                  tailored to movies/series, making discovery of AI films
                  difficult.
                </li>
                <li>
                  Top-Tier Creators (1–5%): 100,000–1.5 million expert creators.
                </li>
                <li>
                  IZSIT is the youngest company and the first to launch a
                  platform specifically for AI films.
                </li>
                <br />
                Market Fragmentation by Segmented:
                <ul className="ml-6 list-none">
                  <li className="ml-4">
                    - Demographics (kids, Gen Z, mainstream, artistic).
                  </li>
                  <li className="ml-4">
                    - Geographies (US, EU, India, SE Asia, China, Africa).
                  </li>
                  <li className="ml-4">
                    - Use cases (big-budget AI films, independent creators,
                    interactive stories).
                  </li>
                </ul>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
