import styled from 'styled-components/native';

export const Button = ({...props}) => {
  return (
    <StyledButton {...props}>
      <ButtonText>{props.children}</ButtonText>
    </StyledButton>
  );
};

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Column = styled.View`
  flex-direction: column;
  align-items: center;
`;

export const StyledButton = styled.TouchableOpacity`
  background-color: #FF6600;
  padding: 10px 20px;
  border-radius: 5px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 14px;
  font-weight: bold;
`;
