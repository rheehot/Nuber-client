import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { IoIosPaper, IoMdHome } from 'react-icons/io';
import media from '../../libs/styles/media';
import palette from '../../libs/styles/palette';

const BottomNavigationBlock = styled.div`
  display: none;
  ${media.small} {
    display: flex;
    position: fixed;
    height: 3.5rem;
    z-index: 999;
    bottom: 0;
    right: 0;
    left: 0;
    text-decoration: none;
    background-color: rgba(255, 255, 255, 255);
    transition: bottom 0.2s linear 0s;
    .wrapper {
      display: flex;
      flex-direction: row;
      max-width: 500px;
      justify-content: space-around;
      align-items: center;
      margin-left: auto;
      margin-right: auto;
      padding-left: 8px;
      padding-right: 8px;
      a {
        display: inline-block;
        padding: 0;
        margin: 0;
        flex-grow: 1;
        color: ${palette.gray8};
        text-decoration: none;
        .wrapper {
          max-width: 100%;
          padding: 8px;
          transition: all 200ms ease;
          ${media.small} {
            width: 105px;
          }

          svg {
            ${media.small} {
              max-width: 100%;
              width: 28px;
              height: 28px;
            }
          }
        }
      }
    }
  }
`;

interface BottomNavigationProps {}
const BottomNavigation: React.FC<BottomNavigationProps> = () => {
  return (
    <BottomNavigationBlock>
      <div className="wrapper">
        <NavLink
          to="/"
          activeClassName="active"
          isActive={(match, location) => {
            return ['/'].indexOf(location.pathname) !== -1;
          }}
        >
          <div className="wrapper">
            <IoMdHome />
          </div>
        </NavLink>
        <NavLink to="/terms" activeClassName="active">
          <div className="wrapper">
            <IoIosPaper />
          </div>
        </NavLink>
        <NavLink to="/@veloss" activeClassName="active">
          <div className="wrapper">
            <FaUser />
          </div>
        </NavLink>
      </div>
    </BottomNavigationBlock>
  );
};

export default BottomNavigation;
