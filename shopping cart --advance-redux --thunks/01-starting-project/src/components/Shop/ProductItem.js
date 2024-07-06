import Card from "../UI/Card";
import classes from "./ProductItem.module.css";
import { cartActions } from "../store/cart";
import { useDispatch } from "react-redux";
import { uiActions } from "../store/cart-ui";

const ProductItem = (props) => {
  const { title, price, description } = props;
  const dispatch = useDispatch();

  function handleAddToCart() {
    dispatch(cartActions.addToCart(props));

    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Request Sent",
        message: "Data Sent Successfully",
      })
    );

    setTimeout(() => {
      uiActions.showNotification(null);
    }, 100);
  }

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
