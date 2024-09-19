import React from 'react';
import BannerComponent from '../components/Home/BannerComponent';
import Category from '../components/Home/Category';
import products from '../data/Products';

const Home = ({ searchTerm }) => {
  // Filter products based on search term (assumes each product has a name property)
  const filteredProducts = products.filter(product => 
    product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-page">
      <BannerComponent /> {/* Add the banner component here */}
      <Category /> {/* Add the category component here */}

      {/* Display search results below the Category component */}
      <div className="container mt-4">
        <h2 className="mb-4">Search Results</h2>
        <div className="row">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <div key={product.id} className="col-md-4 mb-4">
                <div className="card">
                  <img 
                    src={`/assets/images/${product.image}`} 
                    alt={product.name} 
                    className="card-img-top" 
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">Price: ${product.price}</p>
                    <a href={`/product/${product.id}`} className="btn btn-primary">View Details</a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
