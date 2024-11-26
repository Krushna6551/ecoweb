import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../reducer/addToCart'

export default configureStore({
  reducer: {
    cart :cartReducer
  }
})