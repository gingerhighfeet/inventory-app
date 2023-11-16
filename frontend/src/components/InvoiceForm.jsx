import { useState } from 'react';


function InvoiceForm({ products }) {
    const [invoiceData, setInvoiceData] = useState({
      invoiceNumber: '',
      date: '',
      vendor: '',
      products: [],
    });
  
    const addProduct = () => {
      setInvoiceData((prevData) => ({
        ...prevData,
        products: [...prevData.products, { productId: null, quantity: 1, price: 0 }],
      }));
    };

    const handleProductChange = (index, value) => {
        setInvoiceData((prevData) => {
          const updatedProducts = [...prevData.products];
          updatedProducts[index] = {
            ...updatedProducts[index],
            productId: value,
          };
          return { ...prevData, products: updatedProducts };
        });
      };
      

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Submitted Invoice Data:', invoiceData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='invoiceNumber'>Invoice Number</label>
      <input
        type='text'
        name='invoiceNumber'
        value={invoiceData.invoiceNumber}
        onChange={(e) => setInvoiceData({ ...invoiceData, invoiceNumber: e.target.value })}
      />

      <label htmlFor='date'>Date</label>
      <input
        type='date'
        name='date'
        value={invoiceData.date}
        onChange={(e) => setInvoiceData({ ...invoiceData, date: e.target.value })}
      />

      <label htmlFor='vendor'>Vendor</label>
      <input
        type='text'
        name='vendor'
        value={invoiceData.vendor}
        onChange={(e) => setInvoiceData({ ...invoiceData, vendor: e.target.value })}
      />

      <h3>Products</h3>
            {invoiceData.products.map((product, index) => (
        <div key={index}>
        <label htmlFor={`product-${index}`}>Product</label>
            <select
                name={`product-${index}`}
                value={product.productId || ''}  
                onChange={(e) => handleProductChange(index, e.target.value)}
            >
                <option value='' disabled>
                    Select a product
                </option>
                    {products.map((productOption) => (
                <option key={productOption.productId} value={productOption.productId}>
                    {productOption.name}
                </option>
            ))}
            </select>


          <label htmlFor={`quantity-${index}`}>Quantity</label>
          <input
            type='number'
            name={`quantity-${index}`}
            value={product.quantity}
            onChange={(e) => handleProductChange(index, product.productId, e.target.value)}
          />

          <label htmlFor={`price-${index}`}>Price</label>
          <input
            type='number'
            name={`price-${index}`}
            value={product.price}
            onChange={(e) => handleProductChange(index, product.productId, 'price', e.target.value)}
          />
        </div>
      ))}

      <button type='button' onClick={addProduct}>
        Add Product
      </button>

      <button type='submit'>Submit Invoice</button>
    </form>
  );
}

export default InvoiceForm;
