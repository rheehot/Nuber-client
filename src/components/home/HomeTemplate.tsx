import React from 'react';
import styled from 'styled-components';

const HomeTemplateBlock = styled.div`
  .HomeTemplate {
  }
`;

interface HomeTemplateProps {}
const HomeTemplate: React.FC<HomeTemplateProps> = ({ children }) => {
  return (
    <HomeTemplateBlock className="HomeTemplate">{children}</HomeTemplateBlock>
  );
};

export default HomeTemplate;
