import { GiphyResponse } from "../models/Giphy";

const GIPHY_API_KEY = "xWAxW6YXuFtxzrRNlbalM0nQK6WhxYSb";
const BASE_URL = "https://api.giphy.com/v1/gifs";
const limit = 15;

const fetchGifs = async <T>(endpoint: string, pageNo: number): Promise<T> => {
  try {
    const url = `${BASE_URL}/${endpoint}&api_key=${GIPHY_API_KEY}&limit=${limit}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    // better error handling could be done
    console.error("API Error:", error);
    throw error;
  }
};

export const fetchTrendingGifs = async (pageNo: number) => {
  const offset = pageNo * limit;
  return fetchGifs<GiphyResponse>(`trending?offset=${offset}`, pageNo);
};

export const searchGifs = async (pageNo: number, q: string) => {
  const offset = pageNo * limit;
  return fetchGifs<GiphyResponse>(`search?offset=${offset}&q=${q}`, pageNo);
};
