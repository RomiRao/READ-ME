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
  const [filteredBooks, setFilteredBooks] = useState([]);

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
        setFilteredBooks(booksData); // Initialize filteredBooks with all books

        const allGenres = booksData.flatMap((book) => book.genre);
        const uniqueGenres = [...new Set(allGenres)];
        setGenres(uniqueGenres);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

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
        // Filter by genre in Firestore
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
        // Perform case-insensitive search for book names
        const lowerCaseFilterValue = filterValue.toLowerCase();
        const filtered = books.filter((book) =>
          book.name.toLowerCase().includes(lowerCaseFilterValue)
        );
        setFilteredBooks(filtered);
      } else {
        // Reset to all books if no filter
        setFilteredBooks(books);
      }
    } catch (error) {
      console.error("Error filtering books:", error);
    }
  };

  return { books: filteredBooks, detailBook, spBook, filterBooks, genres };
};

export default useBooks;
