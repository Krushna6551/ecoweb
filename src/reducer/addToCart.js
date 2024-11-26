import { createSlice } from '@reduxjs/toolkit';

export const addToCart = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
  },
  reducers: {
    addItem: (state, action) => {
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      
      if (existingItemIndex >= 0) {
        state.cartItems[existingItemIndex].quantity += 1;
      } else {
        const newItem = { ...action.payload, quantity: 1 };
        state.cartItems.push(newItem);
      }
    },
    decrementQuantity: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload
      );
      
      if (itemIndex >= 0 && state.cartItems[itemIndex].quantity > 1) {
        state.cartItems[itemIndex].quantity -= 1;
      }
    },
    incrementQuantity: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload
      );
      
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity += 1;
      }
    },
    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
    }
  },
});

export const { addItem, decrementQuantity, incrementQuantity, removeItem } = addToCart.actions;

export default addToCart.reducer;
