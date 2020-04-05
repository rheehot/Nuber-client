import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import palette from '../../libs/styles/palette';

const BackgroundStyle = createGlobalStyle`
  body {
    background: ${palette.gray0};
  }
`;

export type HomeTemplateProps = {
  children: React.ReactNode;
};

const HomeTemplate: React.FC<HomeTemplateProps> = ({ children }) => {
  return (
    <>
      <BackgroundStyle />
      <Block>{children}</Block>
    </>
  );
};

const Block = styled.div``;

export default HomeTemplate;
