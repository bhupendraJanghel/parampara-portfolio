import { NextResponse } from "next/server";

interface GoogleReviewItem {
  authorAttribution: {
    displayName: string;
    photoUri?: string;
    uri?: string;
  };
  rating: number;
  relativePublishTimeDescription: string;
  publishTime: string; // ISO date string from Google Places API
  text?: {
    text: string;
    languageCode?: string;
  };
}

const fallbackReviews = [
  {
    quote: "Parampara Events designed the mandap for our wedding. The decor was absolutely stunning! The blend of marigolds and fresh roses was so elegant, and all our guests couldn't stop praising it.",
    name: "Aditi & Rahul",
    location: "Delhi NCR",
    date: "2 weeks ago",
    publishTime: "2026-05-10T10:00:00Z",
    rating: 5,
    initials: "AR",
    gradient: "from-[#e0cfab] to-[#c5a059]",
  },
  {
    quote: "Extremely professional wedding planners. The Sangeet stage lighting and sound were handled flawlessly with zero stress. Truly premium and value for money service.",
    name: "Rohan Sharma",
    location: "Mumbai",
    date: "1 month ago",
    publishTime: "2026-04-24T10:00:00Z",
    rating: 5,
    initials: "RS",
    gradient: "from-[#1b3225]/20 to-[#1b3225]/40",
  },
  {
    quote: "They turned our destination wedding in Goa into a fairytale. From the beachside welcome dinner styling to the main sunset ceremony decor, every detail was perfect.",
    name: "Meera & Vikram",
    location: "Goa Destination",
    date: "3 weeks ago",
    publishTime: "2026-05-03T10:00:00Z",
    rating: 5,
    initials: "MV",
    gradient: "from-[#caa15c]/20 to-[#caa15c]/45",
  },
  {
    quote: "The attention to detail in the Mehendi setup was gorgeous. Very warm, cooperative team that accommodated all our last-minute requests patiently.",
    name: "Priya Patel",
    location: "Ahmedabad",
    date: "5 days ago",
    publishTime: "2026-05-19T10:00:00Z",
    rating: 5,
    initials: "PP",
    gradient: "from-[#f1d6a0] to-[#c5a059]",
  },
];

export async function GET() {
  const apiKey = process.env.GOOGLE_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  // If environment variables are missing, serve mock fallback data sorted latest first
  if (!apiKey || !placeId) {
    console.warn("GOOGLE_API_KEY or GOOGLE_PLACE_ID not configured. Serving fallback reviews.");
    const sortedFallback = [...fallbackReviews].sort((a, b) => {
      return new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime();
    });
    return NextResponse.json({
      reviews: sortedFallback,
      rating: 5.0,
      totalReviews: 124,
      source: "local_mock",
    });
  }

  try {
    const url = `https://places.googleapis.com/v1/places/${placeId}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "reviews.authorAttribution.displayName,reviews.authorAttribution.photoUri,reviews.relativePublishTimeDescription,reviews.rating,reviews.text,reviews.publishTime,rating,userRatingCount",
      },
      next: { revalidate: 43200 }, // Cache for 12 hours
    });

    if (!response.ok) {
      throw new Error(`Google Places API returned status ${response.status}`);
    }

    const data = await response.json();

    // Check if error is returned in response body (though HTTP status might be 200)
    if (data.error) {
      throw new Error(`Google Places API error: ${data.error.message || data.error.status}`);
    }

    const rating = data.rating || 5.0;
    const totalReviews = data.userRatingCount || 124;
    const rawReviews = data.reviews || [];

    // Sort Google reviews by publishTime descending (latest review first)
    rawReviews.sort((a: GoogleReviewItem, b: GoogleReviewItem) => {
      const timeA = a.publishTime ? new Date(a.publishTime).getTime() : 0;
      const timeB = b.publishTime ? new Date(b.publishTime).getTime() : 0;
      return timeB - timeA;
    });

    // Map Google reviews to our unified format
    const reviews = rawReviews.map((r: GoogleReviewItem) => {
      const authorName = r.authorAttribution?.displayName || "Google Reviewer";
      const nameParts = authorName.split(" ");
      const initials = nameParts.map((part) => part[0] || "").slice(0, 2).join("").toUpperCase() || "C";

      // Select a deterministic gradient class based on name length
      const gradients = [
        "from-[#e0cfab] to-[#c5a059]",
        "from-[#1b3225]/20 to-[#1b3225]/40",
        "from-[#caa15c]/20 to-[#caa15c]/45",
        "from-[#f1d6a0] to-[#c5a059]",
      ];
      const gradient = gradients[authorName.length % gradients.length];

      return {
        quote: r.text?.text || "Loved the experience and decor!",
        name: authorName,
        location: "Google Reviewer",
        date: r.relativePublishTimeDescription,
        publishTime: r.publishTime,
        rating: r.rating,
        initials,
        gradient,
        avatarUrl: r.authorAttribution?.photoUri || null,
      };
    });

    return NextResponse.json({
      reviews: reviews.length > 0 ? reviews : fallbackReviews.sort((a, b) => new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime()),
      rating,
      totalReviews,
      source: "google_api",
    });
  } catch (error) {
    const err = error as Error;
    console.error("Error fetching reviews from Google:", err);

    // Sort fallbacks latest first on error recovery too
    const sortedFallback = [...fallbackReviews].sort((a, b) => {
      return new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime();
    });

    return NextResponse.json({
      reviews: sortedFallback,
      rating: 5.0,
      totalReviews: 124,
      source: "local_mock_fallback",
      error: err.message || "Unknown error",
    });
  }
}
