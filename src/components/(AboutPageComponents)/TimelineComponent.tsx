"use client";

import React from "react";

interface TimelineItem {
  name: React.ReactNode;
  description: React.ReactNode;
  date: string;
  dateTime: string;
}

const timeline: TimelineItem[] = [
  {
    name: "Attended Buildspace Incubator",
    description:
      "Izsit participated in the BuildSpace Incubator, backed by Y Combinator and Andreessen Horowitz.",
    date: "Jun 2024",
    dateTime: "2024-06",
  },
  {
    name: "Alpha Version Launched",
    description: "We launched the alpha version of our platform in June.",
    date: "Jun 2024",
    dateTime: "2024-06",
  },
  {
    name: "Incorporated in Delaware, USA",
    description: "Izsit was officially incorporated in August 2024.",
    date: "Aug 2024",
    dateTime: "2024-08",
  },
  {
    name: "Angel Round Closed",
    description: "We successfully closed our angel round in August.",
    date: "Aug 2024",
    dateTime: "2024-08",
  },
  {
    name: "Signed 30+ Creators for Early Access",
    description:
      "By October, more than 30 creators joined our platform during the early access phase.",
    date: "Oct 2024",
    dateTime: "2024-10",
  },

  {
    name: "Signed Major Streaming Partners",
    description:
      "We partnered with major streaming platforms including Roku, Amazon Fire, and JW Player, expanding our reach and accessibility.",
    date: "Nov 2024",
    dateTime: "2024-11",
  },

  {
    name: "Web App Launched",
    description: (
      <>
        We successfully launched the live version of our{" "}
        <a
          href="https://app.izsit.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-500"
        >
          web app
        </a>
        , making it available to creators worldwide.
      </>
    ),
    date: "Dec 2024",
    dateTime: "2024-12",
  },

  {
    name: "Launched on Amazon Fire, Roku, Android, and iOS",
    description: (
      <>
        Izsit launched on Amazon Fire, Roku,{" "}
        <a
          href="https://play.google.com/store/apps/details?id=com.izsit.izsit"
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-500"
        >
          Android
        </a>
        , and{" "}
        <a
          href="https://apps.apple.com/us/app/izsit/id6740759741?platform=iphone"
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-500"
        >
          iOS
        </a>
        , further enhancing accessibility.
      </>
    ),
    date: "Jan 2025",
    dateTime: "2025-01",
  },
  {
    name: "First Collaboration with Olya Polyakova",
    description: (
      <>
        We partnered with{" "}
        <a
          href="https://www.instagram.com/p/DFIPdI1MvXg/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-500"
        >
          Olya Polyakova
        </a>
        , generating significant traffic and expanding our audience reach.
      </>
    ),
    date: "Jan 2025",
    dateTime: "2025-01",
  },
];

export default function Timeline() {
  return (
    <div id="timeline" className="bg-gray-900 py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Title Section */}
        <div className="lg:max-w-3xl">
          <h1 className="font-rajdhani text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Our Journey
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            Follow our milestones as we revolutionize the entertainment world.
          </p>
        </div>

        {/* Timeline */}
        <div className="mt-16 grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {timeline.map((item, index) => (
            <div key={index} className="relative">
              <time
                dateTime={item.dateTime}
                className="flex items-center text-sm font-semibold text-white"
              >
                <svg
                  viewBox="0 0 4 4"
                  aria-hidden="true"
                  className="mr-4 h-2 w-2 flex-none fill-emerald-500"
                >
                  <circle r={2} cx={2} cy={2} />
                </svg>
                {item.date}
                <div
                  aria-hidden="true"
                  className={`absolute ${
                    index < timeline.length - 1 ? "block" : "hidden"
                  } -ml-2 h-px w-screen -translate-x-full bg-gray-700 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0`}
                />
              </time>

              {/* ✅ Render name as a div (not a p tag) to prevent hydration error */}
              <div className="mt-6 text-lg font-semibold tracking-tight text-white">
                {item.name}
              </div>

              <p className="mt-1 text-base text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
