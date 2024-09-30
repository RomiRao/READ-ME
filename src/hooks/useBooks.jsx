import {
  collection,
  getDocs,
  query,
  where,
  getDoc,
  doc,
  updateDoc,
  increment,
  orderBy,
  limit,
} from "firebase/firestore";
import db from "../../firestore.config";
import { useEffect, useState } from "react";

const useBooks = () => {
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [spBook, setSpBook] = useState({});
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [topSellingBooks, setTopSellingBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const booksCollection = collection(db, "books");
      const snapshot = await getDocs(booksCollection);
      const booksData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBooks(booksData);
      setFilteredBooks(booksData);

      const allGenres = booksData.flatMap((book) => book.genre);
      const uniqueGenres = [...new Set(allGenres)];
      setGenres(uniqueGenres);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
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
    getTopSellingBooks();
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
      if (!filterValue) {
        // If no filter value is provided, reset the filtered books to the original list
        setFilteredBooks(books);
        return;
      }

      let data = [];

      if (filterType === "genre") {
        const booksCollection = collection(db, "books");
        const q = query(
          booksCollection,
          where("genre", "array-contains", filterValue)
        );
        const querySnapshot = await getDocs(q);
        data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      } else if (filterType === "name") {
        const lowerCaseFilterValue = filterValue.toLowerCase();
        data = books.filter((book) =>
          book.name.toLowerCase().includes(lowerCaseFilterValue)
        );
      } else {
        // Reset to original list if an unknown filter type is provided
        data = books;
      }

      setFilteredBooks(data);
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
    fetchBooks, // Export the fetchBooks function
  };
};

export default useBooks;
