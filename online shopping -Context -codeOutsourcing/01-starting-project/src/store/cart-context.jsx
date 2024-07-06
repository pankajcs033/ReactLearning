import { useState, createContext, useReducer } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products.js";

export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  updateItemQuantity: () => {},
  // declaring here will help in auto completion
});

function shoppingCartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const updatedItems = [...state.items];

    // find index if present then update count or add new entry
    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id === action.payload
    );
    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      const product = DUMMY_PRODUCTS.find(
        (product) => product.id === action.payload
      );
      updatedItems.push({
        id: action.payload,
        name: product.title,
        price: product.price,
        quantity: 1,
      });
    }

    return {
      ...state,
      items: updatedItems,
    };
  }

  if (action.type === "UPDATE_ITEM") {
    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex(
      (item) => item.id === action.payload.productId
    );

    const updatedItem = {
      ...updatedItems[updatedItemIndex],
    };

    updatedItem.quantity += action.payload.amount;

    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }

    return {
      ...state,
      items: updatedItems,
    };
  }

  return state;
}

export function CartContextProvider({ children }) {
  const [shoppingCartState, shoppingCartDispatch] = useReducer(
    shoppingCartReducer,
    {
      items: [],
    }
  );
  // const [shoppingCart, setShoppingCart] = useState({
  //   items: [],
  // });

  function handleAddItemToCart(id) {
    shoppingCartDispatch({
      type: "ADD_ITEM",
      payload: id,
    });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    shoppingCartDispatch({
      type: "UPDATE_ITEM",
      payload: {
        productId,
        amount,
      },
    });
  }

  // context object
  let cartCtx = {
    items: shoppingCartState.items,
    addItemToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateCartItemQuantity,
    // map the respective functions with keys
  };

  return (
    // value must passed into component
    <CartContext.Provider value={cartCtx}>{children}</CartContext.Provider>
  );
}

// Context helps in to avoid writing boiler-plate code again and again and also helps in to
// deal with props driling issue.

// props driling is the issue when we pass the props from parent component
// to child component and intermediate components are not using those props.
