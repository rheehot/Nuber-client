import React from 'react';
import SideBar from 'react-sidebar';
import Map from '../../components/home/Map';
import useLoadMap from '../../containers/home/hooks/useLoadMap';
import SidebarContainer from './SidebarContainer';
import MenuButton from '../base/MenuButton';

const SidebarStyled = {
  sidebar: {
    backgroundColor: 'white',
    width: '280px',
    zIndex: '10',
  },
};

interface MapContainerProps {}
const MapContainer: React.FC<MapContainerProps> = () => {
  const [open, setToggle] = React.useState(false);
  const targetRef = React.useRef(null);
  const [kakaoMap, _, loading] = useLoadMap(targetRef);
  // console.log(kakaoMap, loading);

  const onToggle = React.useCallback(() => {
    setToggle(!open);
  }, [setToggle, open]);

  return (
    <React.Fragment>
      <SideBar
        sidebar={<SidebarContainer />}
        open={open}
        onSetOpen={onToggle}
        styles={SidebarStyled}
      >
        <MenuButton onToggle={onToggle} />
        <Map targetRef={targetRef} />
      </SideBar>
    </React.Fragment>
  );
};

export default MapContainer;
