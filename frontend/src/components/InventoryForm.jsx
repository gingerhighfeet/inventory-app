import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createInventory } from '../features/inventory/inventorySlice'

function InventoryForm() {
  const [text, setText] = useState('')

  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(createInventory({ text }))
    setText('')
  }

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='text'>Inventory</label>
            <input
                type='text'
                name='name'
                id='name'
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <input
                type='text'
                name='price'
                id='price'
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <input
                type='text'
                name='quantity'
                id='quantity'
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Add Invoice
          </button>
        </div>
      </form>
    </section>
  )
}

export default InventoryForm