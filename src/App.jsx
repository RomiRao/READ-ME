import { useState } from "react";

import "./App.css";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar";
import Filtered from "./components/Filtered";
import { Box } from "@mui/material";

function App() {
  return (
    <>
      <Navbar />
      <Box paddingY={5} paddingX={10}>
        {/* <Home /> */}
        <Filtered />
      </Box>
    </>
  );
}

export default App;
