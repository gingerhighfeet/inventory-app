function Product({ name, price, quantity }) {
  return (
    <div>
      <h3>{name}</h3>
      <p>Price: ${price}</p>
      <p>Quantity: {quantity}</p>
    </div>
  )
}


export default Product