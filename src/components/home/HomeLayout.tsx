import React from 'react';
import styled from 'styled-components';

const HomeLayoutBlock = styled.div`
  display: flex;
  margin-top: 5rem;
  main {
    flex: 1;
  }
`;

interface HomeLayoutProps {}
const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  return (
    <HomeLayoutBlock>
      <main>{children}</main>
    </HomeLayoutBlock>
  );
};

export default HomeLayout;
