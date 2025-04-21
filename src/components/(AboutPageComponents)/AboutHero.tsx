"use client";
import Link from "next/link";
import Image from "next/image";

export default function AboutHero() {
  return (
    <div className="relative isolate overflow-hidden bg-gray-900 ">
      {/* Background Decoration */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 -z-10 w-full h-full stroke-white/10 [mask-image:radial-gradient(10%_10%_at_top_right,white,transparent)]"
      >
        <defs>
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
        className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
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
        <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-8 xl:grid-cols-1 xl:rows-1 xl:gap-x-8">
          <h1 className="font-rajdhani max-w-2xl text-balance text-5xl font-semibold tracking-tight text-white sm:text-7xl lg:col-span-2 xl:col-auto">
            AI is the new Hollywood — We’re supporting the leading creators
          </h1>
          <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
            <p
              id="our-mission"
              className="text-pretty text-base text-gray-200 sm:text-lg"
            >
              <strong>At Izsit,</strong> we believe the film industry is on the
              brink of an AI-driven transformation.<br></br>
              <br></br> We’re here to fund and partner with the most innovative
              creators, empowering them to bring their bold visions to life.
            </p>
            <p className="mt-4 text-pretty text-base  text-gray-200 sm:text-lg">
              <strong className="underline">Our mission</strong> is to support
              AI video creators with the resources they need to produce
              groundbreaking stories and ensure their work reaches audiences
              worldwide through strategic distribution and unwavering
              collaboration — on our own platform{" "}
              {/* <Link
                href="https://app.izsit.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:underline"
              >
                our own platform
              </Link>{" "} */}
              and across other leading platforms.
            </p>
          </div>
          <Image
            alt="Giacomo Bonavera, Founder of Izsit"
            src="/images/profile-pics/Giacomo-founder-of-Izsit.jpg"
            width={600} // Adjust the width as per your requirement
            height={500} // Adjust the height as per your requirement
            className="mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover transform sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36 lg:rotate-2"
            priority // Ensures the image is loaded quickly
          />
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-gray-900 sm:h-32" />
    </div>
  );
}
