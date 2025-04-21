"use client";

import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary ChartJS components.
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type DailyData = {
  date: string;
  plays: number;
  watch_time: number;
};

type GraphDataByContentType = {
  contentType: string;
  daily: DailyData[];
};

interface GraphAnalyticsProps {
  timeframe: string;
}

const GraphAnalytics: React.FC<GraphAnalyticsProps> = ({ timeframe }) => {
  const [graphData, setGraphData] = useState<GraphDataByContentType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const fetchGraphData = async () => {
    setLoading(true);
    setError("");
    try {
      // Use the passed timeframe prop instead of a fixed "30 Days"
      const response = await fetch(
        `/api/admin-area/graph-analytics?timeframe=${encodeURIComponent(
          timeframe
        )}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch graph data");
      }
      const data = await response.json();
      setGraphData(data.data);
      // Initialize selected types with all returned content types.
      setSelectedTypes(
        data.data.map((item: GraphDataByContentType) => item.contentType)
      );
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Build a common x-axis: gather all unique dates from selected content types.
  const allDatesSet = new Set<string>();
  graphData.forEach((ct) => {
    if (selectedTypes.includes(ct.contentType)) {
      ct.daily.forEach((d) => allDatesSet.add(d.date));
    }
  });
  const allDates = Array.from(allDatesSet).sort();

  // Build datasets for each selected content type.
  const colors = [
    "rgba(75, 192, 192, 1)",
    "rgba(255, 99, 132, 1)",
    "rgba(255, 205, 86, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(201, 203, 207, 1)",
  ];
  const datasets = graphData
    .filter((ct) => selectedTypes.includes(ct.contentType))
    .map((ct, index) => {
      const dataPoints = allDates.map((date) => {
        const dayData = ct.daily.find((d) => d.date === date);
        return dayData ? dayData.watch_time : 0;
      });
      const color = colors[index % colors.length];
      return {
        label: ct.contentType,
        data: dataPoints,
        borderColor: color,
        backgroundColor: color.replace("1)", "0.2)"),
        fill: false,
      };
    });

  const chartData = {
    labels: allDates,
    datasets,
  };

  // Checkbox change handler to filter displayed content types.
  const handleCheckboxChange = (contentType: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedTypes((prev) => [...prev, contentType]);
    } else {
      setSelectedTypes((prev) => prev.filter((type) => type !== contentType));
    }
  };

  return (
    <div className="mt-8">
      <button
        onClick={fetchGraphData}
        className="mb-4 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500"
      >
        {loading ? "Loading..." : "Load Graph Data"}
      </button>
      {error && <p className="text-red-600">{error}</p>}
      {/* Filter checkboxes */}
      {graphData.length > 0 && (
        <div className="mb-4">
          <p className="font-semibold">Select Content Types:</p>
          {graphData.map((ct) => (
            <label key={ct.contentType} className="mr-4">
              <input
                type="checkbox"
                checked={selectedTypes.includes(ct.contentType)}
                onChange={(e) =>
                  handleCheckboxChange(ct.contentType, e.target.checked)
                }
                className="mr-1"
              />
              {ct.contentType}
            </label>
          ))}
        </div>
      )}
      {allDates.length > 0 && (
        <div className="bg-white p-4 rounded-md shadow">
          <Line
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "top" },
                title: {
                  display: true,
                  text: "Daily Watch Time Evolution by Content Type",
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default GraphAnalytics;
