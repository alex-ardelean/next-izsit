"use client";

import { useState, useEffect } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import CreatorLoginLayout from "../../layouts/CreatorLayout";
import withAuth from "../../../hoc/withAuth";
import { useRouter } from "next/navigation";
import CreateSeriesModal from "../../../components/(CreatorPortalComponents)/CreateSeriesModal";
import { createSeries } from "../../../../utils/createSeries";
import EditSeriesModal from "../../../components/(CreatorPortalComponents)/EditSeriesModal";
import DeleteSeriesModal from "../../../components/(AlertAndBadges)/DeleteSeriesModal";
import { editSeries } from "../../../../utils/editSeries";

const CreatorSeries = () => {
  const [seriesList, setSeriesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSeries, setSelectedSeries] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [seriesToDelete, setSeriesToDelete] = useState(null);

  const router = useRouter();

  useEffect(() => {
    async function fetchDetailedSeries() {
      setLoading(true);
      try {
        const token =
          localStorage.getItem("inplayer_access_token") ||
          sessionStorage.getItem("inplayer_access_token");

        if (!token) {
          throw new Error("User is not logged in.");
        }

        // Fetch account details to get inplayer_user_id
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

        // Fetch detailed series list for the logged-in user
        const seriesResponse = await fetch(
          "/api/jwplayer/get-detailed-series-list-for-series-area",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: inplayerUserId }),
          }
        );

        if (!seriesResponse.ok) {
          throw new Error("Failed to fetch detailed series list.");
        }

        const data = await seriesResponse.json();
        const seriesList = data.series || [];

        setSeriesList(seriesList);
      } catch (error) {
        console.error("Error fetching detailed series list:", error);
        setSeriesList([]);
      } finally {
        setLoading(false);
      }
    }

    fetchDetailedSeries();
  }, []);

  const handleCreateSeries = async (seriesData: {
    title: string;
    description: string;
    mainGenre: string;
    parentalRating: string;
  }): Promise<{ id: string }> => {
    try {
      const newSeries = await createSeries(seriesData);
      setSeriesList((prev) => [...prev, { ...seriesData, id: newSeries.id }]);
      return { id: newSeries.id };
    } catch (error) {
      console.error("Error creating series:", error);
      alert("Failed to create series. Please try again.");
      throw error;
    }
  };

  const handleEditSeries = async (
    seriesId: string,
    updatedData: {
      title: string;
      description: string;
      mainGenre: string;
      parentalRating: string;
    }
  ): Promise<{ id: string }> => {
    try {
      const updatedSeries = await editSeries(seriesId, updatedData);

      // Update the specific series locally
      setSeriesList((prev) =>
        prev.map((series) =>
          series.id === seriesId
            ? { ...series, ...updatedData, ...updatedSeries }
            : series
        )
      );

      return { id: updatedSeries.id }; // Ensure the updated series with `id` is returned
    } catch (error) {
      console.error("Error updating series:", error);
      alert("Failed to update series. Please try again.");
      throw error; // Propagate the error for further handling
    }
  };

  const handleDeleteSeries = async () => {
    if (!seriesToDelete) return;

    try {
      const response = await fetch("/api/jwplayer/delete-series", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ seriesId: seriesToDelete.id }),
      });

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message || "Failed to delete series.");
      }

      setSeriesList((prev) =>
        prev.filter((series) => series.id !== seriesToDelete.id)
      );
      setDeleteModalOpen(false);
      setSeriesToDelete(null);
    } catch (error) {
      console.error("Error deleting series:", error);
      alert(error.message || "Failed to delete series. Please try again.");
    }
  };

  const handleThumbnailUpdate = (seriesId, newThumbnailUrl) => {
    setSeriesList((prevList) =>
      prevList.map((series) =>
        series.id === seriesId
          ? { ...series, staticThumbnail: newThumbnailUrl }
          : series
      )
    );
  };

  const handleMotionThumbnailUpdate = (seriesId, newMotionThumbnailUrl) => {
    setSeriesList((prevList) =>
      prevList.map((series) =>
        series.id === seriesId
          ? { ...series, motionThumbnail: newMotionThumbnailUrl }
          : series
      )
    );
  };

  const handleThumbnailsUploaded = (
    seriesId,
    { staticThumbnail, motionThumbnail }
  ) => {
    setSeriesList((prevList) =>
      prevList.map((series) =>
        series.id === seriesId
          ? { ...series, staticThumbnail, motionThumbnail }
          : series
      )
    );
  };

  return (
    <CreatorLoginLayout>
      {/* General loader */}

      <div className="max-w-7xl mx-auto mt-8 sm:px-6 lg:px-8">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Your series</h1>
            {!loading && seriesList.length > 0 && (
              <p className="mt-1 text-xs text-gray-500">
                Manage your series and associated videos below.
              </p>
            )}
          </div>
          {!loading && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="rounded-md bg-emerald-500 px-4 py-2 text-white text-sm font-medium hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Create New Series
            </button>
          )}
        </header>
        {loading && (
          <div className="flex justify-center items-center pt-20">
            <div className="h-16 w-16 border-4 border-t-emerald-500 border-gray-300 rounded-full animate-spin"></div>
          </div>
        )}

        {loading ? null : seriesList.length === 0 ? (
          <div className="mt-4 text-gray-600 text-center">
            <p>No series found yet.</p>
            <p>Create a new series to group your videos.</p>
          </div>
        ) : (
          <ul
            role="list"
            className="grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 mt-4"
          >
            {seriesList.map((series) => (
              <li key={series.id} className="relative">
                <div
                  className="group overflow-hidden rounded-lg aspect-video relative bg-gray-100"
                  style={{
                    backgroundImage: series.staticThumbnail
                      ? `url(${series.staticThumbnail})`
                      : undefined,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {!series.staticThumbnail && (
                    <span className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm">
                      No Static Thumbnail
                    </span>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-end p-4 transition-opacity group-hover:opacity-100">
                    <h2 className="text-lg font-semibold text-white truncate">
                      {series.title}
                    </h2>
                    <p className="mt-1 text-sm text-gray-300 truncate">
                      {series.description && series.description.trim()
                        ? series.description
                        : "No description provided"}
                    </p>
                    <p className="mt-2 text-sm text-gray-200">
                      Videos: {series.videoCount || 0}
                    </p>
                  </div>

                  {/* Delete Button */}
                  <button
                    className="absolute top-2 left-2 z-10 rounded-full bg-red-500 p-2 hover:bg-red-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteModalOpen(true);
                      setSeriesToDelete(series);
                    }}
                  >
                    <TrashIcon className="h-5 w-5 text-white" />
                  </button>

                  {/* Edit Button */}
                  <button
                    className="absolute top-2 right-2 z-10 rounded-full bg-gray-200 p-2 hover:bg-gray-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsEditModalOpen(true);
                      setSelectedSeries(series);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-5 w-5 text-gray-700"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 3.487a2.25 2.25 0 013.182 0l.469.47a2.25 2.25 0 010 3.182L10.34 17.313l-4.255.743.744-4.255L16.862 3.487z"
                      />
                    </svg>
                  </button>
                </div>
                {/* Manage series button */}
                <button
                  onClick={() =>
                    router.push(`/creator-series/manage?id=${series.id}`)
                  }
                  className="w-full rounded-md mt-2 bg-emerald-500 py-2 px-4 text-white text-sm font-medium hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                >
                  Manage Series
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <CreateSeriesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateSeries}
        onThumbnailsUploaded={handleThumbnailsUploaded}
      />

      <EditSeriesModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditSeries}
        series={selectedSeries}
        onThumbnailUpdate={handleThumbnailUpdate}
        onMotionThumbnailUpdate={handleMotionThumbnailUpdate}
      />

      <DeleteSeriesModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteSeries}
        seriesTitle={seriesToDelete?.title || "this series"}
      />
    </CreatorLoginLayout>
  );
};

export default withAuth(CreatorSeries);
