import Product from './Product';

function ProductList({ products }) {
  return (
    <div className='products'>
      
      {products.map((product, index) => (<div className='product'>
  <Product key={product._id} {...product} />
</div>
))}
    </div>
  );
}

export default ProductList;