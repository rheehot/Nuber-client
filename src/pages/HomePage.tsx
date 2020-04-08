import React from 'react';
import HomeTemplate from '../components/home/HomeTemplate';
import Header from '../components/base/Header';
import HomeLayout from '../components/home/HomeLayout';
import HomeTab from '../components/home/HomeTab';

interface HomePageProps {}
const HomePage: React.FC<HomePageProps> = () => {
  return (
    <HomeTemplate>
      <Header />
      <HomeLayout>
        <HomeTab />
        <div style={{ height: '1000px', backgroundColor: 'black' }}></div>
      </HomeLayout>
    </HomeTemplate>
  );
};

export default HomePage;
