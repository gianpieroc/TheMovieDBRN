import styled from 'styled-components/native';
import {Movie} from '../../types';
import {buildImageUrl} from '../../utils/imageUrl';
import {Dimensions} from 'react-native';

const {width: screenWidth} = Dimensions.get('window');

const ItemContainer = styled.TouchableHighlight`
  width: ${screenWidth * 0.7}px;
  margin-horizontal: 10px;
  align-items: center;
  justify-content: center;
`;

const PosterImage = styled.Image`
  width: 100%;
  height: ${screenWidth * 0.8}px;
  border-radius: 8px;
`;

const ItemTitle = styled.Text`
  margin-top: 16px;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  color: white;
`;

type CarouselItemType = {
  item: Movie;
  onPressItem: (item: Movie) => void;
};

export const Card = ({item, onPressItem}: CarouselItemType) => (
  <ItemContainer onPress={() => onPressItem(item)}>
    <>
      <PosterImage
        resizeMode="cover"
        testID="poster-image"
        alt={'poster image ' + item.title}
        source={{uri: buildImageUrl(item.poster_path)}}
      />
      <ItemTitle>{item.title}</ItemTitle>
    </>
  </ItemContainer>
);
