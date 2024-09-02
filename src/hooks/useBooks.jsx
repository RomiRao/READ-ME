import {
  collection,
  getDocs,
  query,
  where,
  getDoc,
  doc,
  updateDoc,
  increment,
  orderBy, // Importa orderBy para ordenar los libros por el atributo sold
  limit, // Importa limit para limitar el número de libros devueltos
} from "firebase/firestore";
import db from "../../firestore.config";
import { useEffect, useState } from "react";

const useBooks = () => {
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [spBook, setSpBook] = useState({});
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [topSellingBooks, setTopSellingBooks] = useState([]); // Nueva variable de estado

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksCollection = collection(db, "books");
        const snapshot = await getDocs(booksCollection);
        const booksData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBooks(booksData);
        setFilteredBooks(booksData); // Inicializa filteredBooks con todos los libros

        const allGenres = booksData.flatMap((book) => book.genre);
        const uniqueGenres = [...new Set(allGenres)];
        setGenres(uniqueGenres);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const getTopSellingBooks = async () => {
    try {
      const booksCollection = collection(db, "books");
      const q = query(booksCollection, orderBy("sold", "desc"), limit(8));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTopSellingBooks(data);
    } catch (error) {
      console.error("Error fetching top-selling books:", error);
    }
  };

  useEffect(() => {
    getTopSellingBooks(); // Llama a getTopSellingBooks para cargar los libros más vendidos al montar el componente
  }, []);

  const updateBooks = async (items) => {
    setLoading(true);
    try {
      await Promise.all(
        items.map((item) =>
          updateDoc(doc(db, "books", item.id), {
            sold: increment(item.quantity),
          })
        )
      );
    } catch (error) {
      console.error("Error updating documents:", error);
    } finally {
      setLoading(false);
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
      console.error("Error fetching book details:", error);
    }
  };

  const filterBooks = async (filterType, filterValue) => {
    try {
      if (filterType === "genre") {
        const booksCollection = collection(db, "books");
        const q = query(
          booksCollection,
          where("genre", "array-contains", filterValue)
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFilteredBooks(data);
      } else if (filterType === "name") {
        const lowerCaseFilterValue = filterValue.toLowerCase();
        const filtered = books.filter((book) =>
          book.name.toLowerCase().includes(lowerCaseFilterValue)
        );
        setFilteredBooks(filtered);
      } else {
        setFilteredBooks(books);
      }
    } catch (error) {
      console.error("Error filtering books:", error);
    }
  };

  return {
    books: filteredBooks,
    detailBook,
    spBook,
    filterBooks,
    genres,
    updateBooks,
    loading,
    topSellingBooks,
  };
};

export default useBooks;
