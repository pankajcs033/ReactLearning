import Header from "./components/Header";
import Meals from "./components/Meals";
import Cart from "./components/Cart";
import { CartContextProvider } from "./store/CartContext.jsx";
import { UserContextProvider } from "./store/UserContext.jsx";
import Checkout from "./components/Checkout";

function App() {
  return (
    <UserContextProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart />
        <Checkout />
      </CartContextProvider>
    </UserContextProvider>
  );
}

export default App;
