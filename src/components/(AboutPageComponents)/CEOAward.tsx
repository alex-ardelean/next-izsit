export default function CEOAward() {
  return (
    <div className="relative isolate bg-gray-900 text-white py-12 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="rounded-2xl bg-gray-700 p-16">
          <div className="mx-auto max-w-xl lg:max-w-none">
            <div className="text-center">
              <h2 className="text-2xl font-bold tracking-tight text-white">
                Recognizing Excellence
              </h2>
            </div>
            <div className="mx-auto mt-12 flex flex-col items-center">
              {/* Image with better styling */}
              <div className="w-28 h-28 flex justify-center items-center rounded-full bg-black p-4 shadow-md">
                <img
                  alt="CEO of the Year 2024"
                  src="/images/ceo-review/brand-ceo-white-outline.png"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Text with LinkedIn as the name */}
              <div className="mt-6 text-center">
                <a
                  href="https://www.linkedin.com/in/giacomobonavera/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-emerald-400 hover:text-emerald-300 underline"
                >
                  Giacomo Bonavera
                </a>
                <p className="mt-2 text-sm text-gray-300">
                  Voted <strong>CEO of the Year 2024</strong> by CEO Review.
                </p>
                <div className="mt-4">
                  <a
                    href="https://www.ceo-review.com/winners/izsit/"
                    target="_blank"
                    rel="sponsored nofollow"
                    className="text-emerald-400 underline hover:text-emerald-300"
                  >
                    CEO Review Award
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
