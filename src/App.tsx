import React from 'react';
import {MoviesProvider} from './hooks/useMovies';
import {WishlistProvider} from './hooks/useWishlist';
import {Router} from './Router';

const App = () => {
  return (
    <MoviesProvider>
      <WishlistProvider>
        <Router />
      </WishlistProvider>
    </MoviesProvider>
  );
};

export default App;
