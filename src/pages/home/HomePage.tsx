import React from 'react';
import HomeTemplate from '../../components/home/HomeTemplate';
import MapContainer from '../../containers/home/MapContainer';

interface HomePageProps {}
const HomePage: React.FC<HomePageProps> = () => {
  return (
    <HomeTemplate>
      Home
      <MapContainer />
    </HomeTemplate>
  );
};

export default HomePage;
