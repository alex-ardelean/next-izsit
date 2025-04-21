export default function StayUpToDate() {
  return (
    <div className="bg-gray-900 py-12 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className=" text-base font-semibold text-emerald-400">
          Stay up to date
        </h2>
        <p className="font-rajdhani mt-2 max-w-lg text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          What&apos;s new
        </p>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-2 lg:gap-8">
          <div className="col-span-1 flex">
            <div className="w-full overflow-hidden rounded-lg bg-gray-800 ring-1 ring-white/10">
              <iframe
                className="w-full aspect-video rounded-t-lg"
                src="https://www.youtube.com/embed/St0QgE9-gZA?si=k5c_Rb7us2mXvrgY"
                title="Video 2"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <div className="p-6">
                <p className="mt-2 text-lg font-medium text-white">
                  AI Film Forecasts for 2025
                </p>
                <p className="mt-2 text-sm text-gray-400">
                  IZSIT brings you the first ever AI film forecast based on
                  internal analytics and external research.
                </p>
              </div>
            </div>
          </div>

          <div className="col-span-1 flex">
            <div className="w-full overflow-hidden rounded-lg bg-gray-800 ring-1 ring-white/10">
              <iframe
                className="w-full aspect-video rounded-t-lg"
                src="https://www.youtube.com/embed/6QTl8XZwAzQ?si=YzQrUGPMX3kTMmn-"
                title="Video 1"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>

              <div className="p-6">
                <p className="mt-2 text-lg font-medium text-white">
                  IZSIT Launch Announcement
                </p>
                <p className="mt-2 text-sm text-gray-400 line-clamp-1">
                  Attention all film creators.
                </p>
              </div>
            </div>
          </div>

          <div className="col-span-1 flex">
            <div className="w-full overflow-hidden rounded-lg bg-gray-800 ring-1 ring-white/10">
              <iframe
                className="w-full aspect-video rounded-t-lg"
                src="https://www.youtube.com/embed/z9K6aUtCTJo?si=SacXK-iNqMQKZHxz"
                title="Video 1"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>

              <div className="p-6">
                <p className="mt-2 text-lg font-medium text-white">
                  IZSIT Creator Fund
                </p>
                <p className="mt-2 text-sm text-gray-400 line-clamp-1">
                  We fund films, series and all other content. Let&apos;s create
                  something extraordinary!
                </p>
              </div>
            </div>
          </div>

          <div className="col-span-1 flex">
            <div className="w-full overflow-hidden rounded-lg bg-gray-800 ring-1 ring-white/10">
              <iframe
                className="w-full aspect-video rounded-t-lg"
                src="https://www.youtube.com/embed/JT0fbrKayfY?si=VhmQDFM5GuW9dnwn"
                title="Video 3"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <div className="p-6">
                <p className="mt-2 text-lg font-medium text-white">
                  Monetization Strategy for Creative Partners
                </p>
                <p className="mt-2 text-sm text-gray-400 line-clamp-2">
                  Send us your videos with the content mapping sheet filled in
                  for each video.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
