"use client";

export default function Hero() {
  const handleScroll = () => {
    const section = document.getElementById("how-it-works");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative isolate overflow-hidden bg-gray-900">
      {/* SVG Background */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 -z-10 size-full stroke-white/10 [mask-image:radial-gradient(70%_40%_at_top_right,white,transparent)]"
      >
        <defs>
          {/* Define a linear gradient using emerald-500 */}
          <linearGradient
            id="emerald-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#34d399" /> {/* emerald-500 */}
            <stop offset="100%" stopColor="#10b981" /> {/* emerald-600 */}
          </linearGradient>

          {/* Use the gradient in the pattern */}
          <pattern
            x="50%"
            y={-1}
            id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
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

        {/* Apply the gradient to the rect */}
        <svg x="50%" y={-1} className="overflow-visible fill-gray-800/20">
          <path
            d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
            strokeWidth={0}
          />
        </svg>
        <rect
          fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)"
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

      {/* Content */}
      <div className="mx-auto max-w-7xl px-6 py-12 sm:py-40 lg:px-8 pt-14 relative">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-8 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
          <h1 className="font-rajdhani max-w-2xl text-balance text-5xl font-semibold tracking-tight text-white sm:text-7xl lg:col-span-2 xl:col-auto">
            {/* We Support AI Filmmakers to Earn, Inspire, and Shine */}
            The Home for AI Filmmakers
          </h1>
          <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1 relative z-10">
            <p className="text-pretty text-lg font-medium text-gray-200 sm:text-xl">
              {/* Submit your AI films, engage an audience eager for the future of
              storytelling, earn revenue, and take control of your creative
              success. */}
              IZSIT unites rising AI creators with global audiences, offering
              one platform to showcase, discover, and immerse in their work.
            </p>
            <div className="mt-10 flex flex-col items-center gap-y-4 sm:flex-row sm:gap-x-6">
              <button
                onClick={handleScroll}
                className="block w-full rounded-md bg-emerald-500 px-5 py-3 text-lg font-semibold text-gray-900 shadow-sm hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 sm:w-auto"
              >
                This is how it works ↓
              </button>
            </div>
          </div>
          <div className="relative mt-10 w-full sm:mt-16 lg:mt-0 xl:row-span-2 xl:row-end-2 xl:mt-36 hidden sm:block">
            <div
              style={{
                position: "relative",
                overflow: "hidden",
                paddingBottom: "56.25%",
                borderRadius: "1rem",
              }}
              className="bg-gray-900 "
            >
              <iframe
                src="https://cdn.jwplayer.com/previews/I8pbLvVc-PvlZUjlb"
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="auto"
                title="JW Player Video"
                style={{
                  position: "absolute",
                  borderRadius: "1rem",
                }}
                allowFullScreen
              ></iframe>
            </div>

            {/* Creator Credit */}
            <div className="absolute bottom-4 xl:bottom-8 left-4 bg-black/60 px-4 py-2 text-xs text-white rounded-md">
              <a
                href="https://app.izsit.com/m/5zMwYYJA/davidmann_ai?r=uWoJVoYQ"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Creator:{" "}
                <span className="font-semibold">DavidMann_AI</span>
              </a>
            </div>
          </div>
        </div>

        {/* Curved Arrow */}
        <svg
          className="absolute hidden xl:block top-32 left-[40%] z-0"
          width="250"
          height="150"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 50 C100 -20, 150 10, 230 130"
            stroke="#34d399"
            strokeWidth="4"
            fill="none"
            markerEnd="url(#arrowhead)"
          />
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="10"
              refX="7"
              refY="5"
              orient="auto"
            >
              <polygon points="0,0 10,5 0,10" fill="#34d399" />
            </marker>
          </defs>
        </svg>

        {/* Arrow Label */}
        <div className="absolute hidden top-40 xl:block left-[54%] text-emerald-300 text-xs font-medium">
          We ❤️ AI content like this!
        </div>
      </div>
    </div>
  );
}
