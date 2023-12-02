import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProductForm from '../components/ProductForm';
import { getProducts } from '../features/product/productSlice';

function Invoice() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const products = useSelector((state) => state.product.product)

  useEffect(() => {

    if (!user) {
      navigate('/login');
    } else {
      dispatch(getProducts())
    }
  }, [user, navigate, dispatch]);

  return (
    <>
      <div>
        <h2>Add new invoice</h2>
        <ProductForm products={products} />
      </div>
      <div>
        <br></br>
      </div>
    </>
  );
}

export default Invoice;
