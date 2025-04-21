"use client";

import { useEffect, useState } from "react";
import AdminAreaLayout from "../../layouts/AdminAreaLayout";
import withAuthForAdmin from "../../../hoc/withAuthForAdmin";
import GraphAnalytics from "../../../components/(AdminAreaComponents)/GraphAnalytics";

type AnalyticsData = {
  timeframe: string;
  totals: { plays: number; watch_time: number };
  analytics: {
    contentType: string;
    plays: number;
    watch_time: number;
    plays_percent: number;
    watch_time_percent: number;
  }[];
};

const ContentTypeAnalyticsPage = () => {
  const [analyticsResponse, setAnalyticsResponse] =
    useState<AnalyticsData | null>(null);
  const [timeframe, setTimeframe] = useState("7 Days");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Sorting state
  const [sortColumn, setSortColumn] =
    useState<keyof AnalyticsData["analytics"][0]>("watch_time_percent");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    const fetchContentTypeAnalytics = async () => {
      setLoading(true);
      setError("");

      try {
        const token =
          localStorage.getItem("inplayer_access_token") ||
          sessionStorage.getItem("inplayer_access_token");

        if (!token) {
          throw new Error("Authorization token is missing.");
        }

        const response = await fetch(
          `/api/admin-area/content-type-analytics?timeframe=${encodeURIComponent(
            timeframe
          )}`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) {
          if (response.status === 401) {
            window.location.href = "/admin-area/login"; // Ensure user is redirected if unauthorized
          } else {
            throw new Error(
              `Error ${response.status}: ${await response.text()}`
            );
          }
        }

        const data: AnalyticsData = await response.json();
        setAnalyticsResponse(data);
      } catch (err: any) {
        console.error("Error fetching content type analytics:", err);
        setError(
          err.message.includes("Authorization")
            ? "Session expired. Please log in again."
            : "Something went wrong. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchContentTypeAnalytics();
  }, [timeframe]);

  // Handle sorting when a header cell is clicked.
  const handleSort = (column: keyof AnalyticsData["analytics"][0]) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("desc");
    }
  };

  // Sort the analytics data based on the chosen column and direction.
  const sortedAnalytics =
    analyticsResponse?.analytics.slice().sort((a, b) => {
      let aVal = a[sortColumn];
      let bVal = b[sortColumn];
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDirection === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      } else if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
      }
      return 0;
    }) || [];

  // Helper to render sort indicator (arrow) for a header cell.
  const renderSortIndicator = (column: keyof AnalyticsData["analytics"][0]) => {
    if (sortColumn !== column) return null;
    return sortDirection === "asc" ? " ↑" : " ↓";
  };

  return (
    <AdminAreaLayout>
      <div className="max-w-7xl mx-auto mt-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-bold mb-4">ContentType analytics</h1>
            <p className="mt-2 text-sm text-gray-700">
              Overview of media performance by contentType for the last{" "}
              {timeframe.toLowerCase()}.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm text-sm"
            >
              <option value="7 Days">Last 7 Days</option>
              <option value="30 Days">Last 30 Days</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center pt-20">
            <div className="h-16 w-16 border-4 border-t-emerald-500 border-gray-300 rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : analyticsResponse ? (
          <div className="-mx-4 mt-8 sm:-mx-0 pl-4">
            {/* Totals */}
            <div className="mb-4">
              <p className="text-base font-medium text-gray-700">
                Total Plays:{" "}
                <span className="font-bold underline">
                  {analyticsResponse.totals.plays}
                </span>{" "}
                | Total Watch Time:{" "}
                <span className="font-bold underline">
                  {analyticsResponse.totals.watch_time.toFixed(1)} min
                </span>{" "}
                (
                <span className="font-bold underline">
                  {(analyticsResponse.totals.watch_time / 60).toFixed(1)}
                </span>{" "}
                hours)
              </p>
            </div>
            {/* Analytics Table */}
            <div className="-mx-4 mt-8 sm:-mx-0">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      onClick={() => handleSort("contentType")}
                      scope="col"
                      className="cursor-pointer py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900"
                    >
                      Content Type{renderSortIndicator("contentType")}
                    </th>
                    <th
                      onClick={() => handleSort("plays")}
                      scope="col"
                      className="cursor-pointer px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Plays{renderSortIndicator("plays")}
                    </th>
                    <th
                      onClick={() => handleSort("plays_percent")}
                      scope="col"
                      className="cursor-pointer px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      % Plays{renderSortIndicator("plays_percent")}
                    </th>
                    <th
                      onClick={() => handleSort("watch_time")}
                      scope="col"
                      className="cursor-pointer px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Watch Time{renderSortIndicator("watch_time")}
                    </th>
                    <th
                      onClick={() => handleSort("watch_time_percent")}
                      scope="col"
                      className="cursor-pointer px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      % Watch Time{renderSortIndicator("watch_time_percent")}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {sortedAnalytics.map((item) => (
                    <tr key={item.contentType}>
                      <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none">
                        {item.contentType}
                        {/* Mobile view */}
                        <dl className="font-normal lg:hidden">
                          <dt className="sr-only">Plays</dt>
                          <dd className="mt-1 truncate text-gray-700">
                            {item.plays} plays
                          </dd>
                          <dt className="sr-only">Watch Time</dt>
                          <dd className="mt-1 truncate text-gray-500">
                            {item.watch_time.toFixed(1)} min
                          </dd>
                        </dl>
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500">
                        {item.plays}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500">
                        {item.plays_percent.toFixed(1)}%
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500">
                        {item.watch_time.toFixed(1)} min
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500">
                        {item.watch_time_percent.toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}
        {/* Pass the timeframe state to the GraphAnalytics component */}
        {/* <GraphAnalytics timeframe={timeframe} /> */}
      </div>
    </AdminAreaLayout>
  );
};

export default withAuthForAdmin(ContentTypeAnalyticsPage);
