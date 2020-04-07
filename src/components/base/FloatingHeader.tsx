import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import { toFit } from '../../libs/event-manager';
import { getScrollTop } from '../../libs/utils';

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
  const [height, setHeight] = React.useState(0);
  const [marginTop, setMarginTop] = React.useState(0);

  const prevScrollTop = React.useRef(0);
  const direction = React.useRef<'UP' | 'DOWN'>('DOWN');
  const transitionPoint = React.useRef(0);

  React.useEffect(() => {
    if (!blockRef.current) return;
    setHeight(blockRef.current.clientHeight);
    setMarginTop(-1 * blockRef.current.clientHeight);
  }, []);

  const onScroll = React.useCallback(() => {
    const scrollTop = getScrollTop();
    const nextDirection = prevScrollTop.current > scrollTop ? 'UP' : 'DOWN';

    if (
      direction.current === 'DOWN' &&
      nextDirection === 'UP' &&
      transitionPoint.current - scrollTop < 0
    ) {
      setVisible(true);
      transitionPoint.current = scrollTop;
    }

    if (
      direction.current === 'UP' &&
      nextDirection === 'DOWN' &&
      scrollTop - transitionPoint.current < -1 * height
    ) {
      setVisible(true);
      transitionPoint.current = scrollTop + height;
    }

    if (scrollTop < 64) {
      setVisible(true);
    }

    direction.current = nextDirection;
    prevScrollTop.current = scrollTop;

    return toFit(
      () => setMarginTop(Math.min(0, scrollTop - transitionPoint.current)),
      {},
    )();
  }, []);

  React.useEffect(() => {
    document.addEventListener('scroll', onScroll);
    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  if (!visible) return null;

  return (
    <FloatingHeaderBlock
      ref={blockRef}
      style={
        visible
          ? {
              marginTop: marginTop,
              display: 'block',
            }
          : {
              marginTop: -1 * height,
              opacity: 0,
            }
      }
    >
      <Header />
    </FloatingHeaderBlock>
  );
};

export default FloatingHeader;
