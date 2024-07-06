import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Products from "./pages/Products";
import RootLayout from "./pages/RootLayout";
import ErrorPage from "./components/ErrorPage";
import ProductDetails from "./components/ProductDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "products", element: <Products /> },
      { path: "products/:productId", element: <ProductDetails /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
