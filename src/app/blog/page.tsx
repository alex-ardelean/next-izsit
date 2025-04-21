import MainLayout from "../layouts/MainLayout";

const posts = [
  {
    id: 1,
    title: "IZSIT - The First AI Streaming Platform on the Appstores",
    href: "/blog/creator-update-4-feb-2025",
    description:
      "We have some exciting updates to share about the future of IZSIT and our commitment to creators.",
    imageUrl: "/images/blog-posts/creator-update-1.jpeg",
    date: "Feb 4, 2025",
    datetime: "2025-02-4",
    category: { title: "Update" },
    author: {
      name: "Giacomo Bonavera",
      role: "Founder / CEO",
      href: "/about",
      imageUrl: "/images/profile-pics/Giacomo-founder-of-Izsit.jpg",
    },
  },

  {
    id: 2,
    title: "An Interview with David Mann",
    href: "/blog/interview-with-david-mann-ai",
    description:
      "We delve into the creative world of David Mann, an innovative filmmaker pushing the boundaries of AI-generated short films.",
    imageUrl: "/images/blog-posts/david-mann-ai.jpeg",
    date: "Jan 30, 2025",
    datetime: "2025-01-30",
    category: { title: "Interview" },
    author: {
      name: "Giacomo Bonavera",
      role: "Founder / CEO",
      href: "/about",
      imageUrl: "/images/profile-pics/Giacomo-founder-of-Izsit.jpg",
    },
  },
  {
    id: 3,
    title: "IZSIT Launch Celebration",
    href: "/blog/first-day-launch-with-olya-polyakova",
    description:
      "Celebrating IZSIT's public launch with over 100,000 views on Day 1! Explore our app on all major platforms and join the revolution in AI filmmaking.",
    imageUrl: "/images/blog-posts/live-on-all-app-stores.jpg",
    date: "Jan 23, 2025",
    datetime: "2025-01-23",
    category: { title: "IZSIT launch" },
    author: {
      name: "Giacomo Bonavera",
      role: "Founder / CEO",
      href: "/about",
      imageUrl: "/images/profile-pics/Giacomo-founder-of-Izsit.jpg",
    },
  },
  {
    id: 4,
    title: "AI Film Forecasts for 2025",
    href: "/blog/ai-film-forecasts-for-2025",
    description:
      "IZSIT brings you the first ever AI film forecast based on internal analytics and external research.",
    imageUrl: "/images/ai-film-forecast-vertical-picture-blog.jpeg",
    date: "Jan 10, 2025",
    datetime: "2025-01-10",
    category: { title: "AI Film Forecasts 2025" },
    author: {
      name: "Giacomo Bonavera",
      role: "Founder / CEO",
      href: "/about",
      imageUrl: "/images/profile-pics/Giacomo-founder-of-Izsit.jpg",
    },
  },
  {
    id: 5,
    title: "A Conversation with Award-Winning Filmmaker Cheyne Logan",
    href: "/blog/a-conversation-with-award-winning-cheyne-logan",
    description:
      "Cheyne Logan, an AI-driven filmmaker, sat down with us to discuss his creative process, his journey in Thailand, and the story behind his award-winning film Pattaya Hero.",
    imageUrl: "/images/Pattaya Hero.jpg",
    date: "Dec 18, 2024",
    datetime: "2024-12-18",
    category: { title: "AI Film Creators" },
    author: {
      name: "Giacomo Bonavera",
      role: "Founder / CEO",
      href: "/about",
      imageUrl: "/images/profile-pics/Giacomo-founder-of-Izsit.jpg",
    },
  },
];

export const metadata = {
  title: {
    template: "%s - Izsit",
    default: "Izsit Blog | Insights and Stories from Izsit Creators",
  },
  description:
    "Discover inspiring stories and insights from Izsit AI film creators worldwide. Stay updated with the latest trends in AI-driven storytelling.",
  openGraph: {
    title: "Izsit Blog | Insights and Stories from Izsit Creators",
    description:
      "Discover inspiring stories and insights from Izsit AI film creators worldwide. Stay updated with the latest trends in AI-driven storytelling.",
    url: "https://izsit.com/blog",
    type: "website",
    images: [
      {
        url: "/images/metapictures/Izsit-front-picture.jpg",
        width: 1200,
        height: 630,
        alt: "Izsit Blog | Insights and Stories from Izsit Creators",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Izsit Blog | Insights and Stories from Izsit Creators",
    description:
      "Discover inspiring stories and insights from Izsit AI film creators worldwide. Stay updated with the latest trends in AI-driven storytelling.",
    images: ["/images/metapictures/Izsit-front-picture.jpg"],
  },
  schema: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url: "https://izsit.com/blog",
    name: "Izsit Blog",
    description:
      "Discover inspiring stories and insights from Izsit AI film creators worldwide. Stay updated with the latest trends in AI-driven storytelling.",
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

export default function BlogPage() {
  return (
    <MainLayout>
      <div className="relative isolate overflow-hidden bg-gray-900">
        {/* Background SVG */}
        <svg
          aria-hidden="true"
          className="absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(40%_0%_at_top_right,white,transparent)]"
        >
          <defs>
            <linearGradient id="emerald-gradient" x1="0%" y1="0%" x2="100%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
            <pattern
              id="background-pattern"
              x="50%"
              y={-1}
              width={200}
              height={200}
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M.5 200V.5H200"
                fill="none"
                stroke="url(#emerald-gradient)"
              />
            </pattern>
          </defs>
          <rect
            fill="url(#background-pattern)"
            width="100%"
            height="100%"
            strokeWidth={0}
          />
        </svg>
        <div
          aria-hidden="true"
          className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(100%-30rem)] xl:left-[calc(50%-24rem)]"
        >
          <div
            style={{
              clipPath:
                "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
            }}
            className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-emerald-400 to-emerald-600 opacity-20"
          />
        </div>

        {/* Blog Content */}
        <div className="mx-auto max-w-7xl px-6 py-12 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-4xl">
            <h2 className="font-rajdhani text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              From the blog
            </h2>
            <p className="mt-2 text-lg text-gray-300">
              Stories from AI Film Creators around the world.
            </p>
            <div className="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="relative isolate flex flex-col gap-8 lg:flex-row "
                >
                  <a
                    href={post.href}
                    className="relative aspect-video sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0 "
                  >
                    <img
                      alt=""
                      src={post.imageUrl}
                      className="absolute inset-0 size-full rounded-2xl bg-gray-50 object-cover"
                    />
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                  </a>

                  <div>
                    <div className="flex items-center gap-x-4 text-xs ">
                      <time dateTime={post.datetime} className="text-gray-500">
                        {post.date}
                      </time>
                      <a className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                        {post.category.title}
                      </a>
                    </div>
                    <div className="group relative max-w-xl">
                      <h3 className="mt-3 text-lg font-semibold text-white group-hover:text-gray-300">
                        <a href={post.href}>
                          <span className="absolute inset-0" />
                          {post.title}
                        </a>
                      </h3>
                      <p className="mt-5 text-sm text-gray-300">
                        {post.description}
                      </p>
                    </div>
                    <div className="mt-6 flex border-t border-gray-900/5 pt-6">
                      <div className="relative flex items-center gap-x-4">
                        <img
                          alt=""
                          src={post.author.imageUrl}
                          className="size-10 rounded-full bg-gray-50 object-cover"
                        />

                        <div className="text-sm">
                          <p className="font-semibold text-white">
                            <a href={post.author.href}>
                              <span className="absolute inset-0" />
                              {post.author.name}
                            </a>
                          </p>
                          <p className="text-gray-300">{post.author.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
