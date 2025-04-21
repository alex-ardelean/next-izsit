import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const OverallPerformanceChart = ({ data }) => {
  // Map dailyStats to match the chart data format
  const chartData = data.map((stat) => ({
    date: stat.date,
    plays: stat.plays,
    completes: stat.completes,
  }));

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-lg font-medium text-gray-900">Overall Performance</h2>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={chartData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="plays"
            stroke="#10B981" // Tailwind's emerald-500
            fill="#34D399" // Tailwind's emerald-400
            fillOpacity={0.2} // Adjust transparency for a lighter fill effect
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OverallPerformanceChart;
