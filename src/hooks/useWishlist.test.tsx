import React from 'react';
import {renderHook, act} from '@testing-library/react-native';
import {WishlistProvider, useWishlist} from './useWishlist';
import {Movie} from '../types';

describe('useWishlist', () => {
  const wrapper = ({children}: {children: React.ReactNode}) => (
    <WishlistProvider>{children}</WishlistProvider>
  );

  it('adds a movie to the wishlist', () => {
    const {result} = renderHook(() => useWishlist(), {wrapper});

    const movie = {id: 1, title: 'movie title', poster_path: ''} as Movie;

    act(() => {
      result.current.addToWishlist(movie);
    });

    expect(result.current.wishlist).toContain(movie);
  });

  it('removes a movie from the wishlist', () => {
    const {result} = renderHook(() => useWishlist(), {wrapper});

    const movie = {id: 1, title: 'movie title'} as Movie;

    act(() => {
      result.current.addToWishlist(movie);
    });

    act(() => {
      result.current.removeFromWishlist(movie);
    });

    expect(result.current.wishlist).not.toContain(movie);
  });

  it('checks if a movie is wishlisted', () => {
    const {result} = renderHook(() => useWishlist(), {wrapper});

    const movie = {id: 1, title: 'movie title'} as Movie;

    act(() => {
      result.current.addToWishlist(movie);
    });

    expect(result.current.getIsMovieWishlisted(movie)).toBe(true);
    expect(
      result.current.getIsMovieWishlisted({
        id: 2,
        title: 'Interstellar',
      } as Movie),
    ).toBe(false);
  });
});
