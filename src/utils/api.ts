// TODO: These keys should live in environment variables
const API_URL = 'https://api.themoviedb.org';
const API_KEY =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZDZiNzU0YzQ4MGM2ZmRhNjRlZGViYThmMDQzZmE0NiIsIm5iZiI6MTU2OTY3NzM4NC4wOTQsInN1YiI6IjVkOGY2MDQ4MTA5Y2QwMDAxOTQyNTNiNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qLoe2f-B4jTXSfPw3yYmm1JlaZDogMPqvHac6b1jHZY';
const TRENDING_MOVIES_PATH = '/3/movie/popular?language=en-US';
const TOP_RATED_MOVIES_PATH = '/3/movie/top_rated?language=en-US';
const UPCOMING_MOVIES_PATH = '/3/movie/upcoming?language=en-US';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer ' + API_KEY,
  },
};

const fetchApi = async (route: string) => {
  try {
    const result = await fetch(API_URL + route, options);
    const jsonResult = await result.json();
    return jsonResult;
  } catch (error) {
    throw new Error("Couldn't fetch data from API");
  }
};

export const fetchTrendingMovies = async () => {
  const response = await fetchApi(TRENDING_MOVIES_PATH);
  return response;
};

export const fetchTopRatedMovies = async () => {
  const response = await fetchApi(TOP_RATED_MOVIES_PATH);
  return response;
};

export const fetchUpcomingMovies = async () => {
  const response = await fetchApi(UPCOMING_MOVIES_PATH);
  return response;
};
