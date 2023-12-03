import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'http://localhost:5000/api/invoices/';

const initialState = {
  invoiceList: [],
  status: 'idle',
  error: null,
};

export const getInvoices = createAsyncThunk('invoice/getInvoices', async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    return Promise.reject(error.message);
  }
});

export const createInvoice = createAsyncThunk('invoice/createInvoice', async (invoiceData) => {
  try {
    const response = await axios.post(API_URL, invoiceData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error.message);
  }
});

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    // You can keep your synchronous actions here if needed
    addInvoice: (state, action) => {
      state.invoiceList.push(action.payload);
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.status = 'failed';
    },
    setStatusIdle: (state) => {
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInvoices.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getInvoices.fulfilled, (state, action) => {
       state.status = 'succeeded';
        state.invoiceList = action.payload; 
      })
      .addCase(getInvoices.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
      })
      .addCase(createInvoice.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createInvoice.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.invoiceList.push(action.payload);
      })
      .addCase(createInvoice.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addInvoice, setError, setStatusIdle } = invoiceSlice.actions;

export const selectInvoices = (state) => state.invoice.invoiceList;

export default invoiceSlice.reducer;