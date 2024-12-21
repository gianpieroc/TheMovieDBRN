import React, {useEffect} from 'react';
import {useMovies} from '../../hooks/useMovies';
import {buildImageUrl} from '../../utils/imageUrl';
import styled, {ThemeProvider} from 'styled-components/native';
import {useWishlist} from '../../hooks/useWishlist';
import {Column, Button} from '../../components/Common';
import {Platform, ScrollView} from 'react-native';

const androidFontFamilies = {
  topRated: 'Roboto',
  upcoming: 'monospace',
  trending: 'serif',
};

const iosFontFamilies = {
  topRated: 'Arial',
  upcoming: 'Verdana',
  trending: 'Times New Roman',
};

const fontFamilies = Platform.select({
  ios: iosFontFamilies,
  android: androidFontFamilies,
});

const StyledColumn = styled(Column)`
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  align-items: flex-end;
  flex: 1;
  justify-content: center;
`;

const MovieTitle = styled.Text`
  ${({theme}) => 'font-family:' + theme.fontFamily};
  color: white;
  font-size: 34px;
  margin-bottom: 20px;
`;

const MoviePoster = styled.ImageBackground`
  width: 100%;
  height: 350px;
  margin-bottom: 20px;
`;

const MovieContent = styled.View`
  padding: 16px 8px;
`;

const MovieDescription = styled.Text`
  ${({theme}) => 'font-family:' + theme.fontFamily};
  color: white;
  font-size: 18px;
  line-height: 24px;
  text-align: left;
  max-width: 600px;
`;

const MovieDescriptionTitle = styled(MovieDescription)`
  ${({theme}) => 'font-family:' + theme.fontFamily};
  align-self: flex-start;
  font-weight: bold;
  font-size: 20px;
  margin-top: 8px;
  margin-bottom: 4px;
`;

export const MovieDetails = () => {
  const {selectedMovie} = useMovies();
  const {addToWishlist, removeFromWishlist, getIsMovieWishlisted} =
    useWishlist();
  const isMovieWishlisted = getIsMovieWishlisted(selectedMovie);

  const onAddToWishlist = () => {
    if (selectedMovie) {
      addToWishlist(selectedMovie);
    }
  };

  useEffect(() => {
    return;
  }, []);

  if (!selectedMovie?.id) {
    return null;
  }

  const {
    title,
    backdrop_path,
    overview,
    release_date,
    vote_average,
    popularity,
    category,
  } = selectedMovie;
  const posterUrl = buildImageUrl(backdrop_path);
  const theme = {
    fontFamily:
      fontFamilies && category
        ? fontFamilies[category]
        : fontFamilies?.topRated,
  };
  return (
    <ThemeProvider theme={theme}>
      <ScrollView>
        <MoviePoster
          testID="movie-poster"
          resizeMode="cover"
          source={{uri: posterUrl}}
          alt={`${title} Poster`}>
          <StyledColumn>
            <MovieTitle>{title}</MovieTitle>
            {isMovieWishlisted ? (
              <Button onPress={() => removeFromWishlist(selectedMovie)}>
                Remove from wishlist
              </Button>
            ) : (
              <Button onPress={onAddToWishlist}>Add to wishlist</Button>
            )}
          </StyledColumn>
        </MoviePoster>
        <MovieContent>
          <MovieDescriptionTitle>Overview:</MovieDescriptionTitle>
          <MovieDescription>{overview}</MovieDescription>
          <MovieDescriptionTitle>Release date:</MovieDescriptionTitle>
          <MovieDescription>{release_date}</MovieDescription>
          <MovieDescriptionTitle>Rating</MovieDescriptionTitle>
          <MovieDescription>{vote_average} / 10</MovieDescription>
          <MovieDescriptionTitle>Popularity</MovieDescriptionTitle>
          <MovieDescription>{popularity}</MovieDescription>
        </MovieContent>
      </ScrollView>
    </ThemeProvider>
  );
};
