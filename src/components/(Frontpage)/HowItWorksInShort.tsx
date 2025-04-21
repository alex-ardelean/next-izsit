import {
  CurrencyDollarIcon,
  UserGroupIcon,
  StarIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/solid";

const steps = [
  {
    name: "100 Studios",
    description:
      "We’re selecting the first 100 AI creators to fund and partner with in a 50/50 revenue-sharing model.",
    icon: UserGroupIcon,
  },
  {
    name: "Up to $25k",
    description:
      "Receive up to $25,000 from Izsit to help launch your creative journey and bring your AI projects to life.",
    icon: BriefcaseIcon,
  },
  {
    name: "$250K Average Earnings",
    description:
      "The average creator on Izsit can earn around $250,000 annually, with top creators earning significantly more.",
    icon: CurrencyDollarIcon,
  },
  {
    name: "90% Revenue Share",
    description:
      "Prefer independence? Retain control of your work and earn 90% of the revenue you generate on our platform.",
    icon: StarIcon,
  },
];
export default function HowItWorksInShort() {
  return (
    <div
      id="how-it-works"
      className="relative isolate overflow-hidden bg-gray-900 py-12 sm:py-32"
    >
      {/* SVG Background */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(10%_0%_at_top_right,white,transparent)]"
      >
        <defs>
          <linearGradient id="emerald-gradient" x1="0%" y1="0%" x2="100%">
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
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold text-emerald-600">
            How it works in short
          </h2>
          <p className="font-rajdhani mt-2 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-balance">
            We’re Backing AI Creators With Funding and Revenue Sharing
          </p>
          <p className="mt-6 text-lg text-gray-300">
            Funding, Revenue, and Recognition for Quality AI Creators. Submit
            your content and captivate a global audience.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-lg font-semibold text-white">
                  <step.icon
                    className="h-8 w-8 flex-none text-emerald-600"
                    aria-hidden="true"
                  />
                  {step.name}
                </dt>
                <dd className="mt-4 text-base text-gray-300">
                  {step.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="mt-20 text-center">
          <a
            href="/ai-video-creators"
            className="block w-full rounded-md bg-emerald-600 px-8 py-4 text-xl font-semibold text-gray-900 shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 sm:inline-block sm:w-auto"
          >
            Learn more
          </a>
        </div>
      </div>
    </div>
  );
}
