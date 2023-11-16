import React, { useState } from 'react';

function StockList({ products, handlePriceChange, handleQuantityChange }) {
  const [localProducts, setLocalProducts] = useState(products);

  const handleLocalPriceChange = (productId, value) => {
    setLocalProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, price: value } : product
      )
    );
   
    handlePriceChange(productId, value);
  };

  const handleLocalQuantityChange = (productId, value) => {

    setLocalProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, quantity: value } : product
      )
    );
   
    handleQuantityChange(productId, value);
  };

  return (
    <section className='stock-list'>
      <h2>Product List</h2>
      <ul>
        {localProducts.map((product) => (
          <li key={product.id}>
            <label htmlFor={`price-${product.id}`}>{product.name}</label>
            <input
              type='number'
              name={`price-${product.id}`}
              id={`price-${product.id}`}
              value={product.price}
              autoComplete={`price-${product.id}`}
              onChange={(e) => handleLocalPriceChange(product.id, e.target.value)}
            />

            <label htmlFor={`quantity-${product.id}`}>Quantity</label>
            <input
              type='number'
              name={`quantity-${product.id}`}
              id={`quantity-${product.id}`}
              value={product.quantity}
              autoComplete={`quantity-${product.id}`}
              onChange={(e) => handleLocalQuantityChange(product.id, e.target.value)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default StockList;

