import { useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "../../firestore.config";

const useBooks = () => {
  const [books, setBooks] = useState([]);

  const obtData = async () => {
    const booksCollection = collection(db, "books");
    try {
      const query = await getDocs(booksCollection);
      const data = query.docs.map((doc) => doc.data());
      setBooks(data);
    } catch (error) {
      console.error("Error al obtener datos de Firestore:", error);
    }
  };

  return { obtData, books };
};

export default useBooks;
