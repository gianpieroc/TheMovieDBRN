import React from 'react';
import {render, screen} from '@testing-library/react-native';
import {MovieDetails} from './MovieDetails';
import {useMovies} from '../../hooks/useMovies';
import {useWishlist} from '../../hooks/useWishlist';

jest.mock('../../hooks/useMovies');
jest.mock('../../hooks/useWishlist');

describe('MovieDetails', () => {
  const mockSelectedMovie = {
    id: 1,
    title: 'movie',
    backdrop_path: '/movie.jpg',
    overview: 'movie overview',
  };

  beforeEach(() => {
    (useMovies as jest.Mock).mockReturnValue({
      selectedMovie: mockSelectedMovie,
    });

    (useWishlist as jest.Mock).mockReturnValue({
      addToWishlist: jest.fn(),
      removeFromWishlist: jest.fn(),
      getIsMovieWishlisted: jest.fn().mockReturnValue(false),
    });
  });

  it('renders movie details', () => {
    render(<MovieDetails />);

    expect(screen.getByText('movie')).toBeTruthy();
    expect(screen.getByTestId('movie-poster')).toBeTruthy();
    expect(screen.getByText('movie overview')).toBeTruthy();
  });

  it('adds movie to wishlist when button is pressed', () => {
    render(<MovieDetails />);

    const addButton = screen.getByText('Add to wishlist');
    const removeButton = screen.queryAllByText('Remove from wishlist');
    expect(addButton).toBeTruthy();
    expect(removeButton).toHaveLength(0);
  });

  it('shows Remove from wishlist button when the movie is wishlisted', () => {
    (useWishlist as jest.Mock).mockReturnValue({
      addToWishlist: jest.fn(),
      removeFromWishlist: jest.fn(),
      getIsMovieWishlisted: jest.fn().mockReturnValue(true),
    });

    render(<MovieDetails />);

    const addButton = screen.queryAllByText('Add to wishlist');
    const removeButton = screen.getByText('Remove from wishlist');
    expect(addButton).toHaveLength(0);
    expect(removeButton).toBeTruthy();
  });
});
