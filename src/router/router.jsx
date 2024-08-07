import { createBrowserRouter } from "react-router-dom";
import Filtered from "../components/Filtered";
import Home from "../components/Home/Home";
import Detail from "../components/Detail";

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
]);

export default router;
