import { createSlice } from "@reduxjs/toolkit";

const cartInitialValue = {
  items: [],
  totalPrice: 0,
  changed: false, // used for unwanted calls to the DB initially
};

const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitialValue,
  reducers: {
    replaceCart(state, action) {
      state.items = action.payload.items;
      state.totalPrice = action.payload.totalPrice;
    },
    increment(state, action) {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      state.items[existingItemIndex].quantity++;
      state.items[existingItemIndex].total =
        state.items[existingItemIndex].total +
        state.items[existingItemIndex].price;
      state.changed = true;

      // cart total price
      state.totalPrice =
        state.totalPrice + state.items[existingItemIndex].price;
    },
    decrement(state, action) {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.items[existingItemIndex].quantity === 1) {
        // cart total price
        state.totalPrice =
          state.totalPrice - state.items[existingItemIndex].price;
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        state.items[existingItemIndex].quantity--;
        state.items[existingItemIndex].total =
          state.items[existingItemIndex].total -
          state.items[existingItemIndex].price;

        // cart total price
        state.totalPrice =
          state.totalPrice - state.items[existingItemIndex].price;
      }
      state.changed = true;
    },
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === newItem.id
      );
      if (existingItemIndex === -1) {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          description: newItem.description,
          quantity: 1,
          total: newItem.price,
          price: newItem.price,
        });

        // cart total price
        state.totalPrice = state.totalPrice + newItem.price;
      } else {
        state.items[existingItemIndex].quantity++;
        state.items[existingItemIndex].total =
          state.items[existingItemIndex].total + newItem.price;

        // cart total price
        state.totalPrice = state.totalPrice + newItem.price;
      }
      state.changed = true;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
