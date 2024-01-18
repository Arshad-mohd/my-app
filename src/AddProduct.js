// AddProduct.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from './actions';

const AddProduct = ({ onClose }) => {
  const dispatch = useDispatch();
  const [newProduct, setNewProduct] = useState({ title: '', price: '', image: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleAddProduct = () => {
    // Dispatch action to add the new product
    dispatch(addProduct(newProduct));
    // Clear the form
    setNewProduct({ title: '', price: '', image: '' });
    // Notify the parent component to close the modal
    onClose();
  };

  return (
    <div>
      <h2>Add New Product</h2>
      <form>
        <label>
          Title:
          <input type="text" name="title" value={newProduct.title} onChange={handleInputChange} />
        </label>
        <label>
          Price:
          <input type="text" name="price" value={newProduct.price} onChange={handleInputChange} />
        </label>
        <label>
          Image URL:
          <input type="text" name="image" value={newProduct.image} onChange={handleInputChange} />
        </label>
        <button type="button" onClick={handleAddProduct}>
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
