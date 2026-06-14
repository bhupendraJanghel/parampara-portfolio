import { NextResponse } from "next/server";

interface InstagramPostItem {
  id: string;
  mediaUrl: string;
  permalink: string;
  caption?: string;
  mediaType: string;
  timestamp: string;
  thumbnailUrl?: string;
  sizes?: {
    small?: { mediaUrl?: string };
    medium?: { mediaUrl?: string };
    large?: { mediaUrl?: string };
    full?: { mediaUrl?: string };
  };
}

interface MappedPost {
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
  link: string;
  date: string;
}

const fallbackPosts = [
  {
    imageUrl: "/gallery/wedding_stage.png",
    caption: "A grand setting for a grand beginning. Elegantly detailed stage setup with cascading white florals and custom lighting. 🌸✨ #ParamparaWeddings #WeddingDecor #FloralDesign",
    likes: 342,
    comments: 18,
    link: "https://instagram.com/paramparaevents",
    date: "2 days ago",
  },
  {
    imageUrl: "/gallery/reception_ambience.png",
    caption: "Setting the mood for a perfect celebration. Ambient lighting and table settings designed to invite and inspire.🕯️✨ #ReceptionDesign #Ambience #TableSetting",
    likes: 215,
    comments: 11,
    link: "https://instagram.com/paramparaevents",
    date: "5 days ago",
  },
  {
    imageUrl: "/gallery/sangeet_energy.png",
    caption: "A night of celebration, music, and dance. Modern geometric stage designs paired with high-energy concert production. ⚡🕺 #SangeetNight #StageDesign #EventProduction",
    likes: 418,
    comments: 29,
    link: "https://instagram.com/paramparaevents",
    date: "1 week ago",
  },
  {
    imageUrl: "/gallery/mehendi_styling.png",
    caption: "Vibrant colors and traditional details. We bring spaces to life with authentic marigolds, props, and bright drapes. 💛🍊 #MehendiDecor #TraditionalVibes #HaldiCeremony",
    likes: 289,
    comments: 14,
    link: "https://instagram.com/paramparaevents",
    date: "1 week ago",
  },
  {
    imageUrl: "/gallery/destination_setup.png",
    caption: "Crafting dreams across beautiful destinations. Sunset setups designed to blend with natural vistas. 🌅🌊 #DestinationWedding #BeachWedding #SunsetVows",
    likes: 512,
    comments: 42,
    link: "https://instagram.com/paramparaevents",
    date: "2 weeks ago",
  },
  {
    imageUrl: "/gallery/guest_experience.png",
    caption: "It is all in the details. Personalized entryways and installations that welcome guests with warmth. 🚪✨ #GuestExperience #EventStyling #DetailsMatter",
    likes: 198,
    comments: 7,
    link: "https://instagram.com/paramparaevents",
    date: "3 weeks ago",
  },
];

function getRelativeTime(timestampStr: string): string {
  try {
    const parsed = new Date(timestampStr);
    const now = new Date();
    const diffMs = now.getTime() - parsed.getTime();

    // Safety check for future dates
    if (diffMs < 0) return "just now";

    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return `yesterday`;
    if (diffDays < 7) return `${diffDays} days ago`;

    const diffWeeks = Math.floor(diffDays / 7);
    if (diffWeeks < 4) return `${diffWeeks} week${diffWeeks > 1 ? "s" : ""} ago`;

    return parsed.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  } catch {
    return "recently";
  }
}

export async function GET() {
  const feedUrl = process.env.INSTAGRAM_FEED_URL;

  if (!feedUrl) {
    console.warn("INSTAGRAM_FEED_URL not configured. Serving fallback instagram posts.");
    return NextResponse.json({
      posts: fallbackPosts,
      username: "theparamparaevents",
      profilePictureUrl: null,
      source: "local_mock",
    });
  }

  if (feedUrl.includes("services.behold.so/link/")) {
    console.warn("WARNING: INSTAGRAM_FEED_URL is set to the Behold authentication link instead of the JSON feed URL.");
    console.warn("Please visit that link in your browser, complete the setup, and paste the resulting 'https://feeds.behold.so/...' URL into your .env.local.");
    return NextResponse.json({
      posts: fallbackPosts,
      username: "theparamparaevents",
      profilePictureUrl: null,
      source: "local_mock_fallback",
      error: "INSTAGRAM_FEED_URL is set to the authentication link, not the JSON feed URL.",
    });
  }

  try {
    const response = await fetch(feedUrl, {
      method: "GET",
      next: { revalidate: 21600 }, // Cache for 6 hours
    });

    if (!response.ok) {
      throw new Error(`Instagram Feed API returned status ${response.status}`);
    }

    const data = await response.json();

    // Behold returns posts array directly or as { posts: [...] } depending on endpoint type
    const rawPosts = Array.isArray(data) ? data : data.posts || [];
    const username = (!Array.isArray(data) && data.username) ? data.username : "theparamparaevents";
    const profilePictureUrl = (!Array.isArray(data) && data.profilePictureUrl) ? data.profilePictureUrl : null;

    if (rawPosts.length === 0) {
      throw new Error("No posts found in feed response");
    }

    // Map to our unified format
    const posts: MappedPost[] = rawPosts.map((post: InstagramPostItem, index: number) => {
      // Deterministic likes and comments calculation since the basic display API doesn't return them
      const numId = parseInt(post.id.replace(/\D/g, "").slice(-4)) || index + 10;
      const likes = 120 + (numId % 380); // Likes range 120 - 500
      const comments = 5 + (numId % 40); // Comments range 5 - 45

      // Decide the best image source:
      // 1. Behold's cached/resized medium image if available (best, works for reels/videos too)
      // 2. If it's a video/reel (or mediaUrl is a .mp4), use the static thumbnailUrl
      // 3. Otherwise fall back to mediaUrl
      const isVideo = post.mediaType === "VIDEO" || post.mediaUrl?.includes(".mp4");
      const imageUrl = post.sizes?.medium?.mediaUrl ||
        (isVideo && post.thumbnailUrl ? post.thumbnailUrl : post.mediaUrl) ||
        post.thumbnailUrl ||
        "/gallery/wedding_stage.png";

      return {
        imageUrl,
        caption: post.caption || "A beautiful celebration by Parampara Events. ✨",
        likes,
        comments,
        link: post.permalink || `https://instagram.com/${username}`,
        date: getRelativeTime(post.timestamp),
      };
    });

    return NextResponse.json({
      posts,
      username,
      profilePictureUrl,
      source: "instagram_feed",
    });
  } catch (error) {
    const err = error as Error;
    console.error("Error fetching Instagram posts:", err);

    return NextResponse.json({
      posts: fallbackPosts,
      username: "theparamparaevents",
      profilePictureUrl: null,
      source: "local_mock_fallback",
      error: err.message || "Unknown error",
    });
  }
}
