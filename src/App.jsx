import "./App.css";
import Navbar from "./components/Navbar";
import { Box } from "@mui/material";

import { RouterProvider } from "react-router-dom";
import router from "./router/router";

function App() {
  return (
    <>
      <Navbar />
      <Box paddingY={5} paddingX={10}>
        <RouterProvider router={router} />
      </Box>
    </>
  );
}

export default App;
