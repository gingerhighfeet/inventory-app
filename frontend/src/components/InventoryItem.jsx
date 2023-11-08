function inventoryItem({ inventory }) {
  
  return (
    <div className='inventory'>
      
      <h2>{inventory.name}</h2>
      <h2>{inventory.price}</h2>
      <h2>{inventory.quantity}</h2>
    </div>
  )
}

export default inventoryItem