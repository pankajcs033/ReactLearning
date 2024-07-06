import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const productItems = [
  {
    id: "p1",
    title: "my first book",
    description: "mt first book is this",
    price: 10,
  },
  {
    id: "p2",
    title: "my second book",
    description: "mt second book is this",
    price: 20,
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {productItems.map((product) => (
          <ProductItem key={product.id} {...product} />
        ))}
      </ul>
    </section>
  );
};

export default Products;
