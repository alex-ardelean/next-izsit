import MainLayout from "../../layouts/MainLayout";

export const metadata = {
  title: {
    template: "%s - Izsit",
    default: "An Interview with David Mann | Izsit",
  },
  description:
    "Join us as we delve into the creative world of David Mann, an innovative filmmaker pushing the boundaries of AI-generated short films and commercials.",
  openGraph: {
    title: "An Interview with David Mann | Izsit",
    description:
      "Explore the journey of David Mann, a pioneer in AI filmmaking, as he discusses his acclaimed project, 'The Pirate’s Curse,' and the future of AI in storytelling.",
    url: "https://izsit.com/blog/interview-with-david-mann-ai",
    type: "article",
    images: [
      {
        url: "/images/blog-posts/david-mann-ai.jpeg",
        width: 1200,
        height: 630,
        alt: "The Pirate’s Curse by David Mann | Izsit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "An Interview with David Mann | Izsit",
    description:
      "Dive into the creative process of David Mann as he shares insights on AI-generated filmmaking and his project, 'The Pirate’s Curse.'",
    images: ["/images/blog-posts/david-mann-ai.jpeg"],
  },
  schema: {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "An Interview with AI Filmmaker David Mann",
    description:
      "David Mann discusses his innovative approach to AI-generated short films and commercials, highlighting his project 'The Pirate’s Curse.'",
    image: {
      "@type": "ImageObject",
      url: "/images/blog-posts/david-mann-ai.jpeg",
      width: 1200,
      height: 630,
    },
    author: {
      "@type": "Person",
      name: "David Mann",
    },
    publisher: {
      "@type": "Organization",
      name: "Izsit",
      logo: {
        "@type": "ImageObject",
        url: "/images/metapictures/Izsit-front-picture.jpg",
      },
    },
    datePublished: "2025-01-30",
    dateModified: "2025-01-30",
  },
};

export default function DavidMannBlogPost() {
  return (
    <MainLayout>
      <div className="relative isolate overflow-hidden bg-gray-900">
        <div className="px-6 py-16 lg:px-8">
          <div className="mx-auto max-w-3xl text-base/7 text-gray-300">
            <p className="text-base/7 font-semibold text-emerald-400">
              Interview with David Mann
            </p>
            <h1 className="font-rajdhani mt-2 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Exploring AI Filmmaking with David Mann
            </h1>
            <div className="mt-4 text-sm text-gray-400">
              <p>Published on January 30, 2025</p>
              <p>
                Interview by{" "}
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
              <a
                href="https://www.youtube.com/@davidmann_ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300"
              >
                David Mann
              </a>
              , an innovative filmmaker, sat down with us to discuss his
              creative process, his journey into AI-generated content, and the
              story behind his acclaimed project, &quot;The Pirate’s
              Curse.&quot;
            </p>
            <div
              id="youtube-video"
              className="mt-6 aspect-video rounded-xl overflow-hidden"
            >
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/RyebdyrFJvo?si=hn4neWoxTQr5MjVX"
                title="David Mann - Interview"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="mt-16 max-w-2xl">
              <h2 className="text-3xl font-semibold text-white">
                The Pirate’s Curse
              </h2>
              <p className="mt-6 text-gray-300">
                The Pirate’s Curse blends adventure, humor, and cutting-edge
                technology to create a cinematic experience like no other.
              </p>
              <p className="mt-6 text-gray-300">
                In our conversation, David shared his inspirations, the
                challenges he faced while developing AI-generated content, and
                his thoughts on the future of filmmaking.
              </p>
            </div>
            <div className="mt-16 text-left">
              <p className="text-lg text-gray-300">
                Watch the full interview{" "}
                <a
                  href="#youtube-video"
                  className="text-emerald-400 hover:text-emerald-300 underline cursor-pointer"
                >
                  here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
