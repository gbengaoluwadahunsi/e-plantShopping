import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
    totalQuantity: 0, // Initialize totalQuantity as 0
  },
  reducers: {
    addItem: (state, action) => {
        const { name, image, cost } = action.payload;
        const existingItem = state.items.find(item => item.name === name);
        if (existingItem) {
          existingItem.quantity++;
        } else {
          state.items.push({ name, image, cost, quantity: 1 });
        }
        state.totalQuantity++; // Increment totalQuantity
    },
    removeItem: (state, action) => {
        const { name } = action.payload;
        const itemToRemove = state.items.find(item => item.name === name);
        if (itemToRemove) {
          state.totalQuantity -= itemToRemove.quantity; // Decrement totalQuantity by the item's quantity
          state.items = state.items.filter(item => item.name !== name);
        }
    },
    updateQuantity: (state, action) => {
        const { name, quantity } = action.payload;
        const itemToUpdate = state.items.find(item => item.name === name);
        if (itemToUpdate) {
          state.totalQuantity += quantity - itemToUpdate.quantity; // Update totalQuantity
          itemToUpdate.quantity = quantity;
        }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
