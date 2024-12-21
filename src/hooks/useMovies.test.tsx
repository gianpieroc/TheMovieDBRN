import React from 'react';
import {renderHook, act, waitFor} from '@testing-library/react-native';
import {MoviesProvider, useMovies} from './useMovies';
import {fetchUpcomingMovies, fetchTrendingMovies} from '../utils/api';
import {Movie} from '../types';

jest.mock('../utils/api');

const mockFetchUpcomingMovies = fetchUpcomingMovies as jest.MockedFunction<
  typeof fetchUpcomingMovies
>;
const mockFetchTrendingMovies = fetchTrendingMovies as jest.MockedFunction<
  typeof fetchTrendingMovies
>;

describe('useMovies', () => {
  beforeEach(() => {
    mockFetchUpcomingMovies.mockResolvedValue({
      results: [{id: 1, title: 'upcoming'}],
    });
    mockFetchTrendingMovies.mockResolvedValue({
      results: [{id: 2, title: 'trending'}],
    });
  });

  it('fetches and set movies data on mount', async () => {
    const wrapper = ({children}: {children: React.ReactNode}) => (
      <MoviesProvider>{children}</MoviesProvider>
    );
    const {result} = renderHook(() => useMovies(), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.upcomingMovies.loading).toBe(false);
      expect(result.current.upcomingMovies.data).toMatchObject({
        results: [{id: 1, title: 'upcoming'}],
      });
      expect(result.current.trendingMovies.loading).toBe(false);
      expect(result.current.trendingMovies.data).toMatchObject({
        results: [{id: 2, title: 'trending'}],
      });
    });
  });

  it('selects a movie', () => {
    const wrapper = ({children}: {children: React.ReactNode}) => (
      <MoviesProvider>{children}</MoviesProvider>
    );
    const {result} = renderHook(() => useMovies(), {wrapper});

    const movie = {id: 3, title: 'Selected Movie', poster_path: ''};

    act(() => {
      result.current.selectMovie(movie as Movie, 'trending');
    });

    expect(result.current.selectedMovie).toEqual({
      ...movie,
      category: 'trending',
    });
  });

  it('selects and unselects a movie', () => {
    const wrapper = ({children}: {children: React.ReactNode}) => (
      <MoviesProvider>{children}</MoviesProvider>
    );
    const {result} = renderHook(() => useMovies(), {wrapper});

    const movie = {id: 3, title: 'Selected Movie', poster_path: ''};

    act(() => {
      result.current.selectMovie(movie as Movie, 'trending');
    });

    expect(result.current.selectedMovie).toEqual({
      ...movie,
      category: 'trending',
    });

    act(() => {
      result.current.clearMovieSelected();
    });

    expect(result.current.selectedMovie).toBeNull();
  });
});
