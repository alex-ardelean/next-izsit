"use client";

import { Disclosure } from "@headlessui/react";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";
import CreatorLoginLayout from "../../layouts/CreatorLayout";
import withAuth from "../../../hoc/withAuth";
import Image from "next/image";

const faqs = [
  {
    question: "How do I upload a video?",
    answer: (
      <>
        <p>
          You can upload videos by navigating to the{" "}
          <strong>&apos;Upload Video&apos;</strong> section in your dashboard.
          Follow the instructions provided there to upload your content.
        </p>
        <Image
          src="/images/how-to-pictures/how-to-upload-a-video.png"
          alt="How to upload a video"
          width={600}
          height={400}
          className="mt-4 rounded-lg border border-gray-300"
        />
      </>
    ),
  },
  {
    question: "Why is my video not showing up?",
    answer:
      "Uploaded videos may take a few minutes to process and appear in your dashboard. If the issue persists, please check your internet connection or try refreshing the page.",
  },
  {
    question: "How do I edit video details?",
    answer: (
      <>
        <p>
          To edit video details, click on the <strong>&apos;Edit&apos;</strong>{" "}
          button under the video in your dashboard. From there, you can update
          the title, description, thumbnails, and more.
        </p>
        <Image
          src="/images/how-to-pictures/how-to-edit-videos.png"
          alt="How to edit video details"
          width={600}
          height={400}
          className="mt-4 rounded-lg border border-gray-300"
        />
      </>
    ),
  },
  {
    question: "How do I edit or add thumbnails for videos?",
    answer: (
      <>
        <p>To edit or add thumbnails for your videos, follow these steps:</p>
        <ol className="list-decimal pl-6 mt-2">
          <li>
            Click on the <strong>&apos;Edit&apos;</strong> button under the
            video in the <strong>&quot;Your videos&quot;</strong> area.
          </li>
          <li>
            Navigate to the <strong>&apos;Choose Thumbnails&apos;</strong>{" "}
            section and upload your desired thumbnails. You can select both a
            static and a motion thumbnail. Note that adding thumbnails is
            optional, as they are automatically generated when you upload a
            video.
          </li>
          <li>
            Save your changes and allow a few minutes for the new thumbnails to
            be uploaded and reflected in your dashboard.
          </li>
        </ol>
        <div className="mt-4 space-y-4">
          <Image
            src="/images/how-to-pictures/how-to-edit-vide-thumbnail-1.png"
            alt="Step 1: Editing video thumbnails"
            width={600}
            height={400}
            className="rounded-lg border border-gray-300"
          />
          <Image
            src="/images/how-to-pictures/how-to-edit-vide-thumbnail-2.png"
            alt="Step 2: Adding video thumbnails"
            width={600}
            height={400}
            className="rounded-lg border border-gray-300"
          />
        </div>
      </>
    ),
  },
  {
    question: "How do I edit thumbnails on my Series?",
    answer: (
      <>
        <p>To edit thumbnails on your Series, follow these steps:</p>
        <ol className="list-decimal pl-6 mt-2">
          <li>
            Navigate to the <strong>&apos;Your series&apos;</strong> section in
            your dashboard.
          </li>
          <li>
            Click on the <strong>&apos;Edit series icon&apos;</strong> for the
            series you want to edit.
          </li>
          <li>
            Scroll to the <strong>&apos;Edit thumbnails&apos;</strong> section,
            where you can upload or replace the thumbnail for your series. You
            can choose both a static and a motion thumbnail if desired.
          </li>
          <li>
            Save your changes, and allow a few minutes for the updated
            thumbnails to be reflected.
          </li>
        </ol>
        <div className="mt-4 space-y-4">
          <Image
            src="/images/how-to-pictures/how-do-i-edit-thumbnails-on-series-1.png"
            alt="Step 1: Navigating to the Series edit page"
            width={600}
            height={400}
            className="rounded-lg border border-gray-300"
          />
          <Image
            src="/images/how-to-pictures/how-do-i-edit-thumbnails-on-series-2.png"
            alt="Step 2: Editing thumbnails for a Series"
            width={600}
            height={400}
            className="rounded-lg border border-gray-300"
          />
        </div>
      </>
    ),
  },
  {
    question: "Can I delete a video?",
    answer:
      "There is a red delete button next to each video in your dashboard. Click on it to delete the video. Note that this action is irreversible.",
  },
  {
    question: "Can I delete a series?",
    answer:
      "Yes, you can delete a series by clicking on the red delete button next to the series in your dashboard. Note that this action is irreversible.",
  },
  {
    question: "How do I contact you?",
    answer: (
      <>
        <p>
          If you have any questions, issues, or need assistance, feel free to
          reach out to us! You can contact Rasmus directly at{" "}
          <a
            href="mailto:r@izsit.com"
            className="text-emerald-600 hover:underline"
          >
            r@izsit.com
          </a>
        </p>
        <p className="mt-2">
          We aim to respond to all inquiries within 24 hours.
        </p>
      </>
    ),
  },
];

function CreatorFAQ() {
  return (
    <CreatorLoginLayout>
      <div className="">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:py-12 lg:px-8 lg:py-12">
          <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
            <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              Frequently Asked Questions
            </h2>
            <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
              {faqs.map((faq) => (
                <Disclosure key={faq.question} as="div" className="pt-6">
                  <dt>
                    <Disclosure.Button className="group flex w-full items-start justify-between text-left text-gray-900">
                      <span className="text-base font-semibold">
                        {faq.question}
                      </span>
                      <span className="ml-6 flex h-7 items-center">
                        <PlusSmallIcon
                          aria-hidden="true"
                          className="h-6 w-6 group-open:hidden"
                        />
                        <MinusSmallIcon
                          aria-hidden="true"
                          className="h-6 w-6 hidden group-open:block"
                        />
                      </span>
                    </Disclosure.Button>
                  </dt>
                  <Disclosure.Panel as="dd" className="mt-2 pr-12">
                    <div className="text-base text-gray-600">{faq.answer}</div>
                  </Disclosure.Panel>
                </Disclosure>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </CreatorLoginLayout>
  );
}

export default withAuth(CreatorFAQ);
