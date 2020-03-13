import React from 'react';
import styled from 'styled-components';

const MapBlock = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
`;

interface MapProps {
  targetRef: React.MutableRefObject<any>;
}
const Map: React.FC<MapProps> = ({ targetRef, children }) => {
  return (
    <MapBlock className="Map" ref={ref => (targetRef.current = ref)}>
      {children}
    </MapBlock>
  );
};

export default Map;
