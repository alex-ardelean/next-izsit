"use client";

import React from "react";

interface SocialMediaLinksProps {
  socialLinks: {
    facebook: string;
    instagram: string;
    youtube: string;
    twitter: string;
    twitch: string;
    linkedin: string;
  };
  setSocialLinks: React.Dispatch<
    React.SetStateAction<{
      facebook: string;
      instagram: string;
      youtube: string;
      twitter: string;
      twitch: string;
      linkedin: string;
    }>
  >;
}

const SocialMediaLinks: React.FC<SocialMediaLinksProps> = ({
  socialLinks,
  setSocialLinks,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSocialLinks({ ...socialLinks, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">
        Social Media Links
      </h3>
      {[
        { label: "Facebook", name: "facebook" },
        { label: "Instagram", name: "instagram" },
        { label: "YouTube", name: "youtube" },
        { label: "X (Twitter)", name: "twitter" },
        { label: "Twitch", name: "twitch" },
        { label: "LinkedIn", name: "linkedin" },
      ].map((platform) => (
        <div key={platform.name}>
          <label className="block text-sm font-medium text-gray-900">
            {platform.label}
          </label>
          <input
            type="url"
            name={platform.name}
            placeholder={`(Optional) Add your ${platform.label} profile link`}
            value={socialLinks[platform.name as keyof typeof socialLinks]}
            onChange={handleChange}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 sm:text-sm"
          />
        </div>
      ))}
    </div>
  );
};

export default SocialMediaLinks;
