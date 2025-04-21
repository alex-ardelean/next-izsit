export default function HowWeSupportSection() {
  return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-12 sm:py-32">
      {/* SVG Background */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 -z-10 w-full h-full stroke-white/10 [mask-image:radial-gradient(10%_10%_at_top_right,white,transparent)]"
      >
        <defs>
          <linearGradient id="emerald-gradient" x1="0%" y1="0%" x2="100%">
            <stop offset="0%" stopColor="#34d399" /> {/* emerald-500 */}
            <stop offset="100%" stopColor="#10b981" /> {/* emerald-600 */}
          </linearGradient>

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

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none lg:grid lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-7">
            <p className="text-base font-semibold text-emerald-400">
              The Future of Film Creation
            </p>
            <h2 className="font-rajdhani mt-2 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              AI is Revolutionizing Hollywood
            </h2>
            <p className="mt-6 text-lg text-gray-300">
              The future of filmmaking is undergoing a seismic transformation,
              with AI reshaping the way stories are told.
            </p>
            <p className="mt-6 text-lg text-gray-300">
              At Izsit, we champion this evolution, supporting visionary
              creators as they harness AI to push boundaries and captivate
              audiences worldwide.
            </p>

            <p className="mt-6 text-lg text-gray-300">We are here to:</p>

            <ul className="mt-6 space-y-2 text-lg text-gray-300">
              <li>
                🦖 Democratize filmmaking with AI — The Spielberg of tomorrow
                could be anyone with AI and vision.
              </li>
              <br></br>
              <li>
                🚀 Offer funding to bring high-IP creative visions to life.
              </li>
              <br></br>
              <li>
                🌎 Empower original, long-form storytelling for global
                audiences.
              </li>
              <br></br>
              <li>💰 Provide creators with sustainable revenue streams.</li>
              <br></br>
              <li>
                🌐 Help distribute creators&apos; content on our own platform{" "}
                {/* <a
                  href="https://app.izsit.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline"
                >
                  our own platform
                </a>{" "} */}
                and other leading platforms.
              </li>
            </ul>
          </div>

          {/* Quote Section */}
          <div className="relative mt-16 lg:mt-0 lg:col-span-5 lg:pt-24">
            <figure className="border-l border-emerald-400 pl-8">
              <blockquote className="text-xl font-semibold tracking-tight text-white">
                <p>
                  &quot;Within the next two years, I&apos;m 100% sure
                  there&apos;s going to be a Game of Thrones-style series, just
                  as epic, made entirely by AI.&quot;
                </p>
              </blockquote>
              <figcaption className="mt-8 flex gap-x-4">
                <img
                  alt="Founder"
                  src="/images/profile-pics/Giacomo-founder-of-Izsit.jpg"
                  className="mt-1 h-10 w-10 flex-none rounded-full bg-gray-50 object-cover"
                />
                <div className="text-sm">
                  <div className="font-semibold text-white">
                    Giacomo Bonavera
                  </div>
                  <div className="text-gray-400">
                    <a
                      href="https://www.linkedin.com/in/giacomobonavera/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline"
                    >
                      @Giacomo
                    </a>
                    , Founder of Izsit <span className="text-gray-400"></span>{" "}
                  </div>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
}
