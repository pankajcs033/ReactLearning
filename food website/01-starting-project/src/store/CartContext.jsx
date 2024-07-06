import { createContext, useReducer, useState, useEffect } from "react";

export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  removeCartItem: () => {},
  clearCart: () => {},
});

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const updatedItems = [...state.items];

    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id === action.item.id
    );

    if (existingCartItemIndex > -1) {
      const existingItem = state.items[existingCartItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({
        ...action.item,
        quantity: 1,
      });
    }

    return {
      ...state,
      items: updatedItems,
    };
  }

  if (action.type === "REMOVE_ITEM") {
    const updatedItems = [...state.items];
    const removeItemIndex = updatedItems.findIndex(
      (item) => item.id === action.id
    );

    if (updatedItems[removeItemIndex].quantity === 1) {
      updatedItems.splice(removeItemIndex, 1);
    } else {
      const updatedItem = {
        ...updatedItems[removeItemIndex],
        quantity: updatedItems[removeItemIndex].quantity - 1,
      };
      updatedItems[removeItemIndex] = updatedItem;
    }

    return {
      ...state,
      items: updatedItems,
    };
  }

  if (action.type === "CLEAR") {
    const updatedItems = [];

    return {
      ...state,
      items: updatedItems,
    };
  }

  return state;
}

export function CartContextProvider({ children }) {
  const [foodItemsState, cartDispatch] = useReducer(cartReducer, {
    items: [],
  });

  function handleAddItemToCart(item) {
    cartDispatch({
      type: "ADD_ITEM",
      item,
    });
  }

  function handleRemoveCartItem(id) {
    cartDispatch({
      type: "REMOVE_ITEM",
      id,
    });
  }

  function handleClearCart(id) {
    cartDispatch({
      type: "CLEAR",
    });
  }

  let cartCtx = {
    items: foodItemsState.items,
    addItemToCart: handleAddItemToCart,
    removeCartItem: handleRemoveCartItem,
    clearCart: handleClearCart,
  };

  return (
    <CartContext.Provider value={cartCtx}>{children}</CartContext.Provider>
  );
}
