import React from 'react';
import styled from 'styled-components';
import MainResponsive from '../common/MainResponsive';

const HeaderBlock = styled.div`
  height: 3rem;
`;

const Inner = styled(MainResponsive)`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

interface HeaderProps {}
const Header: React.FC<HeaderProps> = () => {
  return (
    <HeaderBlock className="HeaderBlock">
      <Inner>header</Inner>
    </HeaderBlock>
  );
};

export default Header;
