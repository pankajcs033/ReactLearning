import { useContext, useEffect } from "react";
import { userContext } from "../store/UserContext";

import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";
import { currencyFormatter } from "../utils/formatting";
import { CartContext } from "../store/CartContext";
import useHttp from "../hook/useHttp";
import Error from "./Error";

const configObject = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const userCtx = useContext(userContext);
  const cartCtx = useContext(CartContext);
  const cartTotal = cartCtx.items.reduce(
    (cartTot, item) => cartTot + item.quantity * item.price,
    0
  );
  const {
    data,
    error,
    isLoading: isSending,
    sentHttpRequest,
    clearData,
  } = useHttp("http://localhost:3000/orders", configObject);

  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const formEntries = Object.fromEntries(fd.entries());

    sentHttpRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: formEntries,
        },
      })
    );
  }

  function handleClose() {
    userCtx.closeCheckout();
  }

  function handleFinish() {
    userCtx.closeCheckout();
    cartCtx.clearCart();
    clearData();
  }

  if (data && !error) {
    return (
      <Modal
        open={userCtx.progress === "checkout"}
        className="checkout"
        onClose={handleFinish}
      >
        <h2>Success</h2>
        <p>your order has been successfully placed.</p>
        <Button onClick={handleFinish}>Okay</Button>
      </Modal>
    );
  }

  return (
    <Modal
      open={userCtx.progress === "checkout"}
      className="checkout"
      onClose={userCtx.progress === "checkout" ? userCtx.closeCheckout : null}
    >
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount : {currencyFormatter.format(cartTotal)}</p>
        <Input label="Full Name" id="name" name="name" type="text" />
        <Input label="Email" id="email" name="email" type="email" />
        <Input label="Street" id="street" name="street" type="text" />
        <div className="control-row">
          <Input
            label="PIN"
            id="postal-code"
            name="postal-code"
            type="number"
          />
          <Input label="City" id="city" name="city" type="text" />
        </div>
        {error && <Error title="Failed" message={error} />}
        <p className="modal-actions">
          {isSending ? (
            <span>Sending order...</span>
          ) : (
            <>
              <Button textOnly type="button" onClick={userCtx.openCart}>
                Manage Orders
              </Button>
              <Button label="Checkout">Pay</Button>
            </>
          )}
        </p>
      </form>
    </Modal>
  );
}
