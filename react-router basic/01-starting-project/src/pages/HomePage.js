import { Link, useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/products");
  }
  return (
    <>
      <div>Home Page</div>
      <Link to="/products">to products page</Link>
      <button onClick={handleClick}>navigate</button>
    </>
  );
}
