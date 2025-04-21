import Link from "next/link";

export default function WhyIzsit() {
  return (
    <div id="why-izsit" className="overflow-hidden bg-gray-900 py-12 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading Section */}
        <div className="max-w-4xl">
          <h2 className="font-rajdhani text-pretty text-5xl font-semibold tracking-tight text-white sm:text-6xl">
            Why Izsit?
          </h2>
          <p className="mt-6 text-lg text-gray-300">
            At Izsit, we’re revolutionizing how AI creators monetize their work
            and gain recognition.<br></br>
            <br></br> We provide creators with funding and community to turn
            bold ideas into reality.<br></br>
            <br></br>{" "}
            <Link
              href="/about#our-mission"
              className="text-emerald-400 hover:underline"
            >
              Our mission
            </Link>{" "}
            is to empower originality while ensuring creators retain ownership
            and reap the rewards they deserve.
          </p>
        </div>

        {/* Main Content Section */}
        <section className="mt-20 grid grid-cols-1 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-16">
          <div className="lg:pr-8">
            <h2 className="font-rajdhani text-pretty text-3xl font-semibold tracking-tight text-white">
              What we’re looking for
            </h2>
            <p className="mt-6 text-lg text-gray-300">
              Whether you’re a filmmaker, CGI artist, or visionary storyteller,
              Izsit is here to empower you.<br></br>
              <br></br>It doesn’t matter if you’re a solo creator or part of a
              studio—we’re looking for innovative minds ready to push the
              boundaries of AI storytelling.
              <br></br>
              <br></br> We offer{" "}
              <span className="font-bold underline">two</span> unique paths for
              you to succeed:
            </p>
            <ul className="mt-6 space-y-4 text-lg text-gray-300">
              <li>
                🎥 <strong>Partnership Opportunity:</strong> Receive up to $25k
                in funding while collaborating with Izsit to bring your creative
                vision to life. Through this IP partnership, you retain a
                significant percentage of ownership of your work while
                benefiting from our resources and support to ensure shared
                success and growth. Check our Creative Partner Agreement{" "}
                <a
                  href="https://drive.google.com/file/d/14G-fb3outSv_TzQ603ZSBm0WfcvSEpxM/view"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline"
                >
                  here
                </a>
                .
              </li>

              <li>
                🌟 <strong>Keep 100% Ownership:</strong> Retain complete control
                of your IP and earn revenue through ads on our platform, which
                spans web, iOS, Android, Roku, and all major streaming
                platforms. Leverage broad distribution to maximize your audience
                and earnings.
              </li>
            </ul>
            <p className="mt-6 text-lg text-gray-300">
              With Izsit, you’re not just creating content—you’re shaping the
              future of AI-powered storytelling while tapping into a global
              audience.
            </p>
          </div>

          {/* Numbers Section */}
          <div className="max-lg:mt-16 lg:col-span-1">
            <p className="text-base font-semibold text-emerald-400">
              Ready to join the top AI video creators?
            </p>

            <hr className="mt-6 border-t border-gray-700" />
            <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div className="flex flex-col gap-y-2 border-b border-dotted border-gray-700 pb-4">
                <dt className="text-sm text-gray-400">Creators to be Funded</dt>
                <dd className="order-first text-5xl font-bold tracking-tight text-white">
                  100
                </dd>
                <p className="text-base text-gray-400">
                  We’re partnering with the first 100 AI creators to provide
                  funding and support.
                </p>
              </div>

              <div className="flex flex-col gap-y-2 border-b border-dotted border-gray-700 pb-4">
                <dt className="text-sm text-gray-400">Funding Up to</dt>
                <dd className="order-first text-5xl font-bold tracking-tight text-white">
                  $25k
                </dd>
                <p className="text-base text-gray-400">
                  Get up to $25,000 to kickstart your creative journey.
                </p>
              </div>
              <div className="flex flex-col gap-y-2 max-sm:border-b max-sm:border-dotted max-sm:border-gray-700 max-sm:pb-4">
                <dt className="text-sm text-gray-400">Estimated Earnings</dt>
                <dd className="order-first text-5xl font-bold tracking-tight text-white">
                  $250k+
                </dd>
                <p className="text-base text-gray-400">
                  Top creators on Izsit can earn an estimated $250,000 annually.
                </p>
              </div>

              <div className="flex flex-col gap-y-2">
                <dt className="text-sm text-gray-400">Revenue Share</dt>
                <dd className="order-first text-5xl font-bold tracking-tight text-white">
                  90%
                </dd>
                <p className="text-base text-gray-400">
                  Prefer independence? Keep full control and earn 90% of the
                  revenue.
                </p>
              </div>
            </dl>
          </div>
        </section>
      </div>
    </div>
  );
}
