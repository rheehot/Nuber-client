import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import { getScrollTop, getScrollBottom } from '../../libs/utils';

const FloatingHeaderBlock = styled.div`
  position: fixed;
  top: 0;
  background: white;
  width: 100%;
  z-index: 10;
  box-shadow: 0px 0 8px rgba(0, 0, 0, 0.08);
  .tab-wrapper {
    margin-top: -2rem;
  }
`;

interface FloatingHeaderProps {}
const FloatingHeader: React.FC<FloatingHeaderProps> = () => {
  const [visible, setVisible] = React.useState(false);
  const blockRef = React.useRef<HTMLDivElement>(null);
  const [] = React.useState();

  React.useEffect(() => {
    if (!blockRef.current) return;
  }, []);

  const onScroll = React.useCallback(() => {
    console.log(document.documentElement.offsetHeight);
    const currentPos = getScrollTop() + window.innerHeight;
    const isTriggerPos = () =>
      document.documentElement.offsetHeight - currentPos;

    console.log(isTriggerPos());
  }, []);

  React.useEffect(() => {
    document.addEventListener('scroll', onScroll);
    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  if (!visible) return null;

  return (
    <FloatingHeaderBlock ref={blockRef}>
      <Header />
    </FloatingHeaderBlock>
  );
};

export default FloatingHeader;
