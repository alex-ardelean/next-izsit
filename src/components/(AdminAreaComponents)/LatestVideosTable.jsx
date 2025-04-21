"use client";

export default function LatestVideosTable({ latestVideos }) {
  return (
    <div className="w-full mb-4 mt-4">
      <h2 className="text-lg font-bold mb-2">Latest 10 Videos uploaded</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-xs bg-white">
          <thead>
            <tr>
              <th className="border p-2 text-left">Title</th>
              <th className="border p-2 text-left">Creator</th>
              <th className="border p-2 text-left">Created</th>
              <th className="border p-2 text-left">Status</th>
              <th className="border p-2 text-left">Content Type</th>
            </tr>
          </thead>
          <tbody>
            {latestVideos.length > 0 ? (
              latestVideos.map((video) => (
                <tr key={video.id}>
                  <td className="border p-2">
                    {video.metadata?.title || "No Title"}
                  </td>
                  <td className="border p-2">
                    {video.creatorName || "Unknown"}
                  </td>
                  <td className="border p-2">
                    {new Date(video.created).toLocaleString()}
                  </td>
                  <td className="border p-2">
                    {video.metadata?.custom_params?.status || "Unknown"}
                  </td>
                  <td className="border p-2">
                    {video.metadata?.custom_params?.contentType || "Unknown"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="border p-2" colSpan="5">
                  No videos available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
