import { useContext } from "react";
import { CartContext } from "../store/CartContext.jsx";

import Button from "./Button";
import { currencyFormatter } from "../utils/formatting.js";

export default function Meal({ meal, setCartItems }) {
  const { addItemToCart } = useContext(CartContext);

  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">
            {currencyFormatter.format(meal.price)}
          </p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p>
          <Button onClick={() => addItemToCart(meal)}>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
}
