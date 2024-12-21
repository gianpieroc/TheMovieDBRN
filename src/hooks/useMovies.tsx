import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {fetchUpcomingMovies, fetchTrendingMovies} from '../utils/api';
import {Movie, MovieData} from '../types';

const initialState = {
  upcomingMovies: {loading: true, data: {}},
  topRatedMovies: {loading: true, data: {}},
  trendingMovies: {loading: true, data: {}},
  selectedMovie: null as Movie | null,
  selectMovie: (_: Movie, __: string) => {},
  clearMovieSelected: () => {},
};

const MoviesContext = createContext(initialState);

export const MoviesProvider = ({children}: {children: React.ReactNode}) => {
  const [upcomingMovies, setUpcomingMovies] = useState<MovieData>({
    loading: true,
    data: {},
  });
  const [trendingMovies, setTrendingMovies] = useState<MovieData>({
    loading: true,
    data: {},
  });
  const [topRatedMovies, setTopRatedMovies] = useState<MovieData>({
    loading: true,
    data: {},
  });
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const getUpcomingMovies = async () => {
    const upcomingMoviesApi = await fetchUpcomingMovies();
    setUpcomingMovies({loading: false, data: upcomingMoviesApi});
  };

  const getTrendingMovies = async () => {
    const trendingMoviesApi = await fetchTrendingMovies();
    setTrendingMovies({loading: false, data: trendingMoviesApi});
  };

  const getTopRatedMovies = async () => {
    const topRatedMoviesApi = await fetchTrendingMovies();
    setTopRatedMovies({loading: false, data: topRatedMoviesApi});
  };

  const selectMovie = useCallback(
    (movie: Movie, category: string) => {
      setSelectedMovie({...movie, category: category.toLowerCase()});
    },
    [setSelectedMovie, selectedMovie],
  );

  const clearMovieSelected = useCallback(() => {
    setSelectedMovie(null);
  }, [setSelectedMovie]);

  useEffect(() => {
    clearMovieSelected();
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  }, []);

  const contextValues = {
    upcomingMovies,
    topRatedMovies,
    trendingMovies,
    selectedMovie,
    selectMovie,
    clearMovieSelected,
  };

  return (
    <MoviesContext.Provider value={contextValues}>
      {children}
    </MoviesContext.Provider>
  );
};

export const useMovies = () => {
  const context = useContext(MoviesContext);

  return context;
};
