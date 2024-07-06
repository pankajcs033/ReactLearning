import { Fragment } from "react";
import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";

const Cart = (props) => {
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const viewCart = useSelector((state) => state.ui.showCart);
  const items = useSelector((state) => state.cart.items);

  return (
    <Fragment>
      {viewCart && (
        <Card className={classes.cart}>
          <h2>Your Shopping Cart</h2>
          <h1>${totalPrice}</h1>
          <ul>
            {items.map((cartItem) => (
              <CartItem key={cartItem.id} item={cartItem} />
            ))}
          </ul>
        </Card>
      )}
    </Fragment>
  );
};

export default Cart;
