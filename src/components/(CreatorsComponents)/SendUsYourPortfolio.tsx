"use client";

import { useState } from "react";
import { BuildingOffice2Icon, EnvelopeIcon } from "@heroicons/react/24/outline";

export default function SendUsYourPortfolio() {
  const [formStatus, setFormStatus] = useState<{
    success: boolean | null;
    message: string;
  }>({ success: null, message: "" });

  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/send-portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.message) {
        setFormStatus({
          success: true,
          message: result.message,
        });
        formElement.reset();
      } else {
        setFormStatus({
          success: false,
          message:
            result.error || "An unexpected error occurred. Please try again.",
        });
      }
    } catch (error) {
      console.error("Form Submission Error:", error);
      setFormStatus({
        success: false,
        message: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="send-portfolio" className="relative isolate bg-gray-900">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        <div className="relative px-6 pb-12 pt-12 sm:pt-32 lg:static lg:px-8 lg:py-48">
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
            <h2 className="font-rajdhani text-pretty text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Submit Your Portfolio Now
            </h2>
            <p className="mt-6 text-lg text-gray-300">
              At Izsit, we&apos;re always on the lookout for bold, visionary
              storytellers.
              <br />
              <br /> If you&apos;re an AI filmmaker or creator with a portfolio
              to share, we&apos;d love to hear from you 💖
              <br />
              <br />
              To ensure your work meets our evaluation criteria, please note
              that submitted content{" "}
              <strong>
                {" "}
                must be at least 5 minutes long and captivating within the first
                minute
              </strong>
              .
              <br />
              <p className="mt-6 text-lg text-gray-300">
                Please send us your portfolio via email:
              </p>
              <p className="mt-2 text-xl font-semibold text-emerald-500">
                info@izsit.com
              </p>
            </p>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-48"
        >
          <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="first-name"
                  className="block text-sm font-semibold text-white"
                >
                  First name
                  <span className="ml-1 text-red-500">*</span>{" "}
                </label>
                <div className="mt-2.5">
                  <input
                    id="first-name"
                    name="firstName"
                    type="text"
                    required
                    className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-500"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="last-name"
                  className="block text-sm font-semibold text-white"
                >
                  Last name
                  <span className="ml-1 text-red-500">*</span>{" "}
                </label>
                <div className="mt-2.5">
                  <input
                    id="last-name"
                    name="lastName"
                    type="text"
                    required
                    className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-500"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-white"
                >
                  Email
                  <span className="ml-1 text-red-500">*</span>{" "}
                </label>
                <div className="mt-2.5">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-500"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="portfolio"
                  className="block text-sm font-semibold text-white"
                >
                  Link to Portfolio
                  <span className="ml-1 text-red-500">*</span>{" "}
                </label>
                <div className="mt-2.5">
                  <input
                    id="portfolio"
                    name="portfolio"
                    type="text"
                    required
                    className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-500"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-white"
                >
                  Message
                  <span className="ml-1 text-red-500">*</span>{" "}
                </label>
                <div className="mt-2.5">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-500"
                  />
                </div>
              </div>
            </div>
            <div className="mt-8">
              {formStatus.success !== null && (
                <p
                  className={`text-sm font-semibold ${
                    formStatus.success ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {formStatus.message}
                </p>
              )}
            </div>
            <div className="mt-8 flex flex-col items-center sm:flex-row sm:justify-end">
              <button
                type="submit"
                disabled={loading}
                className={`w-full rounded-md bg-emerald-500 px-5 py-3 text-lg font-semibold text-gray-900 shadow-sm hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 sm:w-auto ${
                  loading ? "cursor-not-allowed opacity-50" : ""
                }`}
              >
                {loading ? "Submitting..." : "Submit Portfolio"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
