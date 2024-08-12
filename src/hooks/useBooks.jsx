import { useState, useEffect } from "react";
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
  const [genres, setGenres] = useState([]);
  const [spBook, setSpBook] = useState({});

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksCollection = collection(db, "books"); // Usa db para la colección
        const snapshot = await getDocs(booksCollection);
        const booksData = snapshot.docs.map((doc) => doc.data());
        setBooks(booksData);

        // Extraer géneros únicos
        const allGenres = booksData.flatMap((book) => book.genre);
        const uniqueGenres = [...new Set(allGenres)]; // Elimina duplicados
        setGenres(uniqueGenres);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const obtData = async () => {
    try {
      const booksCollection = collection(db, "books");
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

  return { obtData, books, detailBook, spBook, filterBooks, genres };
};

export default useBooks;
