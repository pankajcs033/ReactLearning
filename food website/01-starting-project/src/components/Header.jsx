import { useContext, useState } from "react";
import { CartContext } from "../store/CartContext";

import logo from "../assets/logo.jpg";
import Button from "./Button";
import { userContext } from "../store/UserContext";

export default function Header() {
  const { items } = useContext(CartContext);

  const cartQuantity = items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  const cartctx = useContext(userContext);

  function handleOpen() {
    cartctx.openCart();
  }

  return (
    <div id="main-header">
      <div id="title">
        <img src={logo} alt="react food web"></img>
        <h1>React Food</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleOpen}>
          Cart ({cartQuantity})
        </Button>
      </nav>
    </div>
  );
}
