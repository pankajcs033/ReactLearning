import { Fragment } from "react";
import Auth from "./components/Auth";
import Counter from "./components/Counter";
import Header from "./components/Header";
import { useSelector } from "react-redux";

function App() {
  const isAuthenticated = useSelector(
    (state) => state.authentication.isAuthenticated
  );
  return (
    <Fragment>
      <Header isAuthenticated={isAuthenticated} />
      {!isAuthenticated && <Auth />}
      <Counter />
    </Fragment>
  );
}

export default App;
