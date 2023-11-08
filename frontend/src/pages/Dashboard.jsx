import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import InventoryForm from '../components/InventoryForm'
import InventoryItem from '../components/InventoryItem'
import Spinner from '../components/Spinner'
import { getInventory, reset } from '../features/inventory/inventorySlice'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { inventory, isLoading, isError, message } = useSelector(
    (state) => state.inventory
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getInventory())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Inventory Dashboard</p>
      </section>

      <InventoryForm />

      <section className='content'>
        {inventory.length > 0 ? (
          <div className='inventory'>
            {inventory.map((inventory) => (
              <InventoryItem key={inventory._id} inventory={inventory} />
            ))}
          </div>
        ) : (
          <h3>You have no items in your inventory</h3>
        )}
      </section>
    </>
  )
}

export default Dashboard