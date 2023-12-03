import axios from 'axios';

const API_URL = 'http://localhost:5000/api/invoices/';

export const createInvoice = async (invoiceData) => {
  try {
    const response = await axios.post(`${API_URL}` + 'add', invoiceData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error creating invoice:', error.message);
    throw error;
  }
};

export const getInvoices = async () => {
  try {
    const response = await axios.get(`${API_URL}` + 'view', {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching invoices:', error.message);
    throw error;
  }
};
