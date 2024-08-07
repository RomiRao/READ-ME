import { useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  getDoc,
  doc,
} from "firebase/firestore";
import db from "../../firestore.config";

const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [spBook, setSpBook] = useState({});

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

  const detailBook = async (bookID) => {
    try {
      const book = doc(db, "books", `${bookID}`);
      const docSnap = await getDoc(book);
      setSpBook(docSnap.data());
    } catch (error) {
      console.error("Error al obtener datos de Firestore:", error);
    }
  };

  return { obtData, books, detailBook, spBook };
};

export default useBooks;
