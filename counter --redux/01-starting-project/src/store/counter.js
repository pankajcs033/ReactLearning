import { createSlice } from "@reduxjs/toolkit";

const counterInitialState = { counterValue: 0, toggle: true };

const counterSlice = createSlice({
  name: "counter",
  initialState: counterInitialState,
  reducers: {
    increment(state) {
      state.counterValue++;
    },
    decrement(state) {
      state.counterValue--;
    },
    increaseBy(state, action) {
      state.counterValue = state.counterValue + action.payload;
    },
    toggle(state) {
      state.toggle = !state.toggle;
    },
  },
});

export const counterActions = counterSlice.actions;

export default counterSlice.reducer;
