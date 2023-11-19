import axios from 'axios';

const API_URL = 'http://localhost:5000/api/invoices/';

export const createInvoice = async (invoiceData) => {
  try {
    const response = await axios.post(`${API_URL}`, invoiceData, {
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

export const getInvoices = createAsyncThunk('invoice/getInvoices', async () => {
  try {
    const invoices = await getInvoices();
    return invoices;
  } catch (error) {
    throw error.message;
  }
});
