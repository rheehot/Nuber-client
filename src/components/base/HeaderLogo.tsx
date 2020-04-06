import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { UberLogo } from '../../static/svg';
import media from '../../libs/styles/media';
import palette from '../../libs/styles/palette';

const HeaderLogoBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: ${palette.gray8};
  font-size: 1.3125rem;
  text-decoration: none;
  font-family: Fira Mono, monospace;
  ${media.medium} {
    font-size: 1.125rem;
    .uber-logo {
      height: 1.25rem;
    }
  }
  a {
    display: flex;
    align-items: center;
    color: inherit;
    text-decoration: none;
  }
`;

interface HeaderLogoProps {}
const HeaderLogo: React.FC<HeaderLogoProps> = () => {
  return (
    <HeaderLogoBlock>
      <Link to="/">
        <UberLogo className="uber-logo" />
      </Link>
    </HeaderLogoBlock>
  );
};

export default HeaderLogo;
