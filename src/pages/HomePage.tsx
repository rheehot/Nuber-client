import React from 'react';
import HomeTemplate from '../components/home/HomeTemplate';
import Header from '../components/base/Header';

interface HomePageProps {}
const HomePage: React.FC<HomePageProps> = () => {
  return (
    <HomeTemplate>
      <Header />
    </HomeTemplate>
  );
};

export default HomePage;
