// src/pages/Home.jsx
import React from 'react';
import BannerComponent from '../components/BannerComponent'; // Import the banner component
import Category from '../components/Category'; // Import the Category component

const Home = () => {
  return (
    <div className="home-page">
      <BannerComponent /> {/* Add the banner component here */}
      <Category /> {/* Add the category component here */}
      {/* You can add more sections if needed */}
    </div>
  );
};

export default Home;
