import { Link } from "react-router-dom";

export default function Products() {
  const PRODUCTS = [
    { id: "p1", name: "product 1" },
    { id: "p2", name: "product 2" },
    { id: "p3", name: "product 3" },
  ];
  return (
    <div>
      Products
      {PRODUCTS.map((prod) => (
        <li key={prod.id}>
          <Link to={`${prod.id}`} relative="path">
            {prod.name}
          </Link>
        </li>
      ))}
    </div>
  );
}
