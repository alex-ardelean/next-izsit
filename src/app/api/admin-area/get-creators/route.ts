import { NextResponse } from "next/server";
import { withAdminErrorHandling } from "../../../../hoc/withAdminErrorHandling";

const inplayerBaseUrl = "https://services.inplayer.com";
const jwplayerBaseUrl = "https://api.jwplayer.com/v2";
const tokenHeader = "Authorization";
const JWPLAYER_API_KEY = process.env.JWPLAYER_API_KEY;
const JWPLAYER_SITE_ID = process.env.JWPLAYER_SITE_ID; // Ensure this is defined in your environment variables

export const GET = withAdminErrorHandling(async (req: Request) => {
  const authHeader = req.headers.get(tokenHeader);
  if (!authHeader) {
    return NextResponse.json(
      { error: "Authorization header is required." },
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return NextResponse.json(
      { error: "Invalid Authorization header." },
      { status: 401 }
    );
  }

  const size = 50;
  let page = 0;
  let allCreators = [];
  let totalFetched = 0;
  let total = 0;

  // Step 1: Fetch all creators
  while (true) {
    const response = await fetch(
      `${inplayerBaseUrl}/accounts/registered-users?page=${page}&size=${size}&active=true`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Error fetching registered users:", errorData);
      return NextResponse.json(
        { error: "Failed to fetch registered users." },
        { status: 500 }
      );
    }

    const data = await response.json();
    const { total: apiTotal, collection } = data;

    if (page === 0) total = apiTotal;

    const creators = collection.filter(
      (user) =>
        user.metadata?.account_role === "creator" &&
        user.metadata?.register_source === "inplayer"
    );

    allCreators = [...allCreators, ...creators];
    totalFetched += collection.length;

    if (totalFetched >= total || collection.length === 0) break;

    page++;
  }

  // Step 2: Fetch all media items for the site
  const mediaResponse = await fetch(
    `${jwplayerBaseUrl}/sites/${JWPLAYER_SITE_ID}/media?page=1&page_length=10000`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JWPLAYER_API_KEY}`,
      },
    }
  );

  let allMedia = [];
  if (mediaResponse.ok) {
    const mediaData = await mediaResponse.json();

    allMedia = mediaData.media || [];
  } else {
    console.error("Error fetching media:", await mediaResponse.text());
  }

  // Step 3: Map videos to creators by custom_params.creatorId
  const creatorsWithVideos = allCreators.map((creator) => {
    const creatorVideos = allMedia.filter(
      (media) =>
        media.metadata?.custom_params?.inplayer_user_id &&
        media.metadata.custom_params.inplayer_user_id === creator.id.toString()
    );
    return { ...creator, videos: creatorVideos };
  });

  return NextResponse.json({
    count: creatorsWithVideos.length,
    creators: creatorsWithVideos,
  });
});
