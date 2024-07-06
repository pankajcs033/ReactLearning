import { useContext } from "react";
import Modal from "./Modal";
import { userContext } from "../store/UserContext";
import Button from "./Button";
import { CartContext } from "../store/CartContext";
import { currencyFormatter } from "../utils/formatting";
import CartItem from "./CartItem";

export default function Cart() {
  const userCtx = useContext(userContext);
  const cartCtx = useContext(CartContext);

  const totalAmount = cartCtx.items.reduce(
    (totAmt, item) => totAmt + item.price * item.quantity,
    0
  );

  function handleClose() {
    userCtx.closeCart();
  }

  function handleCheckout() {
    userCtx.openCheckout();
  }

  return (
    <Modal
      open={userCtx.progress === "cart"}
      className="cart"
      onClose={userCtx.progress === "cart" ? userCtx.closeCart : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onIncrease={() => cartCtx.addItemToCart(item)}
            onDecrease={() => cartCtx.removeCartItem(item.id)}
          />
        ))}
      </ul>

      <p className="cart-total">
        Total Amount : {currencyFormatter.format(totalAmount)}
      </p>

      <div className="modal-actions">
        <Button textOnly onClick={handleClose}>
          Close
        </Button>
        <Button onClick={handleCheckout}> Checkout</Button>
      </div>
    </Modal>
  );
}
