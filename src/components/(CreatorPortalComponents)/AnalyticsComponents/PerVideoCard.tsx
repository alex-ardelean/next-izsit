import React from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

const VideoCard = ({ title, stats }) => {
  // Map stats to match the chart data format
  const chartData = stats.map((stat) => ({
    name: stat.date,
    plays: stat.plays,
  }));

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-lg font-medium text-gray-900">{title}</h2>
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={80}>
          <LineChart data={chartData}>
            <Line
              type="monotone"
              dataKey="plays"
              stroke="#10B981" // Tailwind's emerald-500
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-sm text-gray-500 mt-2">No data available</p>
      )}
    </div>
  );
};

export default VideoCard;
