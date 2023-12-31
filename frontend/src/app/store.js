import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import productReducer from '../features/product/productSlice'
import invoiceReducer from '../features/invoice/invoiceSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    invoice: invoiceReducer,
  },
})
