import React, { useState } from 'react';

const AddProduct = ({ onAddProduct }) => {
  const [formData, setFormData] = useState({
    productName: '',
    title: '',
    color: '',
    description: '',
    brand: '',
    price: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(''); // For previewing the selected image
  const [errorMessage, setErrorMessage] = useState(''); // For error handling

  // Function to handle input change for all fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type and size (max 5MB)
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        setErrorMessage('Only JPG, PNG, or GIF images are allowed.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage('Image size should be less than 5MB.');
        return;
      }
      setFormData((prevData) => ({
        ...prevData,
        image: file,
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setErrorMessage('');
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const { productName, title, color, description, brand, price, image } = formData;
    if (!productName || !title || !description || !brand || !price) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    const newProduct = {
      name: productName,
      title,
      color,
      description,
      brand,
      price,
      image, // Send image file along with other data
    };

    // Handle product addition
    onAddProduct(newProduct);

    // Clear form fields after submission
    setFormData({
      productName: '',
      title: '',
      color: '',
      description: '',
      brand: '',
      price: '',
      image: null,
    });
    setImagePreview('');
  };

  return (
    <div className="container mt-4">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
        
        <div className="mb-3">
          <label htmlFor="productName" className="form-label">Product Name</label>
          <input
            type="text"
            className="form-control"
            id="productName"
            name="productName"
            value={formData.productName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="color" className="form-label">Color</label>
          <input
            type="text"
            className="form-control"
            id="color"
            name="color"
            value={formData.color}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="brand" className="form-label">Brand</label>
          <input
            type="text"
            className="form-control"
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Product Image</label>
          <input
            type="file"
            className="form-control"
            id="image"
            onChange={handleImageChange}
            accept="image/*"
          />
        </div>
        {imagePreview && (
          <div className="mb-3">
            <img
              src={imagePreview}
              alt="Product Preview"
              style={{ width: '200px', height: 'auto', objectFit: 'cover' }}
            />
          </div>
        )}
        <button type="submit" className="btn btn-primary">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
