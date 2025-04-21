"use client";
import React, { useState, useEffect } from "react";
import CreatorLoginLayout from "../../layouts/CreatorLayout";
import withAuth from "../../../hoc/withAuth";
import OverallPerformanceChart from "../../../components/(CreatorPortalComponents)/AnalyticsComponents/OverallVideosPerformanceCard";
import VideoCard from "../../../components/(CreatorPortalComponents)/AnalyticsComponents/PerVideoCard";

const CreatorAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeframe, setTimeframe] = useState("7 Days");
  const [currentPage, setCurrentPage] = useState(1);
  const pageLength = 10;

  // Fetch analytics data
  const fetchAnalytics = async (selectedTimeframe, page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const token =
        localStorage.getItem("inplayer_access_token") ||
        sessionStorage.getItem("inplayer_access_token");

      if (!token) {
        throw new Error("User is not logged in.");
      }

      // Fetch user account details
      const accountResponse = await fetch(
        "https://services.inplayer.com/accounts",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!accountResponse.ok) {
        throw new Error("Failed to fetch account details.");
      }

      const accountDetails = await accountResponse.json();
      const inplayerUserId = accountDetails.id;

      // Fetch analytics data
      const analyticsResponse = await fetch(
        "/api/jwplayer/get-overall-analytics",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: inplayerUserId,
            timeframe: selectedTimeframe,
            page,
            pageLength,
          }),
        }
      );

      if (!analyticsResponse.ok) {
        if (analyticsResponse.status === 504) {
          throw new Error("The request timed out. Please try again later.");
        }
        throw new Error("Failed to fetch analytics data.");
      }

      const data = await analyticsResponse.json();

      if (data.totalVideos === 0) {
        setAnalyticsData({
          totalVideos: 0,
          dailyStats: [],
          perVideoStats: [],
        });
        setLoading(false);
        return;
      }

      setAnalyticsData(data);
      setCurrentPage(page);
    } catch (err) {
      console.error("Error fetching analytics data:", err);
      setError(err.message);
      setAnalyticsData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics(timeframe, currentPage);
  }, [timeframe, currentPage]);

  const handlePageChange = (newPage) => {
    if (
      newPage < 1 ||
      newPage > Math.ceil(analyticsData?.totalVideos / pageLength)
    )
      return;
    fetchAnalytics(timeframe, newPage);
  };

  return (
    <CreatorLoginLayout>
      <div className="max-w-7xl mx-auto mt-8 sm:px-6 lg:px-8">
        <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Your Analytics</h1>
            {!loading && !error && analyticsData && (
              <p className="mt-1 text-xs text-gray-500">
                View your overall video performance below.
              </p>
            )}
          </div>
          <select
            className="rounded-md border-gray-300 shadow-sm mt-4 sm:mt-0"
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
          >
            <option value="7 Days">Last 7 Days</option>
            <option value="30 Days">Last 30 Days</option>
          </select>
        </header>

        {loading ? (
          <div className="flex justify-center items-center pt-20">
            <div className="h-16 w-16 border-4 border-t-emerald-500 border-gray-300 rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="mt-4 text-gray-600 text-center">
            <p>{error}</p>
            <p>
              Please try refreshing the page or selecting a different option.
            </p>
            <button
              onClick={() => fetchAnalytics(timeframe, currentPage)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Retry
            </button>
          </div>
        ) : analyticsData?.totalVideos === 0 ? (
          <div className="mt-4 text-gray-600 text-center">
            <p>No videos found for the selected timeframe.</p>
            <p>Try uploading videos or changing the timeframe.</p>
          </div>
        ) : (
          <>
            {/* Overall Performance Chart */}
            <div className="mt-4">
              <OverallPerformanceChart data={analyticsData.dailyStats} />
            </div>

            {/* Per-Video Cards */}
            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {analyticsData.perVideoStats.map((video) => (
                <VideoCard
                  key={video.mediaId}
                  title={video.title}
                  stats={video.stats}
                />
              ))}
            </div>

            {/* Pagination */}
            <nav
              aria-label="Pagination"
              className="mt-6 flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6"
            >
              <div className="hidden sm:block">
                <p className="text-sm text-gray-700">
                  Showing{" "}
                  <span className="font-medium">
                    {(currentPage - 1) * pageLength + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {Math.min(
                      currentPage * pageLength,
                      analyticsData.totalVideos
                    )}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium">
                    {analyticsData.totalVideos}
                  </span>{" "}
                  videos
                </p>
              </div>
              <div className="flex flex-1 justify-between sm:justify-end">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={
                    currentPage * pageLength >= analyticsData.totalVideos
                  }
                  className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </nav>
          </>
        )}
      </div>
    </CreatorLoginLayout>
  );
};

export default withAuth(CreatorAnalytics);
