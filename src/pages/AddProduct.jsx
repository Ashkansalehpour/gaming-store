import React, { useState } from 'react';

const AddProduct = ({ onAddProduct }) => {
  const [productName, setProductName] = useState('');
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('');
  const [description, setDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null); // For handling the uploaded image
  const [imagePreview, setImagePreview] = useState(''); // For previewing the selected image

  // Function to handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file); // Set the selected file to state
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result); // Preview the image
    };
    reader.readAsDataURL(file);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Assuming you'd handle the backend submission here. On the frontend, you can just send the data
    const newProduct = {
      name: productName,
      title: title,
      color: color,
      description: description,
      brand: brand,
      price: price,
      image: image, // Send image file along with other data
    };

    // You'd likely want to handle this via API in the future
    onAddProduct(newProduct);

    // Clear form fields after submission
    setProductName('');
    setTitle('');
    setColor('');
    setDescription('');
    setBrand('');
    setPrice('');
    setImage(null);
    setImagePreview('');
  };

  return (
    <div className="container mt-4">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="productName" className="form-label">Product Name</label>
          <input
            type="text"
            className="form-control"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="color" className="form-label">Color</label>
          <input
            type="text"
            className="form-control"
            id="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="brand" className="form-label">Brand</label>
          <input
            type="text"
            className="form-control"
            id="brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
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
