"use client";

import { CheckCircleIcon } from "@heroicons/react/20/solid";
import MainLayout from "../../layouts/MainLayout";

export default function PrivacyPolicy() {
  return (
    <MainLayout>
      <div className="relative isolate overflow-hidden bg-gray-900  ">
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
              Privacy Policy
            </p>
            <p className="mt-2 text-xl font-semibold tracking-tight text-white ">
              Effective Date: 28-11-2024
            </p>
            <p className="mt-6 text-xl leading-8">
              At Izsit Inc. (&quot;we,&quot; &quot;us,&quot; or
              &quot;our&quot;), we value your privacy and are committed to
              protecting your personal data. This Privacy Policy explains how we
              collect, use, and share information about you when you use our
              platform (&quot;Izsit&quot;) to stream AI-generated films or
              interact with our services. By using Izsit, you agree to the
              practices described in this Privacy Policy.
            </p>

            <div className="mt-10 max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight text-white">
                1. Information We Collect
              </h2>
              <ul role="list" className="mt-8 space-y-8 text-gray-300">
                <li className="flex gap-x-3">
                  <CheckCircleIcon
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 flex-none text-emerald-400"
                  />
                  <span>
                    <strong className="font-semibold text-white">
                      Information You Provide to Us:
                    </strong>{" "}
                    <ul className="mt-4 space-y-4 pl-6 list-disc list-outside">
                      <li>
                        <strong>Account Information:</strong> When you sign up
                        for an account, we collect your name, email address,
                        username, password, and payment details (e.g., credit
                        card information).
                      </li>
                      <li>
                        <strong>Preferences and Feedback:</strong> Any
                        information you share about your preferences, ratings,
                        or feedback on the films and platform.
                      </li>
                      <li>
                        <strong>Support Requests:</strong> Information you
                        provide when contacting customer support or reporting
                        issues.
                      </li>
                    </ul>
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <CheckCircleIcon
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 flex-none text-emerald-400"
                  />
                  <span>
                    <strong className="font-semibold text-white">
                      Information We Collect Automatically:
                    </strong>{" "}
                    <ul className="mt-4 space-y-4 pl-6 list-disc list-outside">
                      <li>
                        <strong>Device Information:</strong> Details about your
                        device, including IP address, browser type, operating
                        system, and unique device identifiers.
                      </li>
                      <li>
                        <strong>Usage Data:</strong> Information about your
                        activity on Izsit, such as content viewed, search
                        queries, and interactions with features.
                      </li>
                      <li>
                        <strong>Cookies and Tracking Technologies:</strong> We
                        use cookies, web beacons, and other technologies to
                        enhance your experience and gather analytical data.
                      </li>
                    </ul>
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <CheckCircleIcon
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 flex-none text-emerald-400"
                  />
                  <span>
                    <strong className="font-semibold text-white">
                      Information from Third Parties:
                    </strong>{" "}
                    <ul className="mt-4 space-y-4 pl-6 list-disc list-outside">
                      <li>
                        <strong>Social Media or External Services:</strong> If
                        you connect third-party accounts (e.g., Google or
                        Facebook) to Izsit, we collect information provided by
                        those services, such as your name and profile picture.
                      </li>
                    </ul>
                  </span>
                </li>
              </ul>

              <h2 className="mt-16 text-3xl font-semibold tracking-tight text-white">
                2. Legal Basis for Processing (GDPR)
              </h2>
              <p className="mt-6 text-gray-300">
                If you are a resident of the European Economic Area (EEA), we
                process your personal data based on the following legal grounds:
              </p>
              <ul role="list" className="mt-8 space-y-6 text-gray-300">
                <li className="flex gap-x-3">
                  <CheckCircleIcon
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 flex-none text-emerald-400"
                  />
                  <span>
                    <strong className="font-semibold text-white">
                      Contractual Necessity:
                    </strong>{" "}
                    To provide the services you request, such as managing
                    accounts and processing payments.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <CheckCircleIcon
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 flex-none text-emerald-400"
                  />
                  <span>
                    <strong className="font-semibold text-white">
                      Consent:
                    </strong>{" "}
                    For optional activities like sending promotional emails or
                    using certain cookies. You can withdraw your consent at any
                    time.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <CheckCircleIcon
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 flex-none text-emerald-400"
                  />
                  <span>
                    <strong className="font-semibold text-white">
                      Legitimate Interests:
                    </strong>{" "}
                    To improve our platform, analyze usage, and ensure security.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <CheckCircleIcon
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 flex-none text-emerald-400"
                  />
                  <span>
                    <strong className="font-semibold text-white">
                      Legal Obligations:
                    </strong>{" "}
                    To comply with legal and regulatory requirements.
                  </span>
                </li>
              </ul>

              <h2 className="mt-16 text-3xl font-semibold tracking-tight text-white">
                3. Your GDPR Rights
              </h2>
              <p className="mt-6 text-gray-300">
                If you are in the EEA, you have the following rights regarding
                your personal data:
              </p>
              <ul role="list" className="mt-8 space-y-6 text-gray-300">
                <li className="flex gap-x-3">
                  <CheckCircleIcon
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 flex-none text-emerald-400"
                  />
                  <span>
                    <strong className="font-semibold text-white">
                      Access:
                    </strong>{" "}
                    Request a copy of the data we hold about you.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <CheckCircleIcon
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 flex-none text-emerald-400"
                  />
                  <span>
                    <strong className="font-semibold text-white">
                      Correction:
                    </strong>{" "}
                    Request corrections to inaccurate or incomplete information.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <CheckCircleIcon
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 flex-none text-emerald-400"
                  />
                  <span>
                    <strong className="font-semibold text-white">
                      Erasure:
                    </strong>{" "}
                    Request deletion of your data (&quot;right to be
                    forgotten&quot;).
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <CheckCircleIcon
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 flex-none text-emerald-400"
                  />
                  <span>
                    <strong className="font-semibold text-white">
                      Restriction:
                    </strong>{" "}
                    Restrict the processing of your data under specific
                    circumstances.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <CheckCircleIcon
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 flex-none text-emerald-400"
                  />
                  <span>
                    <strong className="font-semibold text-white">
                      Portability:
                    </strong>{" "}
                    Request your data in a structured, commonly used, and
                    machine-readable format.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <CheckCircleIcon
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 flex-none text-emerald-400"
                  />
                  <span>
                    <strong className="font-semibold text-white">
                      Objection:
                    </strong>{" "}
                    Object to data processing based on legitimate interests or
                    direct marketing.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <CheckCircleIcon
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 flex-none text-emerald-400"
                  />
                  <span>
                    <strong className="font-semibold text-white">
                      Withdraw Consent:
                    </strong>{" "}
                    Withdraw consent for processing where applicable.
                  </span>
                </li>
              </ul>
              <p className="mt-8 text-gray-300">
                To exercise these rights, contact us at{" "}
                <a href="mailto:privacy@izsit.com" className="text-emerald-400">
                  privacy@izsit.com
                </a>
                . You may also file a complaint with your local Data Protection
                Authority if you believe your rights have been violated.
              </p>

              <h2 className="mt-16 text-3xl font-semibold tracking-tight text-white">
                4. How We Use Your Information
              </h2>
              <p className="mt-6 text-gray-300">
                We use your personal data for the following purposes:
              </p>
              <ul role="list" className="mt-8 space-y-6 text-gray-300">
                <li className="flex gap-x-3">
                  <CheckCircleIcon
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 flex-none text-emerald-400"
                  />
                  <span>
                    <strong className="font-semibold text-white">
                      To provide, maintain, and improve Izsit’s services:
                    </strong>{" "}
                    Ensuring the platform operates smoothly and efficiently for
                    all users.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <CheckCircleIcon
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 flex-none text-emerald-400"
                  />
                  <span>
                    <strong className="font-semibold text-white">
                      To personalize your viewing experience:
                    </strong>{" "}
                    Recommending relevant content tailored to your preferences
                    and usage.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <CheckCircleIcon
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 flex-none text-emerald-400"
                  />
                  <span>
                    <strong className="font-semibold text-white">
                      To process payments, subscriptions, and other
                      transactions:
                    </strong>{" "}
                    Facilitating secure and accurate handling of your financial
                    activities.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <CheckCircleIcon
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 flex-none text-emerald-400"
                  />
                  <span>
                    <strong className="font-semibold text-white">
                      To communicate with you:
                    </strong>{" "}
                    Providing updates, promotional offers, and support to
                    enhance your experience.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <CheckCircleIcon
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 flex-none text-emerald-400"
                  />
                  <span>
                    <strong className="font-semibold text-white">
                      To analyze platform usage and improve functionality:
                    </strong>{" "}
                    Gaining insights to optimize the user experience and enhance
                    features.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <CheckCircleIcon
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 flex-none text-emerald-400"
                  />
                  <span>
                    <strong className="font-semibold text-white">
                      To comply with legal obligations:
                    </strong>{" "}
                    Ensuring adherence to laws and regulations while enforcing
                    our Terms of Service.
                  </span>
                </li>
              </ul>

              <h2 className="mt-16 text-3xl font-semibold tracking-tight text-white">
                5. International Data Transfers
              </h2>
              <p className="mt-6 text-gray-300">
                Izsit is operated in the United States, and your data may be
                transferred to and processed in the U.S. or other countries. We
                ensure that adequate safeguards are in place, such as:
              </p>
              <ul role="list" className="mt-8 space-y-6 text-gray-300">
                <li className="flex gap-x-3">
                  <CheckCircleIcon
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 flex-none text-emerald-400"
                  />
                  <span>
                    <strong className="font-semibold text-white">
                      Standard Contractual Clauses (SCCs):
                    </strong>{" "}
                    These are approved by the European Commission to ensure data
                    protection.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <CheckCircleIcon
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 flex-none text-emerald-400"
                  />
                  <span>
                    <strong className="font-semibold text-white">
                      Ensuring the same level of protection as required by GDPR:
                    </strong>{" "}
                    We strive to maintain consistent data protection measures
                    regardless of where your data is processed.
                  </span>
                </li>
              </ul>
              <p className="mt-8 text-gray-300">
                By using Izsit, you consent to these international transfers.
              </p>

              <h2 className="mt-16 text-3xl font-semibold tracking-tight text-white">
                6. Data Retention
              </h2>
              <p className="mt-6 text-gray-300">
                We retain your data only as long as necessary to:
              </p>
              <ul role="list" className="mt-8 space-y-6 text-gray-300">
                <li className="flex gap-x-3">
                  <CheckCircleIcon
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 flex-none text-emerald-400"
                  />
                  <span>
                    <strong className="font-semibold text-white">
                      Provide our services:
                    </strong>{" "}
                    Ensuring seamless platform functionality and support for
                    users.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <CheckCircleIcon
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 flex-none text-emerald-400"
                  />
                  <span>
                    <strong className="font-semibold text-white">
                      Comply with legal obligations:
                    </strong>{" "}
                    Meeting regulatory and statutory requirements.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <CheckCircleIcon
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 flex-none text-emerald-400"
                  />
                  <span>
                    <strong className="font-semibold text-white">
                      Resolve disputes:
                    </strong>{" "}
                    Addressing any issues or claims effectively.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <CheckCircleIcon
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 flex-none text-emerald-400"
                  />
                  <span>
                    <strong className="font-semibold text-white">
                      Enforce our agreements:
                    </strong>{" "}
                    Ensuring adherence to our terms and policies.
                  </span>
                </li>
              </ul>
              <p className="mt-8 text-gray-300">
                When we no longer need your personal data, we will delete or
                anonymize it.
              </p>

              <h2 className="mt-16 text-3xl font-semibold tracking-tight text-white">
                7. Cookies and Tracking Technologies
              </h2>
              <p className="mt-6 text-gray-300">We use cookies to:</p>
              <ul role="list" className="mt-8 space-y-6 text-gray-300">
                <li className="flex gap-x-3">
                  <CheckCircleIcon
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 flex-none text-emerald-400"
                  />
                  <span>
                    <strong className="font-semibold text-white">
                      Remember your preferences:
                    </strong>{" "}
                    Providing a tailored user experience based on your choices.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <CheckCircleIcon
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 flex-none text-emerald-400"
                  />
                  <span>
                    <strong className="font-semibold text-white">
                      Provide core functionality:
                    </strong>{" "}
                    Ensuring essential features like login sessions work
                    seamlessly.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <CheckCircleIcon
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 flex-none text-emerald-400"
                  />
                  <span>
                    <strong className="font-semibold text-white">
                      Analyze usage patterns:
                    </strong>{" "}
                    Helping us improve the platform based on how users interact
                    with it.
                  </span>
                </li>
              </ul>
              <p className="mt-8 text-gray-300">
                When you visit Izsit, you will see a cookie banner asking for
                consent for non-essential cookies. For more details, review our{" "}
                <a
                  href="/cookie-policy"
                  className="text-emerald-400 hover:underline"
                >
                  Cookie Policy
                </a>
                .
              </p>

              <h2 className="mt-16 text-3xl font-semibold tracking-tight text-white">
                8. Data Security
              </h2>
              <p className="mt-6 text-gray-300">
                We use industry-standard security measures to protect your
                personal data, including encryption, secure storage, and access
                controls. While we strive to protect your data, no system is
                100% secure. Please protect your account credentials and notify
                us immediately if you suspect unauthorized access.
              </p>

              <h2 className="mt-16 text-3xl font-semibold tracking-tight text-white">
                9. Children’s Privacy
              </h2>
              <p className="mt-6">
                Izsit is not intended for children under 13, and we do not
                knowingly collect their data. In the EU/EEA, the platform is not
                intended for users under 16 without parental consent. If we
                learn that we have inadvertently collected data from children,
                we will promptly delete it. Contact us at privacy@izsit.com if
                you believe this has occurred.
              </p>

              <h2 className="mt-16 text-3xl font-semibold tracking-tight text-white">
                10. Changes to This Privacy Policy
              </h2>
              <p className="mt-6">
                We may update this Privacy Policy periodically to reflect
                changes in our practices or legal requirements. Updates will
                include a revised &quot;Effective Date&quot; at the top. If
                changes are significant, we will notify you through the platform
                or email before they take effect. We encourage you to review
                this Privacy Policy regularly.
              </p>

              <h2 className="mt-16 text-3xl font-semibold tracking-tight text-white">
                11. Contact Us
              </h2>
              <p className="mt-6">If you have questions, contact us at:</p>
              <address className="mt-4 text-gray-400">
                Izsit Inc.
                <br />
                1007 N Orange St, 4th Floor, #3693
                <br />
                Wilmington, DE 19801, USA
                <br />
                Email:{" "}
                <a href="mailto:privacy@izsit.com" className="text-emerald-400">
                  privacy@izsit.com
                </a>
              </address>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-gray-900 sm:h-32" />
      </div>
    </MainLayout>
  );
}
