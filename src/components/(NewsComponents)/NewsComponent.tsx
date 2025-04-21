"use client";

import { useEffect, useState } from "react";

type Post = {
  _id: string;
  title: string;
  description: string;
  youtubeLink: string;
  date: string;
};

export default function News() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/news", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch news posts.");
        const data: Post[] = await res.json();
        setPosts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  const [latestPost, ...otherPosts] = posts;

  return (
    <div className="relative isolate overflow-hidden bg-gray-900">
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

      <div className="mx-auto max-w-7xl px-6 py-12 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Latest AI Video News
          </h2>
          <p className="mt-2 text-lg text-gray-300">
            Explore the cutting-edge advancements, insights, and stories from
            the world of AI-driven video creation. Discover how AI is
            transforming storytelling, content production, and visual
            creativity.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center mt-16">
            <div className="h-16 w-16 border-4 border-t-emerald-500 border-gray-300 rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {latestPost && (
              <div className="mt-16 lg:mt-20 flex flex-col lg:flex-row lg:gap-8">
                <div className="relative w-full lg:w-2/3">
                  <iframe
                    src={`https://www.youtube.com/embed/${new URL(
                      latestPost.youtubeLink
                    ).searchParams.get("v")}`}
                    className="aspect-video w-full rounded-2xl bg-gray-100"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="mt-8 lg:mt-0 lg:w-1/3 flex flex-col justify-center">
                  <time
                    dateTime={latestPost.date}
                    className="text-sm text-gray-400"
                  >
                    {new Date(latestPost.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <h3 className="mt-3 text-3xl font-semibold text-white">
                    {latestPost.title}
                  </h3>
                  <p className="mt-4 text-lg text-gray-300">
                    {latestPost.description}
                  </p>
                </div>
              </div>
            )}

            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {otherPosts.map((post) => (
                <article
                  key={post._id}
                  className="flex flex-col items-start justify-between"
                >
                  <div className="relative w-full">
                    <iframe
                      src={`https://www.youtube.com/embed/${new URL(
                        post.youtubeLink
                      ).searchParams.get("v")}`}
                      className="aspect-video w-full rounded-2xl bg-gray-100"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="max-w-xl">
                    <div className="mt-8 flex items-center gap-x-4 text-xs">
                      <time dateTime={post.date} className="text-gray-500">
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                    </div>
                    <h3 className="mt-3 text-lg font-semibold text-white">
                      {post.title}
                    </h3>
                    <p className="mt-5 line-clamp-3 text-sm text-gray-300">
                      {post.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
