import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";

const faqs = [
  {
    question: "What is Izsit’s funding model for AI creators?",
    answer:
      "We’re selecting the first 100 AI creators to fund and partner with in a revenue-sharing model. This ensures that creators are compensated fairly while building their audience.",
  },
  {
    question: "How much can creators earn on Izsit?",
    answer:
      "Top creators on Izsit can earn an estimated $250,000 annually, building thriving creative businesses through sustainable revenue streams.",
  },

  {
    question: "What financial support does Izsit offer to creators?",
    answer:
      "Izsit provides up to $25,000 in funding to help AI creators launch their creative journey and bring high-IP projects to life.",
  },
  {
    question: "Can creators retain control of their work?",
    answer:
      "Yes, creators who prefer independence can retain control of their work and earn 90% of the revenue generated on our platform.",
  },
  {
    question: "What challenges does Izsit address for AI creators?",
    answer:
      "Currently, there is no dedicated platform for AI films. On Izsit, everyone knows they are engaging with AI-created content, fostering transparency and trust. This is crucial, as many people remain skeptical when the origins of the content are unclear. Our platform helps address this gap, while also supporting originality and the monetization of AI-driven work.",
  },
  {
    question: "Who can join Izsit?",
    answer: (
      <>
        We are seeking AI video artists who are passionate about creating
        high-quality content. While we do not provide tools, we offer a vibrant
        community and robust content distribution network to help you succeed
        and reach a global audience. Creators can submit their content directly
        through our platform by clicking{" "}
        <a
          href="/ai-video-creators#send-portfolio"
          className="text-emerald-400 hover:underline"
        >
          here
        </a>
        .
      </>
    ),
  },
];

export default function FAQ() {
  return (
    <div id="faq" className="relative isolate overflow-hidden bg-gray-900">
      {/* Background */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(40%_0%_at_top_right,white,transparent)]"
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

      {/* FAQ Section */}
      <div className="mx-auto max-w-7xl px-6 py-12 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-4xl divide-y divide-gray-500/25">
          <h2 className="font-rajdhani text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Frequently Asked Questions
          </h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-500/25">
            {faqs.map((faq) => (
              <Disclosure
                key={faq.question}
                as="div"
                className="pt-6"
                defaultOpen
              >
                <dt>
                  <DisclosureButton className="group flex w-full items-start justify-between text-left text-white">
                    <span className="text-base font-semibold">
                      {faq.question}
                    </span>
                    <span className="ml-6 flex h-7 items-center">
                      <PlusSmallIcon
                        aria-hidden="true"
                        className="h-6 w-6 group-data-[open]:hidden"
                      />
                      <MinusSmallIcon
                        aria-hidden="true"
                        className="h-6 w-6 group-[&:not([data-open])]:hidden"
                      />
                    </span>
                  </DisclosureButton>
                </dt>
                <DisclosurePanel as="dd" className="mt-2 pr-12">
                  <p className="text-base text-gray-300">{faq.answer}</p>
                </DisclosurePanel>
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
