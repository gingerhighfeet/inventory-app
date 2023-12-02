import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateProduct } from '../features/product/productSlice';
import { createInvoice } from '../features/invoice/invoiceSlice';

function ProductForm({ products }) {
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [vendor, setVendor] = useState('');
  const [productFields, setProductFields] = useState(
    Array.isArray(products)
      ? [...products]
          .sort((a, b) => a.category.localeCompare(b.category))
          .map((product) => ({
            category: product.category,
            name: product.name,
            price: '',
            quantity: '',
          }))
      : []
  );
  const [successMessage, setSuccessMessage] = useState('');
  const dispatch = useDispatch();

  const onProductFieldChange = (name, field, value) => {
    setProductFields((prevFields) => {
      const existingProductIndex = prevFields.findIndex((product) => product.name === name);

      if (existingProductIndex !== -1) {
        // If the product already exists in the array, update the specific field including 'category'
        const updatedFields = [...prevFields];
        updatedFields[existingProductIndex] = {
          ...updatedFields[existingProductIndex],
          [field]: value,
        };
        return updatedFields;
      } else {
        // If the product doesn't exist, add a new product to the array with the correct 'category'
        const category = products.find((product) => product.name === name)?.category;
        return [...prevFields, { name, category, [field]: value }];
      }
    });
  };

  const clearSuccessMessage = () => {
    setSuccessMessage('');
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const invoiceData = {
      invoiceNumber,
      invoiceDate,
      vendor,
      products: [...productFields], // Send the productFields array directly
    };

    // Create an array of update objects for each product
    const updateArray = productFields.map(({ category, name, price, quantity }) => ({
      category,
      name,
      price: price || '',
      quantity: quantity || '',
    }));

    try {
      // Dispatch the createInvoice action
      dispatch(createInvoice(invoiceData));

      // Dispatch the updateProduct action
      dispatch(updateProduct(updateArray));
      console.log('update array: ', updateArray);

      // Clear fields after updating products
      setInvoiceNumber('');
      setInvoiceDate('');
      setVendor('');
      setProductFields([]);
      setSuccessMessage('Invoice added successfully!');

      // Show a popup alert
    window.alert('Invoice added successfully!');
    
    } catch (error) {
      console.error('Error creating product or invoice:', error);
    }
  };

  // Group products by category for rendering
  const productsByCategory = products.reduce((acc, product) => {
    acc[product.category] = acc[product.category] || [];
    acc[product.category].push(product);
    return acc;
  }, {});

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='invoiceNumber'>Invoice Number</label>
          <input
            type='text'
            name='invoiceNumber'
            id='invoiceNumber'
            value={invoiceNumber}
            autoComplete='invoice-number'
            onChange={(e) => setInvoiceNumber(e.target.value)}
          />

          <label htmlFor='invoiceDate'>Invoice Date</label>
          <input
            type='date'
            name='invoiceDate'
            id='invoiceDate'
            value={invoiceDate}
            onChange={(e) => setInvoiceDate(e.target.value)}
          />

          <label htmlFor='vendor'>Vendor</label>
          <input
            type='text'
            name='vendor'
            id='vendor'
            value={vendor}
            autoComplete='vendor'
            onChange={(e) => setVendor(e.target.value)}
          />

          {/* Render products grouped by category */}
          {Object.entries(productsByCategory).map(([category, categoryProducts]) => (
            <div key={category} className='category-section'>
              <h2>{category}</h2>
              {categoryProducts.map((product, index) => (
                <div key={index} className='product-row'>
                  <label htmlFor={`price-${product.name}`}>{product.name}</label>
                  <input
                    type='number'
                    id={`price-${product.name}`}
                    name={`price-${product.name}`}
                    value={productFields.find((field) => field.name === product.name)?.price || ''}
                    autoComplete={`price-${product.name}`}
                    onChange={(e) => onProductFieldChange(product.name, 'price', e.target.value)}
                    placeholder='Price'
                  />

                  <input
                    type='number'
                    id={`quantity-${product.name}`}
                    name={`quantity-${product.name}`}
                    value={productFields.find((field) => field.name === product.name)?.quantity || ''}
                    autoComplete={`quantity-${product.name}`}
                    onChange={(e) => onProductFieldChange(product.name, 'quantity', e.target.value)}
                    placeholder='Quantity'
                  />
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Add Invoice
          </button>
        </div>
      </form>

      {successMessage && (
        <div className='success-message'>
          <p>{successMessage}</p>
          {/* Automatically clear the message after 3 seconds */}
          {setTimeout(clearSuccessMessage, 3000)}
        </div>
      )}
    </section>
  );
}

export default ProductForm;
