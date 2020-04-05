import React from 'react';
import DriveTemplate from '../components/drive/DriveTemplate';
import MapContainer from '../containers/drive/MapContainer';

interface HomePageProps {}
const HomePage: React.FC<HomePageProps> = () => {
  return (
    <DriveTemplate>
      <MapContainer />
    </DriveTemplate>
  );
};

export default HomePage;
