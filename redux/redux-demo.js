const redux = require("redux");

// reducer
const reduxReducer = (state = { counter: 0 }, action) => {
  if (action.type === "increment") {
    return {
      counter: state.counter + 1,
    };
  }
  if (action.type === "decrement") {
    return {
      counter: state.counter - 1,
    };
  }
  return state;
};

// store (central state)
const store = redux.createStore(reduxReducer);

// subscriber
const reduxSubscriber = () => {
  const state = store.getState();
  console.log(state);
};

store.subscribe(reduxSubscriber);

// action
store.dispatch({ type: "increment" });
store.dispatch({ type: "decrement" });
