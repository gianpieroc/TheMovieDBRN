export const API_IMAGE_URL = 'https://image.tmdb.org/t/p/w500/';

export const buildImageUrl = (path: string) => {
  return API_IMAGE_URL + path;
};
