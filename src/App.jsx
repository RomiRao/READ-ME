import "./App.css";
import { Box } from "@mui/material";

import { RouterProvider } from "react-router-dom";
import router from "./router/router";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
