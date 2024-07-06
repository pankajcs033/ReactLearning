import { createContext, useState } from "react";

export const userContext = createContext({
  progress: "",
  openCart: () => {},
  closeCart: () => {},
  openCheckout: () => {},
  closeCheckout: () => {},
});

export function UserContextProvider({ children }) {
  const [userProgress, setUserProgress] = useState("");

  function handleOpenCart() {
    setUserProgress("cart");
  }

  function handleCloseCart() {
    setUserProgress("");
  }

  function handleOpenCheckout() {
    setUserProgress("checkout");
  }

  function handleCloseCheckout() {
    setUserProgress("");
  }

  const userCtx = {
    progress: userProgress,
    openCart: handleOpenCart,
    closeCart: handleCloseCart,
    openCheckout: handleOpenCheckout,
    closeCheckout: handleCloseCheckout,
  };

  return (
    <userContext.Provider value={userCtx}>{children}</userContext.Provider>
  );
}
