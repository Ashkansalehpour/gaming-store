import React from 'react';
import '../styles/Banner.css'; 

const BannerComponent = () => {
  return (
    <div className="banner-component d-flex align-items-center justify-content-between">
      <div className="slogan-section">
        <h1>Ashi store</h1>
        <p>Discover the best products with great deals.</p>
      </div>
      <div className="image-section">
        <img 
          src="/assets/images/banner-image.jpg"
          alt="Banner"
          className="banner-image"
        />
      </div>
    </div>
  );
};

export default BannerComponent;
