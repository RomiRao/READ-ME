import { createBrowserRouter } from "react-router-dom";
import Filtered from "../components/Filtered";
import Home from "../components/Home/Home";
import Detail from "../components/Detail";
import CartPage from "../components/Cart/CartPage";
import CheckoutPage from "../components/Cart/CheckoutPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/search",
    element: <Filtered />,
  },
  {
    path: "/detail/:id",
    element: <Detail />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "/cart/checkout",
    element: <CheckoutPage />,
  },
]);

export default router;
