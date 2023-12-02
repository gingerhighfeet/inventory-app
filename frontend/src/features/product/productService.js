import axios from 'axios'

const API_URL = 'http://localhost:5000/api/products/'

// Create product
const createProduct = async (productData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, productData, config)

  return response.data
}

// Get all products
const getProducts = async (token) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Update a product
const updateProduct = async (updateArray, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await axios.put(`${API_URL}/update`, updateArray, config);
    return response.data;
  } catch (error) {
    console.error('Error updating products', error.response ? error.response.status : 'No response', error.response ? error.response.data : 'No response data');
    throw error; // Re-throw the error to handle it in the calling code
  }
};


// Delete a product
const deleteProduct = async (productId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + productId, config)

  return response.data
}

const productService = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
}

export default productService