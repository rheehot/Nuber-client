import React from 'react';
import styled from 'styled-components';
import { FaBars as BarsIcon } from 'react-icons/fa';

const MenuButtonBlock = styled.button`
  appearance: none;
  padding: 10px;
  position: absolute;
  top: 10px;
  left: 10px;
  text-align: center;
  font-weight: 800;
  border: 0;
  cursor: pointer;
  font-size: 20px;
  transform: rotate(90deg);
  z-index: 2;
  background-color: transparent;
  & > svg {
    transform: rotate(90deg);
  }
`;

interface MenuButtonProps {
  onToggle: () => void;
}
const MenuButton: React.FC<MenuButtonProps> = ({ onToggle }) => {
  return (
    <MenuButtonBlock onClick={onToggle}>
      <BarsIcon />
    </MenuButtonBlock>
  );
};

export default MenuButton;
