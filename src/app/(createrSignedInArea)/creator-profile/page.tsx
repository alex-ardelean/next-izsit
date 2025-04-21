"use client";

import { useEffect, useState } from "react";
import CreatorLoginLayout from "../../layouts/CreatorLayout";
import withAuth from "../../../hoc/withAuth";
import { useRouter } from "next/navigation";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import { uploadThumbnail } from "../../../../utils/uploadThumbnail";
import { fetchAccountDetails } from "../../../../utils/fetchAccountDetails";
import { CreatorProfileAlert } from "../../../components/(AlertAndBadges)/CreatorProfileAlert";
import SocialMediaLinks from "../../../components/(CreatorPortalComponents)/SocialMediaLinks";

const CreatorProfile = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [backgroundImage, setBackgroundImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [hubId, setHubId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Loader on mount
  const [isSaving, setIsSaving] = useState(false); // Loader when saving
  const [loadingDots, setLoadingDots] = useState(".");
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertTitle, setAlertTitle] = useState<string | null>(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [redirectAfterAlert, setRedirectAfterAlert] = useState(false); // ✅ Track if redirect is needed after closing alert
  const [socialLinks, setSocialLinks] = useState({
    facebook: "",
    instagram: "",
    youtube: "",
    twitter: "",
    twitch: "",
    linkedin: "",
  });
  const router = useRouter();

  // ✅ Fetch existing hub details on mount
  useEffect(() => {
    async function fetchHub() {
      try {
        const token =
          localStorage.getItem("inplayer_access_token") ||
          sessionStorage.getItem("inplayer_access_token");

        if (!token) {
          throw new Error("User is not logged in.");
        }

        const accountResponse = await fetch(
          "https://services.inplayer.com/accounts",
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!accountResponse.ok) {
          throw new Error("Failed to fetch account details.");
        }

        const accountDetails = await accountResponse.json();
        const inplayerUserId = accountDetails.id;

        const response = await fetch(
          `/api/jwplayer/get-creator-hub?inplayer_user_id=${inplayerUserId}`
        );

        if (!response.ok) throw new Error("Failed to fetch hub");

        const data = await response.json();

        console.log(data);

        if (data.hub) {
          setHubId(data.hub.id);
          setName(data.hub.title);
          setDescription(data.hub.description);
          setSocialLinks({
            facebook: data.hub.facebook_url || "",
            instagram: data.hub.instagram_url || "",
            youtube: data.hub.youtube_url || "",
            twitter: data.hub.twitter_url || "",
            twitch: data.hub.twitch_url || "",
            linkedin: data.hub.linkedin_url || "",
          });

          const thumbnailResponse = await fetch(
            "/api/jwplayer/get-thumbnails",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ videoId: data.hub.id }),
            }
          );

          if (thumbnailResponse.ok) {
            const thumbnailData = await thumbnailResponse.json();
            setPreviewImage(thumbnailData.static_thumbnail_url || null);
          }
        }
      } catch (error) {
        console.error("Error fetching hub:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchHub();
  }, []);

  // Handle the loading animation effect when submitting
  useEffect(() => {
    if (isSaving) {
      const interval = setInterval(() => {
        setLoadingDots((prev) => {
          if (prev === ".") return "..";
          if (prev === "..") return "...";
          return ".";
        });
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isSaving]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setBackgroundImage(file);

      // Show a preview of the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !description.trim()) {
      setAlertTitle("Missing Information");
      setAlertMessage("Both name and description are required.");
      setAlertOpen(true);
      return;
    }

    setIsSaving(true);
    try {
      const userId = await fetchAccountDetails();
      let newMediaId = hubId;

      const response = await fetch(
        hubId
          ? "/api/jwplayer/update-creator-hub"
          : "/api/jwplayer/create-creator-profile",
        {
          method: hubId ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: name,
            description,
            contentType: "hub",
            inplayer_user_id: userId,
            hubId,
            ...socialLinks,
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to create/update media.");
      }

      if (!hubId) {
        if (data && data.id) {
          newMediaId = data.id;
          setHubId(newMediaId);
        } else {
          throw new Error("Failed to retrieve media ID.");
        }
      }

      if (backgroundImage) {
        await uploadThumbnail(backgroundImage, newMediaId, name, description);
      }

      setAlertTitle("Success");
      setAlertMessage(
        hubId
          ? "Profile updated successfully!"
          : "Profile created successfully!"
      );
      setRedirectAfterAlert(true);
      setAlertOpen(true);
    } catch (error) {
      console.error("Error saving profile:", error);
      setAlertTitle("Error");
      setAlertMessage("Failed to save profile. Please try again.");
      setAlertOpen(true);
    } finally {
      setIsSaving(false);
    }
  };
  return (
    <CreatorLoginLayout>
      {/* ✅ Spinner loader when fetching data */}
      {isLoading && (
        <div className="flex justify-center items-center pt-20">
          <div className="h-16 w-16 border-4 border-t-emerald-500 border-gray-300 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Full-screen loader when submitting */}
      {isSaving && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex flex-col items-center justify-center">
          <div className="text-white text-lg font-bold">
            Updating Information{loadingDots}
          </div>
          <p className="mt-2 text-xs text-gray-200 text-center">
            This might take a moment. Please wait...
          </p>
        </div>
      )}

      {!isLoading && (
        <div className="max-w-4xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">
            {hubId ? "Edit Your Profile" : "Create Your Profile"}
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter your creator name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 sm:text-sm"
              />
            </div>

            {/* Description Input */}
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                placeholder="Tell us about yourself"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 sm:text-sm"
                rows={4}
              />
            </div>

            {/* Social Media Component */}
            <SocialMediaLinks
              socialLinks={socialLinks}
              setSocialLinks={setSocialLinks}
            />

            {/* Background Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Background Image
              </label>
              <div className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Selected background"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                ) : (
                  <>
                    <CloudArrowUpIcon className="mx-auto w-12 h-12 text-gray-400" />
                    <span className="mt-2 block text-sm font-semibold text-gray-900">
                      Drag and drop an image, or click to select
                    </span>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-500 py-2 text-white font-medium rounded-md"
              disabled={isSaving}
            >
              {isSaving
                ? "Saving..."
                : hubId
                ? "Update Profile"
                : "Save Profile"}
            </button>
          </form>
        </div>
      )}

      <CreatorProfileAlert
        title={alertTitle}
        message={alertMessage}
        isOpen={alertOpen}
        redirectAfterAlert={redirectAfterAlert} // Controls whether redirect happens
        onClose={() => setAlertOpen(false)} // Closes the alert
        onRedirect={() => router.push("/creator-dashboard")} // Handles redirect after delay
      />
    </CreatorLoginLayout>
  );
};

export default withAuth(CreatorProfile);
