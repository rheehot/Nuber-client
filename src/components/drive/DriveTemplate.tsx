import React from 'react';
import styled from 'styled-components';

const DriveTemplateBlock = styled.div`
  .DriveTemplate {
  }

  .Sidebar_Overlay {
    z-index: 2 !important;
  }
`;

interface DriveTemplateProps {}
const DriveTemplate: React.FC<DriveTemplateProps> = ({ children }) => {
  return (
    <DriveTemplateBlock className="DriveTemplate">
      {children}
    </DriveTemplateBlock>
  );
};

export default DriveTemplate;
