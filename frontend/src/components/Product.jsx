
function Product({ product }) {
  
  return (
    <div className='product'>
      
      <h2>{product.name}</h2>
      <h2>{product.price}</h2>
      <h2>{product.quantity}</h2>
    </div>
  )
}

export default Product