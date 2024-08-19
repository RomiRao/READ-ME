import "./App.css";
import CartContextProvider from "./context/CartContext";

import { RouterProvider } from "react-router-dom";
import router from "./router/router";

function App() {
  return (
    <CartContextProvider>
      <RouterProvider router={router} />
    </CartContextProvider>
  );
}

export default App;
