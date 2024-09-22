import React from 'react';
import BannerComponent from '../components/Home/BannerComponent';
import Category from '../components/Home/Category';

const Home = () => {
  return (
    <div className="home-page">
      <BannerComponent />
      <Category />
    </div>
  );
};

export default Home;
