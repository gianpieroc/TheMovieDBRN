import React from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';
import {useWishlist} from '../../hooks/useWishlist';
import {buildImageUrl} from '../../utils/imageUrl';
import {Movie} from '../../types';
import {Button, Column, Row} from '../../components/Common';

const StyledRow = styled(Row)`
  margin-top: 8px;
  margin-bottom: 8px;
`;

const StyledColumn = styled(Column)`
  justify-content: center;
  align-items: flex-start;
  flex: 1;
  padding-right: 8px;
`;

const MovieTitle = styled.Text`
  color: white;
  font-size: 20px;
  margin-bottom: 16px;
`;

const MoviePoster = styled.Image`
  flex: 1;
  width: 130px;
  height: 200px;
  margin-bottom: 8px;
  border-radius: 8px;
`;

export const Wishlist = () => {
  const {wishlist, removeFromWishlist} = useWishlist();

  const renderItem = ({item}: {item: Movie}) => {
    const {title, poster_path} = item;
    const posterUrl = buildImageUrl(poster_path);

    return (
      <StyledRow>
        <MoviePoster
          resizeMode="contain"
          src={posterUrl}
          alt={`${title} Poster`}
        />
        <StyledColumn>
          <MovieTitle lineBreakMode="tail" numberOfLines={2}>
            {title}
          </MovieTitle>
          <Button onPress={() => removeFromWishlist(item)}>
            Remove from wishlist
          </Button>
        </StyledColumn>
      </StyledRow>
    );
  };

  return (
    <FlatList
      data={wishlist}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
    />
  );
};
