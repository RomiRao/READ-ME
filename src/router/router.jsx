import { createBrowserRouter } from "react-router-dom";
import Filtered from "../components/Filtered";
import Home from "../components/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/Search",
    element: <Filtered />,
  },
]);

export default router;
