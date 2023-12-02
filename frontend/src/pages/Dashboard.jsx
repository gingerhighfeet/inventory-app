import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProductList from '../components/ProductList';
import { getProducts } from '../features/product/productSlice';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const products = useSelector((state) => state.product.product);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    dispatch(getProducts());
  }, [user, navigate, dispatch]);

  const handleAddInvoice = () => {
    // Add logic to navigate to the invoices page
    navigate('/invoices');
  };

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Inventory Dashboard</p>
        <h4>Products In Stock</h4>
      </section>
      <div>
        <ProductList products={products} />
      <button className='btn btn-block' onClick={handleAddInvoice}>Add Invoice</button>
      </div>
      <div>
      <br></br>
    </div>
    </>
  );
}

export default Dashboard;
