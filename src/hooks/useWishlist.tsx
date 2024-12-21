import {createContext, useCallback, useContext, useState} from 'react';
import {Movie} from '../types';

const initialState = {
  wishlist: [] as Movie[],
  addToWishlist: (_: Movie) => {},
  removeFromWishlist: (_: Movie) => {},
  getIsMovieWishlisted: (_: Movie | null) => false,
};

const WishlistContext = createContext(initialState);

export const WishlistProvider = ({children}: {children: React.ReactNode}) => {
  const [wishlist, setWishlist] = useState<Movie[]>([]);

  const addToWishlist = useCallback(
    (movie: Movie) => {
      setWishlist(prevWishlist => [...prevWishlist, movie]);
    },
    [setWishlist],
  );

  const removeFromWishlist = useCallback(
    (movie: Movie) => {
      setWishlist(prevWishlist =>
        prevWishlist.filter(prevMovie => prevMovie.id !== movie.id),
      );
    },
    [setWishlist],
  );

  const getIsMovieWishlisted = useCallback(
    (movie: Movie | null) => {
      return wishlist.some(wishlistMovie => wishlistMovie.id === movie?.id);
    },
    [wishlist],
  );

  const contextValues = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    getIsMovieWishlisted,
  };

  return (
    <WishlistContext.Provider value={contextValues}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  return context;
};
