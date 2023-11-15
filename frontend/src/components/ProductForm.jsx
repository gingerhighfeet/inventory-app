import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createProduct } from '../features/product/productSlice'

function ProductForm() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const dispatch = useDispatch()
  
  const onSubmit = (e) => {
    e.preventDefault();
  
    const productData = {
      name,
      price,
      quantity,
    };
  
    dispatch(createProduct(productData));
    setName('');
    setPrice('');
    setQuantity('');
  };

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Product name</label>
            <input
                type='text'
                name='name'
                id='name'
                value={name}
                autoComplete="product-name"
                onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor='price'>Price</label>
            <input
                type='number'
                name='price'
                id='price'
                value={price}
                autoComplete="price"
                onChange={(e) => setPrice(e.target.value)}
            />
            <label htmlFor='quantity'>Quantity</label>
            <input
                type='number'
                name='quantity'
                id='quantity'
                value={quantity}
                autoComplete="quantity"
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
  )
}

export default ProductForm