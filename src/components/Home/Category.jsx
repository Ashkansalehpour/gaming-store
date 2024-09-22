import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Home/Category.css'; 

const categories = [
  { name: 'Mouse', image: '/assets/images/gamingmouse.jpg' },
  { name: 'Keyboard', image: '/assets/images/gamingkeyboard.jpg' },
  { name: 'Monitor', image: '/assets/images/gamingMonitor.jpg' },

];

const Category = () => {
  return (
    <div className="category-section container mt-4">
      <h2 className="text-center mb-4">Browse by Category</h2>
      <div className="row">
        {categories.map((category, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="category-box card h-100">
              <Link to={`/category/${category.name.toLowerCase()}`} className="text-decoration-none">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="img-fluid card-img-top"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h4 className="text-center text-dark">{category.name}</h4>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
