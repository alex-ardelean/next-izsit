import MainLayout from "../../../app/layouts/MainLayout";

export const metadata = {
  title: {
    template: "%s - Izsit",
    default: "A Conversation with Cheyne Logan | Izsit",
  },
  description:
    "Dive into the creative journey of award-winning filmmaker Cheyne Logan as he shares insights on AI filmmaking, life in Thailand, and the making of Pattaya Hero.",
  openGraph: {
    title: "A Conversation with Cheyne Logan | Izsit",
    description:
      "Dive into the creative journey of award-winning filmmaker Cheyne Logan as he shares insights on AI filmmaking, life in Thailand, and the making of Pattaya Hero.",
    url: "https://izsit.com/blog/a-conversation-with-award-winning-cheyne-logan",
    type: "article",
    images: [
      {
        url: "/images/Pattaya Hero.jpg",
        width: 1200,
        height: 630,
        alt: "Pattaya Hero by Cheyne Logan | Izsit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "A Conversation with Cheyne Logan | Izsit",
    description:
      "Explore the journey of award-winning filmmaker Cheyne Logan as he discusses AI filmmaking, storytelling, and his life in Thailand.",
    images: ["/images/Pattaya Hero.jpg"],
  },
  schema: {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "A Conversation with Award-Winning Filmmaker Cheyne Logan",
    description:
      "Award-winning filmmaker Cheyne Logan shares his journey in AI filmmaking, life in Thailand, and the making of Pattaya Hero.",
    image: {
      "@type": "ImageObject",
      url: "/images/Pattaya Hero.jpg",
      width: 1200,
      height: 630,
    },
    author: {
      "@type": "Person",
      name: "Cheyne Logan",
    },
    publisher: {
      "@type": "Organization",
      name: "Izsit",
      logo: {
        "@type": "ImageObject",
        url: "/images/metapictures/Izsit-front-picture.jpg",
      },
    },
    datePublished: "2024-12-18",
    dateModified: "2024-12-18",
  },
};

export default function CheyneLoganBlogPost() {
  return (
    <MainLayout>
      <div className="relative isolate overflow-hidden bg-gray-900">
        <div className="px-6 py-16 lg:px-8">
          <div className="mx-auto max-w-3xl text-base/7 text-gray-300">
            <p className="text-base/7 font-semibold text-emerald-400">
              Interview with Cheyne Logan
            </p>
            <h1 className="font-rajdhani mt-2 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              A Conversation with Award-Winning Filmmaker Cheyne Logan
            </h1>
            {/* Date and Interviewer */}
            <div className="mt-4 text-sm text-gray-400">
              <p>Published on December 18, 2024</p>
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
                href="https://www.youtube.com/@LoganInThailand"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 "
              >
                Cheyne Logan
              </a>
              , an AI-driven filmmaker, sat down with us to discuss his creative
              process, his journey in Thailand, and the story behind his
              award-winning film Pattaya Hero.
            </p>

            {/* Embedded YouTube Video */}
            <div
              id="youtube-video"
              className="mt-6 aspect-video rounded-xl overflow-hidden"
            >
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/bNge_f6Ekyw?si=1NxGHmRDplwdjNsl"
                title="Cheyne Logan - Interview"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Section 1: Introduction */}
            <div className="mt-10 max-w-2xl">
              <h2 className="text-3xl font-semibold text-white">
                From Australia to Thailand
              </h2>
              <p className="mt-6 text-gray-300">
                Cheyne Logan’s journey is a testament to resilience and
                reinvention. <br></br>
                <br></br>After facing personal tragedy, he moved to Thailand,
                immersing himself in a new culture that eventually shaped his
                voice as a filmmaker.<br></br>
                <br></br> With over a decade of experience living in Thailand,
                Cheyne reflects in the interview on the profound impact the
                country has had on his storytelling.
              </p>
            </div>

            <div className="mt-16 max-w-2xl">
              <h2 className="text-3xl font-semibold text-white">
                The Story Behind Pattaya Hero
              </h2>
              <p className="mt-6 text-gray-300">
                <a
                  href="https://www.youtube.com/watch?v=j6Q9lvulgr0&t=6s"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300"
                >
                  Pattaya Hero
                </a>
                , a short film created entirely with AI tools, explores the
                psychological journey of expats in Thailand. Cheyne shared how
                the film delves into themes of denial, temptation, and
                self-discovery, stating:
              </p>

              {/* Quote Block */}
              <figure className="mt-6 border-l border-emerald-400 pl-6 text-lg">
                <blockquote className="font-semibold text-gray-300 italic">
                  <p>
                    “It’s a story many expats can relate to—the highs, the lows,
                    and ultimately, the moment of reckoning.” – Cheyne Logan
                  </p>
                </blockquote>
              </figure>

              <p className="mt-6 text-gray-300">
                Told through the eyes of its protagonist, the film masterfully
                captures the allure and pitfalls of expat life, offering a
                nuanced view of their experiences. It challenges common
                assumptions about Thailand, presenting a raw and honest
                portrayal of expat life and its complexities.
              </p>
            </div>

            {/* Section 3: AI and the Future of Filmmaking */}
            <div className="mt-16 max-w-2xl">
              <h2 className="text-3xl font-semibold text-white">
                Revolutionizing Film with AI
              </h2>
              <p className="mt-6 text-gray-300">
                Cheyne believes that AI is transforming filmmaking by
                democratizing access to the medium. With AI, filmmakers no
                longer need massive budgets or large crews to tell compelling
                stories. Instead, they can focus on what matters most: the
                narrative.
              </p>

              {/* Quote Block */}
              <figure className="mt-6 border-l border-emerald-400 pl-6 text-lg">
                <blockquote className="font-semibold text-gray-300 italic">
                  <p>
                    “There’s a gap in the field—more writers need to jump into
                    AI filmmaking to realize its full potential.” – Cheyne Logan
                  </p>
                </blockquote>
              </figure>

              <p className="mt-6 text-gray-300">
                His approach emphasizes storytelling over visuals. Cheyne
                utilized AI for every aspect of the film, from writing to
                editing. <br></br>
                <br></br>Reflecting on the process, he explained:
              </p>

              {/* Closing Quote */}
              <figure className="mt-6 border-l border-emerald-400 pl-6 text-lg">
                <blockquote className="font-semibold text-gray-300 italic">
                  <p>
                    “AI allows you to focus on the narrative, which is king. If
                    the story is good, people will watch. It doesn’t matter if
                    it’s filmed with AI or on a secondhand camera—the narrative
                    is what truly resonates.” – Cheyne Logan
                  </p>
                </blockquote>
              </figure>
              {/* Watch the whole interview link */}
              <div className="mt-16 text-left">
                <p className="text-lg text-gray-300">
                  Watch the whole interview{" "}
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
      </div>
    </MainLayout>
  );
}
