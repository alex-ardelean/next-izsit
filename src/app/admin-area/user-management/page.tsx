"use client";

import { useEffect, useState } from "react";
import AdminAreaLayout from "../../layouts/AdminAreaLayout";
import withAuthForAdmin from "../../../hoc/withAuthForAdmin";
import CreateCreatorModal from "../../../components/(AdminAreaComponents)/CreateCreatorModal";
import CreatorCard from "../../../components/(AdminAreaComponents)/CreatorCard";
import LatestVideosTable from "../../../components/(AdminAreaComponents)/LatestVideosTable";
import VideoStatsCards from "../../../components/(AdminAreaComponents)/VideoStatsCards";
import UncategorizedVideosTable from "../../../components/(AdminAreaComponents)/UncategorizedVideosTable";

function CreatorsPage() {
  const [creators, setCreators] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchCreators = async () => {
      setLoading(true);
      setErrorMessage("");

      try {
        const token =
          localStorage.getItem("inplayer_access_token") ||
          sessionStorage.getItem("inplayer_access_token");

        if (!token) {
          throw new Error("Authorization token is missing.");
        }

        const response = await fetch("/api/admin-area/get-creators", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          if (response.status === 401) {
            window.location.href = "/admin-area/login"; // Redirect unauthorized users
            return;
          }
          throw new Error("Failed to fetch creators.");
        }

        const data = await response.json();
        const creatorsWithVideos = data.creators.map((creator) => ({
          ...creator,
          videos: creator.videos || [], // Ensure videos is initialized as an empty array if undefined
        }));
        setCreators(creatorsWithVideos);
        setCount(data.count);
      } catch (error: any) {
        console.error("Error fetching creators:", error);
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCreators();
  }, []);

  // --- Latest 10 Videos Table Data ---
  const allVideos = creators.flatMap((creator) =>
    creator.videos.map((video) => ({
      ...video,
      creatorName: creator.full_name,
    }))
  );

  // Sort videos by their "created" property (newest first) and take the top 10.
  const latestVideos = [...allVideos]
    .sort(
      (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
    )
    .slice(0, 10);

  const uncategorizedVideos = allVideos.filter(
    (video) => !video.metadata?.custom_params?.contentType
  );

  const handleCreateCreator = async (creatorData) => {
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const token =
        localStorage.getItem("inplayer_access_token") ||
        sessionStorage.getItem("inplayer_access_token");

      if (!token) {
        setErrorMessage("Authorization token is missing.");
        return;
      }

      const formData = new URLSearchParams({
        full_name: creatorData.full_name,
        username: creatorData.username,
        password: creatorData.password,
        password_confirmation: creatorData.password,
        type: "consumer",
        client_id: "9caad36a-607f-4809-8fc3-ad712c0bd4cd",
        "metadata[account_role]": "creator",
        grant_type: "password",
      });

      const response = await fetch("https://services.inplayer.com/accounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();

        if (response.status === 409) {
          setErrorMessage(
            "Not created. A creator with this email already exists."
          );
          return;
        } else if (response.status === 400) {
          setErrorMessage(
            errorData?.errors?.password || "Invalid request data. Check inputs."
          );
          return;
        } else {
          setErrorMessage(
            errorData?.message ||
              "An unexpected error occurred. Please try again."
          );
          return;
        }
      }

      const createdCreator = await response.json();

      // Add the new creator to the top of the list
      setCreators((prev) => [
        {
          ...createdCreator.account,
          videos: [], // Ensure videos is an empty array for the new creator
        },
        ...prev,
      ]);
      setCount((prevCount) => prevCount + 1); // Increment count

      setSuccessMessage("Creator created successfully!");
      setErrorMessage(""); // Clear any error messages
      setIsModalOpen(false); // Close the modal
    } catch (error) {
      console.error("Error creating creator:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleExportEmails = () => {
    if (creators.length === 0) {
      alert("No creators available to export.");
      return;
    }

    // Prepare email data as a CSV string
    const emailData = creators.map((creator) => creator.email).join("\n");

    // Create a Blob for the email data
    const blob = new Blob([emailData], { type: "text/plain" });

    // Create a URL for the Blob and trigger a download
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "creators_emails.txt"; // Change extension to .csv for CSV format
    a.click();

    // Clean up the URL object
    URL.revokeObjectURL(url);
  };

  return (
    <AdminAreaLayout>
      {loading ? (
        <div className="flex justify-center items-center pt-20">
          <div className="h-16 w-16 border-4 border-t-emerald-500 border-gray-300 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto mt-8 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Creators in total ({count})</h1>
            <div className="flex space-x-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-emerald-600 text-white text-sm rounded-md hover:bg-emerald-500"
              >
                Create New Creator
              </button>
              <button
                onClick={handleExportEmails}
                className="px-4 py-2 bg-emerald-900 text-white text-sm rounded-md hover:bg-emerald-800"
              >
                Export Emails
              </button>
            </div>
          </div>
          <VideoStatsCards videos={allVideos} />

          {/* --- Latest 10 Videos Table --- */}
          <LatestVideosTable latestVideos={latestVideos} />
          {/* --- End Latest Videos Table --- */}
          <UncategorizedVideosTable uncategorizedVideos={uncategorizedVideos} />

          {/* Feedback Messages */}
          {errorMessage && (
            <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="mt-2 text-sm text-green-600">{successMessage}</p>
          )}

          <ul
            role="list"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-4"
          >
            {creators.map((creator) => (
              <CreatorCard key={creator.id} creator={creator} />
            ))}
          </ul>
        </div>
      )}
      <CreateCreatorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateCreator}
      />
    </AdminAreaLayout>
  );
}

export default withAuthForAdmin(CreatorsPage);
