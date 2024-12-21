import {useEffect, useState} from 'react';
import {useMovies} from './hooks/useMovies';
import {Layout} from './components/Layout';
import {Header} from './components/Header';
import {Home, MovieDetails, Wishlist} from './Pages';

const routes = {
  home: 'home',
  wishlist: 'wishlist',
  movieDetails: 'movieDetails',
};

export const Router = () => {
  const {selectedMovie} = useMovies();
  const [page, setPage] = useState('home');

  useEffect(() => {
    if (selectedMovie !== null && page !== routes.movieDetails) {
      return setPage('movieDetails');
    }
  }, [selectedMovie]);

  const goToWishlist = () => {
    setPage('wishlist');
  };

  const goHome = () => {
    setPage('home');
  };

  return (
    <Layout>
      <Header
        title="🎬 &nbsp; Movies"
        onLeftButtonPress={page !== routes.home ? goHome : null}
        onRightButtonPress={page !== routes.wishlist ? goToWishlist : null}
      />
      {page === routes.wishlist && <Wishlist />}
      {page === routes.home && <Home />}
      {page === routes.movieDetails && <MovieDetails />}
    </Layout>
  );
};
