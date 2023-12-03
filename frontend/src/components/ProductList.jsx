import Product from './Product';

function ProductList({ products }) {
  return (
    <div className='products'>
      {products.map((product) => (
        <div key={product.name} className='product'>
          <Product {...product} />
        </div>
      ))}
    </div>
  );
}

export default ProductList;