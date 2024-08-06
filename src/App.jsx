import { useState, useEffect } from "react";

import "./App.css";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar";
import Filtered from "./components/Filtered";
import { Box } from "@mui/material";

//firestore config
import { collection, getDocs } from "firebase/firestore";
import db from "../firestore.config";

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const obtData = async () => {
      const projectsCollection = collection(db, "books");
      try {
        const query = await getDocs(projectsCollection);
        const data = query.docs.map((doc) => doc.data());
        setBooks(data);
      } catch (error) {
        console.error("Error al obtener datos de Firestore:", error);
      }
    };

    obtData();
  }, []);

  return (
    <>
      <Navbar />
      <Box paddingY={5} paddingX={10}>
        {/* <Home /> */}
        <Filtered books={books} />
      </Box>
    </>
  );
}

export default App;
