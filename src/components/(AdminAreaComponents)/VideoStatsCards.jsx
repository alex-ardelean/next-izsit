"use client";

export default function VideoStatsCards({ videos }) {
  // Initialize counts for each contentType.
  const counts = {
    movie: 0,
    episode: 0,
    music_video: 0,
    trailer: 0,
    series: 0,
    hub: 0,
    uncategorized: 0,
  };

  // Loop through the videos and increment the appropriate counter.

  videos.forEach((video) => {
    const type = video.metadata?.custom_params?.contentType;
    if (!type) {
      counts.uncategorized++;
    } else if (type in counts) {
      counts[type]++;
    }
  });

  // Total for the primary categories: movie, episode, music_video, trailer.
  const totalPrimary =
    counts.movie + counts.episode + counts.music_video + counts.trailer;

  // Helper function to compute percentage for the primary categories.
  const computePct = (count) =>
    totalPrimary > 0 ? ((count / totalPrimary) * 100).toFixed(1) + "%" : "0%";

  // Build the stats array with seven cards.
  const stats = [
    {
      name: "Total Videos",
      stat: totalPrimary,
    },
    { name: "Movies", stat: counts.movie, percent: computePct(counts.movie) },
    {
      name: "Episodes",
      stat: counts.episode,
      percent: computePct(counts.episode),
    },
    {
      name: "Music Videos",
      stat: counts.music_video,
      percent: computePct(counts.music_video),
    },
    {
      name: "Trailer",
      stat: counts.trailer,
      percent: computePct(counts.trailer),
    },
    { name: "Series", stat: counts.series },
    { name: "Hub", stat: counts.hub },
    { name: "Uncategorized", stat: counts.uncategorized },
  ];

  return (
    <div>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.name}
            className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
          >
            <dt className="truncate text-sm font-medium text-gray-500">
              {item.name}
            </dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
              {item.stat}
            </dd>
            {item.percent && (
              <dd className="mt-1 text-xs text-gray-500 font-bold">
                <span className="underline">{item.percent}</span> of total
              </dd>
            )}
          </div>
        ))}
      </dl>
    </div>
  );
}
