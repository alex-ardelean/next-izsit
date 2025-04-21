"use client";

import React from "react";
import CreatorLoginLayout from "../../layouts/CreatorLayout";
import {
  CloudArrowUpIcon,
  FolderIcon,
  NumberedListIcon,
  ChartBarIcon,
  QuestionMarkCircleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import withAuth from "../../../hoc/withAuth";

const actions = [
  {
    title: "Upload new videos",
    description: "Upload your videos to the platform.",
    href: "/upload-video",
    icon: CloudArrowUpIcon,
    iconForeground: "text-teal-700",
    iconBackground: "bg-emerald-100",
  },
  {
    title: "Your videos",
    description: "View and manage your uploaded videos.",
    href: "/creator-videos",
    icon: FolderIcon,
    iconForeground: "text-teal-700",
    iconBackground: "bg-emerald-100",
  },
  {
    title: "Your series",
    description: "View and manage your series.",
    href: "/creator-series",
    icon: NumberedListIcon,
    iconForeground: "text-teal-700",
    iconBackground: "bg-emerald-100",
  },
  {
    title: "Your analytics",
    description: "Check your analytics.",
    href: "/creator-analytics",
    icon: ChartBarIcon,
    iconForeground: "text-teal-700",
    iconBackground: "bg-emerald-100",
  },

  {
    title: "Your Profile info",
    description: "Check and update your profile info.",
    href: "/creator-profile",
    icon: UserCircleIcon,
    iconForeground: "text-teal-700",
    iconBackground: "bg-emerald-100",
  },
  {
    title: "FAQ",
    description: "Frequently asked questions.",
    href: "/creator-faq",
    icon: QuestionMarkCircleIcon,
    iconForeground: "text-teal-700",
    iconBackground: "bg-emerald-100",
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const CreatorDashboardPage = () => {
  return (
    <CreatorLoginLayout>
      <div className="space-y-8 max-w-7xl mx-auto mt-8  sm:px-6 lg:px-8 ">
        <header>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome to the Creator Dashboard!
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Upload your videos and check your stats.
          </p>
        </header>

        <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0 ">
          {actions.map((action, actionIdx) => (
            <div
              key={action.title}
              className={classNames(
                actionIdx === 0
                  ? "rounded-tl-lg rounded-tr-lg sm:rounded-tr-none"
                  : "",
                actionIdx === 1 ? "sm:rounded-tr-lg" : "",
                actionIdx === actions.length - 2 ? "sm:rounded-bl-lg" : "",
                actionIdx === actions.length - 1
                  ? "rounded-bl-lg rounded-br-lg sm:rounded-bl-none"
                  : "",
                "group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-emerald-500"
              )}
            >
              <div>
                <span
                  className={classNames(
                    action.iconBackground,
                    action.iconForeground,
                    "inline-flex rounded-lg p-3 ring-4 ring-white"
                  )}
                >
                  <action.icon aria-hidden="true" className="w-6 h-6" />
                </span>
              </div>
              <div className="mt-8">
                <h3 className="text-base font-semibold text-gray-900">
                  <a href={action.href} className="focus:outline-none">
                    <span aria-hidden="true" className="absolute inset-0" />
                    {action.title}
                  </a>
                  {action.title === "Your analytics" && (
                    <span className="ml-2 inline-flex items-center rounded-md bg-emerald-400/10 px-2 py-1 text-xs font-medium text-emerald-400 ring-1 ring-inset ring-emerald-400/30">
                      Alpha
                    </span>
                  )}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {action.description}
                </p>
              </div>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400"
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                >
                  <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                </svg>
              </span>
            </div>
          ))}
        </div>
      </div>
    </CreatorLoginLayout>
  );
};

export default withAuth(CreatorDashboardPage);
