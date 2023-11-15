import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import ProductList from '../components/ProductList'
import { getProducts } from '../features/product/productSlice'


function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth)
  const products = useSelector((state) => state.product.product); 
  useEffect(() => {  
  
  if (!user) {
      navigate('/login')
      return
    }

    dispatch(getProducts());
}, [user, navigate, dispatch])


  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Inventory Dashboard</p>
      </section>
      <div>
      <ProductList products={products} />
      </div>
    </>
  )
}

export default Dashboard