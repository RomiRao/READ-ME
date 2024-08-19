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
        const booksCollection = collection(db, "books");
        const snapshot = await getDocs(booksCollection);
        const booksData = snapshot.docs.map((doc) => doc.data());
        setBooks(booksData);

        const allGenres = booksData.flatMap((book) => book.genre);
        const uniqueGenres = [...new Set(allGenres)];
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

  const filterBooks = async (filterType, filterValue) => {
    try {
      const booksCollection = collection(db, "books");
      let q;

      if (filterType === "genre") {
        // Filtrar por género, que es un array en cada documento
        q = query(
          booksCollection,
          where("genre", "array-contains", filterValue)
        );

        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBooks(data);
      } else if (filterType === "name") {
        // Filtrar por nombre, insensible a mayúsculas/minúsculas, y que contenga el valor
        const snapshot = await getDocs(booksCollection);
        const data = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((book) =>
            book.name.toLowerCase().includes(filterValue.toLowerCase())
          );
        setBooks(data);
      } else {
        // Si no se especifica ningún filtro válido, trae todos los libros
        const querySnapshot = await getDocs(booksCollection);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBooks(data);
      }
    } catch (error) {
      console.error("Error al obtener datos de Firestore:", error);
    }
  };

  return { obtData, books, detailBook, spBook, filterBooks, genres };
};

export default useBooks;
