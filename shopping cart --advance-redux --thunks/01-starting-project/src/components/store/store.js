import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart";
import uiSlice from "./cart-ui";

const store = configureStore({
  reducer: { cart: cartSlice.reducer, ui: uiSlice.reducer },
});

export default store;
