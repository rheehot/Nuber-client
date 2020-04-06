import React from 'react';
import styled from 'styled-components';
import { CurrentUser } from '../../libs/graphql/user';
import { userThumbnail } from '../../static/images';

const HeaderUserIconBlock = styled.div`
  cursor: pointer;
  img {
    display: block;
    height: 2.5rem;
    width: 2.5rem;
    box-shadow: 0px 0 8px rgba(0, 0, 0, 0.085);
    border-radius: 50%;
    object-fit: cover;
    transition: 0.125s all ease-in;
  }
  display: flex;
  align-items: center;
  &:hover {
    img {
      box-shadow: 0px 0 12px rgba(0, 0, 0, 0.1);
    }
  }
`;

interface HeaderUserIconProps {
  user: CurrentUser | null;
  onClick: (e: React.MouseEvent) => void;
}

const HeaderUserIcon: React.FC<HeaderUserIconProps> = ({ user, onClick }) => {
  return (
    <HeaderUserIconBlock onClick={onClick}>
      <img
        src={(user && user.profile.thumbnail) || userThumbnail}
        alt="thumbnail"
      />
    </HeaderUserIconBlock>
  );
};

export default HeaderUserIcon;
