import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Category.css'; 

const categories = [
  { name: 'Mouse', image: '/assets/images/gamingmouse.jpg', path: '/products/mouse' },
  { name: 'Keyboard', image: '/assets/images/gamingkeyboard.jpg', path: '/products/keyboard' },
  { name: 'Monitor', image: '/assets/images/gamingMonitor.jpg', path: '/products/monitor' },
  // Add more categories as needed
];

const Category = () => {
  return (
    <div className="category-section container mt-4">
      <h2 className="text-center">Browse by Category</h2>
      <div className="row">
        {categories.map((category, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="category-box">
              <Link to={category.path}>
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="img-fluid"
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
                <h4 className="text-center mt-2">{category.name}</h4>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
