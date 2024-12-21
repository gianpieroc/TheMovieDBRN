import React, {useCallback} from 'react';
import {
  Text,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import styled from 'styled-components/native';
import {Movie, MovieData} from '../../types';
import {Card} from '../Card';

const {width: screenWidth} = Dimensions.get('window');

const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding-vertical: 16px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: white;
  margin-left: 8px;
`;

const ITEM_WIDTH = 0.7;
const SPACING_WIDTH = 20;

type CarouselType = {
  title: string;
  items: MovieData;
  onPressItem: (item: Movie) => void;
};

export const Carousel = ({title, items, onPressItem}: CarouselType) => {
  const renderItem = useCallback(
    ({item}: {item: Movie}) => <Card item={item} onPressItem={onPressItem} />,
    [onPressItem],
  );

  const keyExtractor = useCallback((item: Movie) => `${item.id}`, []);

  if (items.loading) {
    return <ActivityIndicator testID="activity-indicator" />;
  }

  if (!items.data.results) {
    return <Text>No data available</Text>;
  }
  return (
    <Container>
      <Title>{title}</Title>
      <FlatList
        data={items.data.results}
        keyExtractor={keyExtractor}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        decelerationRate="fast"
        snapToAlignment="center"
        snapToInterval={screenWidth * ITEM_WIDTH + SPACING_WIDTH}
      />
    </Container>
  );
};
