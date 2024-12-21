import React, {useEffect} from 'react';
import {useMovies} from '../../hooks/useMovies';
import {Carousel} from '../../components/Carousel/Carousel';
import {ScrollView} from 'react-native';

export const Home = () => {
  const {upcomingMovies, topRatedMovies, trendingMovies, selectMovie} =
    useMovies();

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <Carousel
        title="Top rated"
        items={topRatedMovies}
        onPressItem={movie => selectMovie(movie, 'topRated')}
      />
      <Carousel
        title="Upcoming"
        items={upcomingMovies}
        onPressItem={movie => selectMovie(movie, 'upcoming')}
      />
      <Carousel
        title="Trending"
        items={trendingMovies}
        onPressItem={movie => selectMovie(movie, 'trending')}
      />
    </ScrollView>
  );
};
