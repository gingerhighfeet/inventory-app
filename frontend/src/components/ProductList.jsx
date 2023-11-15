import Product from './Product'

function ProductList({ products }) {
  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map((product, index) => (
          <Product key={index} {...product} />
        ))}
      </ul>
    </div>
  );
}

export default ProductList;