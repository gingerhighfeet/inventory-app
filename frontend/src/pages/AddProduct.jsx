import React from 'react'
import NewProductForm from '../components/NewProductForm';

export default function AddProduct() {
    const handleAddProduct = (productData) => {
        // You can perform actions here, such as dispatching to Redux, making an API call, etc.
        console.log('New Product Data:', productData);
      };
    
      return (
        <div>
          <h2>Add Product</h2>
          <NewProductForm onSubmit={handleAddProduct} />
        </div>
      );
    };
