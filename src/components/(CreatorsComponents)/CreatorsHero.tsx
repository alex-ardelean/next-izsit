"use client";

export default function CreatorsHero() {
  const handleScroll = () => {
    const section = document.getElementById("send-portfolio");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLearnMoreScroll = () => {
    const section = document.getElementById("why-izsit");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative isolate overflow-hidden bg-gray-900">
      {/* SVG Background */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 -z-10 size-full stroke-white/10 [mask-image:radial-gradient(60%_20%_at_top_right,white,transparent)]"
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

      {/* Gradient Effect */}
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
      <div className="mx-auto max-w-7xl px-6 pb-12 pt-6 sm:pb-32 lg:flex lg:px-8 lg:py-20">
        <div className="mx-auto max-w-2xl shrink-0 lg:mx-0 lg:pt-8">
          <h1 className="font-rajdhani mt-10 text-pretty text-5xl font-semibold tracking-tight text-white sm:text-7xl">
            We’re Backing AI Creators With Funding and Revenue Sharing
          </h1>
          <p className="mt-8 text-pretty text-lg font-medium text-gray-200 sm:text-xl/8">
            Funding, Revenue, and Recognition for Quality AI Creators. Submit
            your content and captivate a global audience.
          </p>
          <div className="mt-10 flex flex-col items-center gap-y-4 sm:flex-row sm:items-center sm:gap-x-6">
            <button
              onClick={handleScroll}
              className="w-full rounded-md bg-emerald-500 px-5 py-3 text-lg font-semibold text-gray-900 shadow-sm hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 sm:w-auto"
            >
              Submit your content now
            </button>
            <button
              onClick={handleLearnMoreScroll}
              className="text-sm font-semibold text-white sm:ml-6 sm:text-start"
            >
              Learn more <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
        <div className="relative mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="relative max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <img
              alt="Pattaya Hero"
              src="/images/Pattaya Hero.jpg"
              width={2432}
              height={1442}
              className="w-[76rem] rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10"
            />
            {/* Creator Credit */}
            <div className="absolute bottom-4 left-4 bg-black/60 px-4 py-2 text-xs text-white rounded-md">
              <a
                href="https://www.youtube.com/@LoganInThailand"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Creator:{" "}
                <span className="font-semibold">Logan In Thailand</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
