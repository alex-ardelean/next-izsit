import MainLayout from "../../layouts/MainLayout";
import Image from "next/image";

export const metadata = {
  title: {
    template: "%s - Izsit",
    default: "IZSIT Launch Celebration | Izsit",
  },
  description:
    "Celebrating IZSIT's public launch with over 100,000 views on Day 1! Explore our app on all major platforms and join the revolution in AI filmmaking.",
  openGraph: {
    title: "IZSIT Launch Celebration | Izsit",
    description:
      "Celebrating IZSIT's public launch with over 100,000 views on Day 1! Explore our app on all major platforms and join the revolution in AI filmmaking.",
    url: "https://izsit.com/blog/first-day-launch-with-olya-polyakova",
    type: "article",
    images: [
      {
        url: "/images/blog-posts/live-on-all-app-stores.jpg",
        width: 1200,
        height: 630,
        alt: "IZSIT Launch Celebration | Izsit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IZSIT Launch Celebration | Izsit",
    description:
      "Celebrating IZSIT's public launch with over 100,000 views on Day 1! Explore our app on all major platforms and join the revolution in AI filmmaking.",
    images: ["/images/blog-posts/live-on-all-app-stores.jpg"],
  },
  schema: {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "IZSIT Launch Celebration",
    description:
      "Celebrating IZSIT's public launch with over 100,000 views on Day 1! Explore our app on all major platforms and join the revolution in AI filmmaking.",
    image: {
      "@type": "ImageObject",
      url: "/images/blog-posts/live-on-all-app-stores.jpg",
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
    datePublished: "2025-01-22",
    dateModified: "2025-01-22",
  },
};

export default function IzsitLaunchCelebration() {
  return (
    <MainLayout>
      <div className="relative isolate overflow-hidden bg-gray-900">
        <div className="px-6 py-16 lg:px-8">
          <div className="mx-auto max-w-3xl text-base/7 text-gray-300">
            <p className="text-base/7 font-semibold text-emerald-400">
              Launch Celebration
            </p>
            <h1 className="font-rajdhani mt-2 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              IZSIT Launch Celebration
            </h1>
            <div className="mt-4 text-sm text-gray-400">
              <p>Published on January 23, 2025</p>
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
              We’re thrilled to share that IZSIT went public with its launch
              yesterday, and we hit over 100,000 views across social media and
              our platform in 1 day! 🚀🎉
            </p>
            <div
              id="youtube-video"
              className="mt-6 aspect-video rounded-xl overflow-hidden"
            >
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/NwsUI263VJU?si=FdtZgnQoJePBbMav"
                title="IZSIT Launch Celebration"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <p className="mt-4 text-lg text-gray-300">
              You can now download the app on all major app stores, including{" "}
              <a
                href="https://apps.apple.com/us/app/izsit/id6740759741?platform=iphone"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-500"
              >
                Apple
              </a>
              ,{" "}
              <a
                href="https://play.google.com/store/apps/details?id=com.izsit.izsit"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-500"
              >
                Android
              </a>
              , Roku, and Amazon Fire. Wherever you are, you can watch
              incredible films on IZSIT through your mobile, tablet, or TV.
            </p>

            <p className="mt-4 text-lg text-gray-300">
              This is a monumental day for the world of AI filmmaking. To all
              the creators who’ve joined IZSIT and are already uploading your
              amazing videos—thank you! Your work is what makes this platform
              truly revolutionary.
            </p>

            <p className="mt-4 text-lg text-gray-300">
              For our launch, we collaborated with the famous Ukrainian singer{" "}
              <a
                href="https://www.instagram.com/p/DFIPdI1MvXg/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold  hover:underline text-emerald-500"
              >
                Olya Polyakova
              </a>{" "}
              on a music video.
            </p>

            <p className="mt-4 text-lg text-gray-300">
              Here’s to the future of film. Thank you, creators, for making this
              possible!
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
