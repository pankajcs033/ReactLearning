import { useSelector, useDispatch } from "react-redux";
import classes from "./Counter.module.css";
import { counterActions } from "../store/counter";

const Counter = () => {
  const count = useSelector((state) => state.counter.counterValue);
  const view = useSelector((state) => state.counter.toggle);
  const dispatch = useDispatch();

  function handleIncrement() {
    dispatch(counterActions.increment());
  }
  function handleIncrementBy5() {
    dispatch(counterActions.increaseBy(5)); // {item: SOME_UNIQUE_IDENTIFIER, payload: 5} sent by react
  }
  function handleDecrement() {
    dispatch(counterActions.decrement());
  }
  function handleToggle() {
    dispatch(counterActions.toggle());
  }

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {view && <div className={classes.value}>{count}</div>}
      <button onClick={handleIncrement}>+</button>
      <button onClick={handleIncrementBy5}>+5</button>
      <button onClick={handleDecrement}>-</button>
      <button onClick={handleToggle}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
