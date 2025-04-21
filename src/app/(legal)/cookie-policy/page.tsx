import Layout from "../../layouts/MainLayout";

export default function CookiesPolicy() {
  return (
    <Layout>
      <div className="relative isolate overflow-hidden bg-gray-900">
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

        <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
          <div className="mx-auto max-w-3xl text-base leading-7 text-gray-300">
            <p className="text-lg font-semibold text-emerald-400">
              Cookies Policy
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Cookies Policy
            </h1>

            <div className="mt-10 max-w-2xl">
              <p>
                This Cookies Policy explains how Izsit Inc. uses cookies and
                similar tracking technologies on our website.
              </p>

              <h2 className="mt-6 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                1. What Are Cookies?
              </h2>
              <p>
                Cookies are small text files that are placed on your device when
                you visit a website. They allow the website to recognize your
                device and store some information about your preferences or past
                actions.
              </p>

              <h2 className="mt-6 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                2. How We Use Cookies
              </h2>
              <p>
                We use cookies to enhance your experience on our website and to
                provide certain functionalities. Cookies are used for the
                following purposes:
              </p>
              <ul className="mt-3 list-disc pl-6 text-gray-300">
                <li>
                  <strong>Essential Cookies:</strong> Necessary for the website
                  to function, like setting privacy preferences or logging in.
                </li>
                <li>
                  <strong>Analytics Cookies:</strong> Collect anonymized data
                  about website usage for improvement.
                </li>
                <li>
                  <strong>Performance Cookies:</strong> Measure and improve site
                  performance.
                </li>
              </ul>

              <h2 className="mt-6 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                3. Types of Cookies We Use
              </h2>
              <p>
                We may use both session cookies (which expire once you close
                your web browser) and persistent cookies (which stay on your
                device until you delete them). The cookies we use generally fall
                into the following categories:
              </p>
              <ul className="mt-3 list-disc pl-6 text-gray-300">
                <li>
                  <strong>Strictly Necessary Cookies:</strong> Required for the
                  operation of the site.
                </li>
                <li>
                  <strong>Analytical/Performance Cookies:</strong> Used to
                  analyze how users navigate the site and improve user
                  experience.
                </li>
                <li>
                  <strong>Functionality Cookies:</strong> These remember your
                  preferences to provide enhanced features.
                </li>
              </ul>

              <h2 className="mt-6 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                4. Third-Party Cookies
              </h2>
              <p>
                In addition to our own cookies, we may also use third-party
                cookies, such as those provided by Google Analytics, to collect
                information about your use of our site. These third-party
                services help us improve the performance of our website and
                provide you with a better experience.
              </p>

              <h2 className="mt-6 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                5. Managing Cookies
              </h2>
              <p>
                You can control and manage cookies in various ways. Most
                browsers allow you to refuse or accept cookies, delete cookies
                already stored on your computer, and specify preferences for
                certain websites. Please be aware that disabling cookies may
                affect the functionality of our website and could impact your
                user experience.
              </p>
              <p className="mt-3">
                To learn more about cookies and how to manage them, you can
                visit{" "}
                <a
                  href="https://www.allaboutcookies.org"
                  className="text-emerald-400 underline"
                >
                  All About Cookies
                </a>
                .
              </p>

              <h2 className="mt-6 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                6. Changes to This Policy
              </h2>
              <p>
                We may update this Cookies Policy from time to time in order to
                reflect changes in technology, legislation, or our practices. We
                encourage you to periodically review this page for the latest
                information on our cookie practices.
              </p>

              <h2 className="mt-6 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                7. Contact Us
              </h2>
              <p>
                If you have any questions about our use of cookies or this
                policy, please contact us at{" "}
                <a
                  href="mailto:privacy@izsit.com"
                  className="text-emerald-400 underline"
                >
                  privacy@izsit.com
                </a>
                .
              </p>

              <p className="mt-6 font-bold text-gray-300">
                Last updated: December 10, 2024
              </p>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-gray-900 sm:h-32" />
      </div>
    </Layout>
  );
}
