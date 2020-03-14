import React from 'react';
import styled from 'styled-components';

const HomeTemplateBlock = styled.div`
  .HomeTemplate {
  }

  .Sidebar_Overlay {
    z-index: 2 !important;
  }
`;

interface HomeTemplateProps {}
const HomeTemplate: React.FC<HomeTemplateProps> = ({ children }) => {
  return (
    <HomeTemplateBlock className="HomeTemplate">{children}</HomeTemplateBlock>
  );
};

export default HomeTemplate;
