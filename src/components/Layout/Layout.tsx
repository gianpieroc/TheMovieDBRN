import React from 'react';
import {StatusBar} from 'react-native';
import styled from 'styled-components/native';

const BACKGROUND_COLOR = '#222';

const StyledSafeAreaView = styled.SafeAreaView`
  background-color: ${BACKGROUND_COLOR};
  flex: 1;
`;

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({children}) => {
  return (
    <StyledSafeAreaView>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={BACKGROUND_COLOR}
      />
      {children}
    </StyledSafeAreaView>
  );
};
