import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct } from '../features/product/productSlice';
import { createInvoice } from '../features/invoice/invoiceSlice';

function ProductForm({ products }) {

  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [vendor, setVendor] = useState('');

  // Create a state object to store price and quantity for each product
  const [productFields, setProductFields] = useState({});

  const [successMessage, setSuccessMessage] = useState('');

  // Extract unique product names and sort them alphabetically
  const uniqueProductNames = [...new Set(products.map((product) => product.name))].sort();
  const dispatch = useDispatch();

  const onProductFieldChange = (productName, field, value) => {
    setProductFields((prevFields) => ({
      ...prevFields,
      [productName]: {
        ...prevFields[productName],
        [field]: value,
      },
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
  
    const invoiceData = {
      invoiceNumber,
      invoiceDate,
      vendor,
    };
  
    try {
      // Dispatch the createInvoice action
      await dispatch(createInvoice(invoiceData));
  
      // Dispatch the createProduct action for each product
      for (const [productName, fields] of Object.entries(productFields)) {
        const productData = {
          name: productName,
          price: fields.price || '',
          quantity: fields.quantity || '',
          invoiceNumber,
        };
  
        // Dispatch the createProduct action for each product
        await dispatch(createProduct(productData));
      }
  
      setSuccessMessage('Invoice added successfully!');
      // Reset form fields after successful submission
      setInvoiceNumber('');
      setInvoiceDate('');
      setVendor('');
      setProductFields({});
    } catch (error) {
      console.error('Error creating product or invoice:', error);
      // Handle or display the error message to the user
      // e.g., set an error state in your component
    }
  };

  const clearSuccessMessage = () => {
    setSuccessMessage('');
  };
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

          {uniqueProductNames.map((productName) => (
            <div key={productName} className='product-row'>
              <label htmlFor={`price-${productName}`}>{productName}</label>
              <input
                type='number'
                id={`price-${productName}`}
                name={`price-${productName}`}
                value={productFields[productName]?.price || ''}
                autoComplete={`price-${productName}`}
                onChange={(e) => onProductFieldChange(productName, 'price', e.target.value)}
                placeholder='Price'
              />

              <input
                type='number'
                id={`quantity-${productName}`}
                name={`quantity-${productName}`}
                value={productFields[productName]?.quantity || ''}
                autoComplete={`quantity-${productName}`}
                onChange={(e) => onProductFieldChange(productName, 'quantity', e.target.value)}
                placeholder='Quantity'
              />
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
