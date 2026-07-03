import { UNSPLASH_ACCESS_KEY } from "@env";

interface UnsplashResult {
  imageUrl: string;
  photographerName: string;
  photographerUrl: string;
}

export async function searchHerbImage(
  query: string,
): Promise<UnsplashResult | null> {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
    query,
  )}&per_page=1&client_id=${UNSPLASH_ACCESS_KEY}`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.results && data.results.length > 0) {
    const photo = data.results[0];
    return {
      imageUrl: photo.urls.regular,
      photographerName: photo.user.name,
      photographerUrl: photo.user.links.html,
    };
  }
  return null; // no image found
}
