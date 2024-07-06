import classes from "./CartButton.module.css";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../store/cart-ui.js";

const CartButton = (props) => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const totalQuantity = items.reduce(
    (initValue, item) => (initValue += item.quantity),
    0
  );
  function handleCartToggle() {
    dispatch(uiActions.toggleShowCart());
  }

  return (
    <button className={classes.button} onClick={handleCartToggle}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
