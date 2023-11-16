import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct } from '../features/product/productSlice';
import { createInvoice } from '../features/invoice/invoiceSlice'

function ProductForm() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [invoiceDate, setInvoiceDate] = useState(''); 
  const [vendor, setVendor] = useState('');

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    const productData = {
      name,
      price,
      quantity,
      invoiceNumber, 
    };

    const invoiceData = {
      invoiceNumber, 
      invoiceDate, 
      vendor,
    }
    
    dispatch(createInvoice(invoiceData))
    dispatch(createProduct(productData));
    // Reset all form fields after submission
    setName('');
    setPrice('');
    setQuantity('');
    setInvoiceNumber('');
    setInvoiceDate('');
    setVendor('');
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

          <label htmlFor='name'>Product Name</label>
          <input
            type='text'
            name='name'
            id='name'
            value={name}
            autoComplete='product-name'
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor='price'>Price</label>
          <input
            type='number'
            name='price'
            id='price'
            value={price}
            autoComplete='price'
            onChange={(e) => setPrice(e.target.value)}
          />

          <label htmlFor='quantity'>Quantity</label>
          <input
            type='number'
            name='quantity'
            id='quantity'
            value={quantity}
            autoComplete='quantity'
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Add Invoice
          </button>
        </div>
      </form>
    </section>
  );
}

export default ProductForm;
