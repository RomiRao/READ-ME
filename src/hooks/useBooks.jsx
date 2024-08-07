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
      const querySnapshot = await getDocs(booksCollection);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBooks(data);
    } catch (error) {
      console.error("Error al obtener datos de Firestore:", error);
    }
  };

  const detailBook = async (bookID) => {
    try {
      const bookRef = doc(db, "books", bookID);
      const docSnap = await getDoc(bookRef);
      if (docSnap.exists()) {
        setSpBook({
          id: docSnap.id,
          ...docSnap.data(),
        });
      } else {
        console.error("No such document!");
      }
    } catch (error) {
      console.error("Error al obtener datos de Firestore:", error);
    }
  };

  const filterBooks = async (filter) => {
    try {
      const booksCollection = collection(db, "books");
      const q = query(
        booksCollection,
        where("genre", "array-contains", filter)
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBooks(data);
    } catch (error) {
      console.error("Error al obtener datos de Firestore:", error);
    }
  };

  return { obtData, books, detailBook, spBook, filterBooks };
};

export default useBooks;
