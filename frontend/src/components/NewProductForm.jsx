import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct } from '../features/product/productSlice';

const NewProductForm = ({ onSubmit }) => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productCategory, setProductCategory] = useState(''); // State for category dropdown

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate if necessary, and then call the onSubmit function
    onSubmit({
      name: productName,
      price: productPrice,
      quantity: '0', // Set the default quantity to 0
      category: productCategory, // Include the selected category
    });

    // Dispatch the createProduct action with the product data
    dispatch(createProduct({
      name: productName,
      price: productPrice,
      quantity: '0',
      category: productCategory,
    }));

    // Optionally, you can reset the form fields after submission
    setProductName('');
    setProductPrice('');
    setProductCategory('');
  };

  return (
    <form onSubmit={handleSubmit}>
    <div className='form-group'>
      <label>
        Category:
        <select value={productCategory} onChange={(e) => setProductCategory(e.target.value)}>
          <option value="">Select a category</option>
          <option value="Dry Storage">Dry Storage</option>
          <option value="Freezer">Freezer</option>
          <option value="Produce">Produce</option>
        </select>
      </label>
      <br />
      <label>
        Name:
        <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
      </label>
      <br />
      <label>
        Price:
        <input type="text" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
      </label>
      <br />
      <button className='btn btn-block' type="submit">Create Product</button>
      </div>
    </form>
  );
};

export default NewProductForm;
