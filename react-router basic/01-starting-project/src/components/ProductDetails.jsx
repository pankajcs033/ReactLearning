import React from "react";
import { useParams, Link } from "react-router-dom";

export default function ProductDetails() {
  const params = useParams();

  return (
    <>
      <div>ProductDetails</div>
      <h1>{params.productId}</h1>
      <Link to=".." relative="route">
        BACK
      </Link>
    </>
  );
}
