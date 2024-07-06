import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    showCart: false,
    notification: null,
  },
  reducers: {
    toggleShowCart(state) {
      state.showCart = !state.showCart;
    },
    showNotification(state, action) {
      state.notification = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
