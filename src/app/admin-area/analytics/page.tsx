"use client";

import { useEffect, useState, useRef } from "react";
import AdminAreaLayout from "../../layouts/AdminAreaLayout";
import withAuthForAdmin from "../../../hoc/withAuthForAdmin";
import OverallPerformanceChart from "../../../components/(CreatorPortalComponents)/AnalyticsComponents/OverallVideosPerformanceCard";

const CreatorsAnalyticsPage = () => {
  const [creators, setCreators] = useState([]);
  const [selectedCreator, setSelectedCreator] = useState(null);
  const [detailedAnalytics, setDetailedAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [graphLoading, setGraphLoading] = useState(false);
  const [error, setError] = useState("");
  const [timeframe, setTimeframe] = useState("7 Days");
  const [showAll, setShowAll] = useState(false);
  const graphRef = useRef(null); // Ref for smooth scrolling to the graph

  useEffect(() => {
    const fetchCreatorsSummary = async () => {
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
          `/api/admin-area/admin-analytics?timeframe=${encodeURIComponent(
            timeframe
          )}`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) {
          if (response.status === 401) {
            window.location.href = "/admin-area/login"; // Redirect unauthorized users
            return;
          }
          throw new Error("Failed to fetch creators summary.");
        }

        const data = await response.json();
        const sortedCreators = data.creators.sort((a, b) => b.plays - a.plays);
        setCreators(sortedCreators);
      } catch (err: any) {
        console.error("Error fetching creators summary:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCreatorsSummary();
  }, [timeframe]);

  const fetchCreatorDetails = async (creatorId) => {
    setGraphLoading(true);
    setDetailedAnalytics(null); // Clear old analytics

    try {
      const response = await fetch("/api/jwplayer/get-overall-analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: creatorId,
          timeframe,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch detailed analytics.");
      }

      const data = await response.json();
      setDetailedAnalytics(data);
    } catch (err) {
      console.error("Error fetching detailed analytics:", err);
    } finally {
      setGraphLoading(false);
    }
  };

  const handleViewDetails = (creator) => {
    setSelectedCreator(creator);

    // Scroll to the graph immediately
    graphRef.current?.scrollIntoView({ behavior: "smooth" });

    // Start fetching analytics data
    fetchCreatorDetails(creator.id);
  };

  return (
    <AdminAreaLayout>
      <div className="max-w-7xl mx-auto mt-8 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold mb-4">Creators Analytics</h1>
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm text-sm"
          >
            <option value="7 Days">Last 7 Days</option>
            <option value="30 Days">Last 30 Days</option>
          </select>
        </div>

        {loading ? (
          <div className="flex justify-center items-center pt-20">
            <div className="h-16 w-16 border-4 border-t-emerald-500 border-gray-300 rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <div>
            {/* Summary Table */}
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border">Creator Name</th>
                  <th className="py-2 px-4 border">Total Plays</th>
                  <th className="py-2 px-4 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {(showAll ? creators : creators.slice(0, 10)).map((creator) => (
                  <tr key={creator.id}>
                    <td className="py-2 px-4 border">{creator.full_name}</td>
                    <td className="py-2 px-4 border">{creator.plays}</td>
                    <td className="py-2 px-4 border">
                      <button
                        onClick={() => handleViewDetails(creator)}
                        className="text-blue-600 underline"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Expand/Collapse Table Button */}
            {creators.length > 10 && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-500"
              >
                {showAll ? "Show Less" : "Show All Creators"}
              </button>
            )}

            {/* Detailed Analytics */}
            {selectedCreator && (
              <div ref={graphRef} className="mt-6">
                <h2 className="text-xl font-semibold">
                  Analytics for {selectedCreator.full_name}
                </h2>
                {graphLoading ? (
                  <div className="flex justify-center items-center pt-10">
                    <div className="h-16 w-16 border-4 border-t-emerald-500 border-gray-300 rounded-full animate-spin"></div>
                  </div>
                ) : (
                  detailedAnalytics && (
                    <OverallPerformanceChart
                      data={detailedAnalytics.dailyStats}
                    />
                  )
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </AdminAreaLayout>
  );
};

export default withAuthForAdmin(CreatorsAnalyticsPage);
