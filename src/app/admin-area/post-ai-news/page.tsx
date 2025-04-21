"use client";

import { useState, FormEvent } from "react";
import withAuthForAdmin from "../../../hoc/withAuthForAdmin";
import AdminAreaLayout from "../../layouts/AdminAreaLayout";

function AdminDashboardArea() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [loading, setLoading] = useState(false); // New loading state

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting

    const post = { title, description, youtubeLink, date: new Date() };

    try {
      const res = await fetch("/api/admin-area/post-news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to add post.");
      }

      console.log(await res.json());

      alert("Post added successfully!");
      setTitle(""); // Reset the form fields
      setDescription("");
      setYoutubeLink("");
    } catch (error) {
      alert(`Error: ${(error as Error).message}`);
    } finally {
      setLoading(false); // Set loading to false after submission
    }
  };

  return (
    <AdminAreaLayout>
      <div className="max-w-lg mx-auto mt-10">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Admin Dashboard - Add a News Post
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="url"
            value={youtubeLink}
            onChange={(e) => setYoutubeLink(e.target.value)}
            placeholder="YouTube Video URL"
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
            disabled={loading} // Disable the button while loading
          >
            {loading ? "Publishing..." : "Publish"}
          </button>
        </form>
      </div>
    </AdminAreaLayout>
  );
}

// Wrap the component with the HOC
export default withAuthForAdmin(AdminDashboardArea);
