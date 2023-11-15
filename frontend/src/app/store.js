import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import authReducer from '../features/auth/authSlice'
import productReducer from '../features/product/productSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    middleware: [thunk],
  },
})
