import Header from "./components/Header.jsx";
import Shop from "./components/Shop.jsx";
import { CartContextProvider } from "./store/cart-context.jsx";

function App() {
  return (
    // we have created this CartContextProvider which wraps around child components
    <CartContextProvider>
      <Header />
      <Shop />
    </CartContextProvider>
  );
}

export default App;
