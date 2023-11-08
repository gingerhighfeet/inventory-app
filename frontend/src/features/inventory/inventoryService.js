import axios from 'axios'

const API_URL = '/api/inventory/'

// Create new inventory
const createInventory = async (inventoryData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, inventoryData, config)

  return response.data
}

// Get all inventory
const getInventory = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

// Delete inventory
const deleteInventory = async (inventoryId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + inventoryId, config)

  return response.data
}

const inventoryService = {
  createInventory,
  getInventory,
  //updateInventory,
  deleteInventory,
}

export default inventoryService