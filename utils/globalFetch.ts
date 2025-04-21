import { getNextJWPlayerKey } from "./jwplayerKeys";

const originalFetch = global.fetch; // Store the original fetch function

global.fetch = async (input: RequestInfo, init: RequestInit = {}) => {
  // console.log("🛠 Inside globalFetch - Request URL:", input);

  if (typeof input === "string" && input.includes("api.jwplayer.com")) {
    const { key, nextPublicKey } = getNextJWPlayerKey();

    // console.log(`🔄 Using JW Player API Key: ${nextPublicKey}`);

    init.headers = {
      ...(init.headers || {}), // Preserve existing headers
      Authorization: `Bearer ${nextPublicKey}`, // Rotate API key automatically
    };
  }

  return originalFetch(input, init); // Call the original fetch function
};
