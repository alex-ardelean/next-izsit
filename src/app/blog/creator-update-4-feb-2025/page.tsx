import MainLayout from "../../layouts/MainLayout";

export const metadata = {
  title: {
    template: "%s - Izsit",
    default: "IZSIT - The First AI Streaming Platform on the Appstores",
  },
  description:
    "Exciting updates from IZSIT: signing an agreement with an accelerator, closing our seed round, and launching a $1M Creator Fund.",
  openGraph: {
    title: "IZSIT - The First AI Streaming Platform on the Appstores",
    description:
      "IZSIT announces major updates: Accelerator agreement signed, closing seed round soon, and a $1M Creator Fund investing in creators.",
    url: "https://izsit.com/blog/creator-update-4-feb-2025",
    type: "article",
    images: [
      {
        url: "/images/blog-posts/creator-update-1.jpeg",
        width: 1200,
        height: 630,
        alt: "IZSIT Creator Fund Update | Izsit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IZSIT - The First AI Streaming Platform on the Appstores",
    description:
      "IZSIT is investing $1M into creators, signing with an accelerator, and closing a seed round. Find out what’s next!",
    images: ["/images/blog-posts/creator-update-1.jpeg"],
  },
  schema: {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "IZSIT - The First AI Streaming Platform on the Appstores",
    description:
      "IZSIT announces exciting updates, including an accelerator agreement, a $1M Creator Fund, and upcoming funding plans.",
    image: {
      "@type": "ImageObject",
      url: "/images/blog-posts/creator-update-1.jpeg",
      width: 1200,
      height: 630,
    },
    author: {
      "@type": "Organization",
      name: "IZSIT",
    },
    publisher: {
      "@type": "Organization",
      name: "Izsit",
      logo: {
        "@type": "ImageObject",
        url: "/images/metapictures/Izsit-front-picture.jpg",
      },
    },
    datePublished: "2025-02-04",
    dateModified: "2025-02-04",
  },
};

export default function IZSITCreatorUpdate() {
  return (
    <MainLayout>
      <div className="relative isolate overflow-hidden bg-gray-900">
        <div className="px-6 py-16 lg:px-8">
          <div className="mx-auto max-w-3xl text-base/7 text-gray-300">
            <p className="text-base/7 font-semibold text-emerald-400">
              IZSIT Creator Update
            </p>
            <h1 className="font-rajdhani mt-2 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              IZSIT - The First AI Streaming Platform on the Appstores
            </h1>
            <div className="mt-4 text-sm text-gray-400">
              <p>Published on February 4, 2025</p>
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
              We have some exciting updates to share about the future of{" "}
              <span className="font-bold">IZSIT</span> and our commitment to
              creators.
            </p>

            {/* Embedded YouTube Video */}
            <div
              id="youtube-video"
              className="mt-6 aspect-video rounded-xl overflow-hidden"
            >
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/eF6YKNB1I14"
                title="IZSIT Creator Fund Update"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <div className="mt-16 max-w-2xl">
              <h2 className="text-3xl font-semibold text-white">
                Signing Agreement with an Accelerator
              </h2>
              <p className="mt-6 text-gray-300">
                We are thrilled to announce that we have signed an agreement
                with an accelerator program to take IZSIT to the next level.
                This partnership will help us scale and refine our AI-driven
                streaming platform.
              </p>

              <h2 className="mt-16 text-3xl font-semibold text-white">
                Closing Our Seed Round
              </h2>
              <p className="mt-6 text-gray-300">
                Our next big milestone is securing our seed round in the coming
                months. Investors are highly excited about our vision, and we
                are working hard to finalize funding to accelerate our growth.
              </p>

              <h2 className="mt-16 text-3xl font-semibold text-white">
                $1 Million Creator Fund
              </h2>
              <p className="mt-6 text-gray-300">
                We are investing <span className="font-bold">$1 million</span>{" "}
                directly into creators like you. Our Creator Fund will provide
                financial support between
                <span className="font-bold"> $5,000 - $25,000</span> to selected
                creators.
              </p>
              <p className="mt-6 text-gray-300">
                <strong>Starting date:</strong> July/August 2025.
              </p>

              <h2 className="mt-16 text-3xl font-semibold text-white">
                Seeking Your Feedback
              </h2>
              <p className="mt-6 text-gray-300">
                We want to hear from you! What do you think is the most fair and
                sustainable model for our investment? Should it be based on
                licensing, equity, or revenue-sharing? Your input will help
                shape the terms of the Creator Fund.
              </p>

              <h2 className="mt-16 text-3xl font-semibold text-white">
                90% Revenue Share for Independent Creators
              </h2>
              <p className="mt-6 text-gray-300">
                If we do not invest in you, don&rsquo;t worry—you still keep
                full control of your content. We are offering a{" "}
                <span className="font-bold">90% revenue share</span> to creators
                who own all their content.
              </p>
            </div>

            <div className="mt-16 text-left">
              <p className="text-lg text-gray-300">
                <strong>Important note:</strong> Nothing we have announced is
                100% final yet, but our investors are incredibly excited about
                the vision for the future of IZSIT.
              </p>
              <p className="mt-6 text-lg text-gray-300">
                We strive to be as transparent as possible and look forward to
                collaborating with more and more creators.
              </p>
              <p className="mt-6 text-lg text-gray-300">
                Special thanks to the creator who brought up some of the
                important feedback that led to this update—you know who you are!
              </p>
              <p className="mt-6 text-lg text-gray-300">
                You can review our current revenue-sharing agreement{" "}
                <a
                  href="https://drive.google.com/file/d/14G-fb3outSv_TzQ603ZSBm0WfcvSEpxM/view"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 underline"
                >
                  here
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
