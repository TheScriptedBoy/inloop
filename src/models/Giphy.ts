export interface GiphyResponse {
  data: GiphyData[];
  pagination: {
    total_count: number;
    count: number;
    offset: number;
  };
}

export interface GiphyImages {
  original: {
    url: string;
  };
  downsized: {
    url: string;
  };
}

export interface GiphyData {
  id: string;
  title: string;
  images: GiphyImages;
}
