import React from 'react';
import styled from 'styled-components';

const MapBlock = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
`;

interface MapProps {
  targetLoad: (element: HTMLDivElement | null) => void;
}
const Map: React.FC<MapProps> = ({ targetLoad, children }) => {
  return (
    <MapBlock className="Map" ref={targetLoad}>
      {children}
    </MapBlock>
  );
};

export default Map;
