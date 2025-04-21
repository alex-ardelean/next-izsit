let keyIndex = 0; // Track the current API key

const JWPLAYER_KEYS = [
  process.env.JWPLAYER_API_KEY_1,
  process.env.JWPLAYER_API_KEY_2,
  process.env.JWPLAYER_API_KEY_3,
  process.env.JWPLAYER_API_KEY_4,
  process.env.JWPLAYER_API_KEY_5,
].filter(Boolean); // Remove empty values (in case any key is missing)

const NEXT_PUBLIC_JWPLAYER_KEYS = [
  process.env.NEXT_PUBLIC_JWPLAYER_API_KEY_1,
  process.env.NEXT_PUBLIC_JWPLAYER_API_KEY_2,
  process.env.NEXT_PUBLIC_JWPLAYER_API_KEY_3,
  process.env.NEXT_PUBLIC_JWPLAYER_API_KEY_4,
  process.env.NEXT_PUBLIC_JWPLAYER_API_KEY_5,
].filter(Boolean);

export function getNextJWPlayerKey() {
  if (JWPLAYER_KEYS.length === 0 || NEXT_PUBLIC_JWPLAYER_KEYS.length === 0) {
    throw new Error("❌ No JWPLAYER API keys found in environment variables.");
  }

  // Get the next API key (round-robin rotation)
  const key = JWPLAYER_KEYS[keyIndex];
  const nextPublicKey = NEXT_PUBLIC_JWPLAYER_KEYS[keyIndex];

  // Move to the next key for the next request (round-robin rotation)
  keyIndex = (keyIndex + 1) % JWPLAYER_KEYS.length;

  return { key, nextPublicKey };
}
