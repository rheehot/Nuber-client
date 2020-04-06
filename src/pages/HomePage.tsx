import React from 'react';
import HomeTemplate from '../components/home/HomeTemplate';
import Header from '../components/base/Header';
import FloatingHeader from '../components/base/FloatingHeader';
import MainResponsive from '../components/common/MainResponsive';

interface HomePageProps {}
const HomePage: React.FC<HomePageProps> = () => {
  return (
    <HomeTemplate>
      <Header />
      <FloatingHeader />
      <MainResponsive>
        <div style={{ height: 1500 }}>???</div>
      </MainResponsive>
    </HomeTemplate>
  );
};

export default HomePage;
