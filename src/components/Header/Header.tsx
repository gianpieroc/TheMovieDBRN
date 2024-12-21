import React from 'react';
import styled from 'styled-components/native';
import {Row} from '../Common';

type HeaderProps = {
  title: string;
  onLeftButtonPress?: (() => void) | null;
  onRightButtonPress?: (() => void) | null;
};

const HeaderContainer = styled(Row)`
  justify-content: flex-end;
  background-color: #1a1a1a;
  padding: 8px;
  height: 60px;
`;

const Title = styled.Text`
  flex: 1;
  color: #FFF;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;

const HeaderButtonContainer = styled.TouchableOpacity`
  background-color: transparent;
  padding: 0 8px;
`;

const ButtonText = styled.Text`
  color: #007AFF;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
`;

export const Header: React.FC<HeaderProps> = ({
  title,
  onLeftButtonPress,
  onRightButtonPress,
}) => {
  return (
    <HeaderContainer>
      {onLeftButtonPress && (
        <HeaderButtonContainer onPress={onLeftButtonPress}>
          <ButtonText>{'<'} Back</ButtonText>
        </HeaderButtonContainer>
      )}
      <Title>{title}</Title>
      {onRightButtonPress && (
        <HeaderButtonContainer onPress={onRightButtonPress}>
          <ButtonText>Wishlist</ButtonText>
        </HeaderButtonContainer>
      )}
    </HeaderContainer>
  );
};
