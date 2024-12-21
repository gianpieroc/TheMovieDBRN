import React from 'react';
import {
  render,
  fireEvent,
  screen,
  waitFor,
} from '@testing-library/react-native';
import {Wishlist} from './Wishlist';
import {useWishlist} from '../../hooks/useWishlist';
import {Movie} from '../../types';

jest.mock('../../hooks/useWishlist');

const mockUseWishlist = useWishlist as jest.MockedFunction<typeof useWishlist>;

describe('Wishlist', () => {
  const removeFromWishlist = jest.fn(movie => movie);
  let wishlist = [
    {id: 1, title: 'movie title 1', backdrop_path: '/path1.jpg'} as Movie,
    {id: 2, title: 'movie title 2', backdrop_path: '/path2.jpg'} as Movie,
  ];
  beforeEach(() => {
    mockUseWishlist.mockReturnValue({
      wishlist,
      addToWishlist: jest.fn(),
      getIsMovieWishlisted: jest.fn(),
      removeFromWishlist,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders wishlist items', () => {
    render(<Wishlist />);

    expect(screen.getByText('movie title 1')).toBeTruthy();
    expect(screen.getByText('movie title 2')).toBeTruthy();
  });

  it('displays the correct number of wishlist items', () => {
    render(<Wishlist />);
    const removeFromWishlistButtons = screen.getAllByText(
      'Remove from wishlist',
    );

    expect(removeFromWishlistButtons.length).toBe(2);
  });
  it('removes item from the document when button is pressed', async () => {
    render(<Wishlist />);
    const removeFromWishlistButtons = screen.getAllByText(
      'Remove from wishlist',
    );

    fireEvent.press(removeFromWishlistButtons[0]);

    expect(removeFromWishlist).toHaveBeenCalledTimes(1);
    expect(removeFromWishlist).toHaveBeenCalledWith(wishlist[0]);
  });
});
