import { createContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const { get, set } = useLocalStorage();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const storedItems = get("cartItems");
    setItems(storedItems || []);
  }, []);

  const addItems = (e, book) => {
    e.stopPropagation();
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === book.id);
      const updatedItems = existingItem
        ? prevItems.map((item) =>
            item.id === book.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prevItems, { ...book, quantity: 1 }];

      set("cartItems", updatedItems);
      return updatedItems;
    });
  };

  const delItems = (e, id, removeAll = false) => {
    e.stopPropagation();
    setItems((prevItems) => {
      let updatedItems;
      if (removeAll) {
        updatedItems = prevItems.filter((item) => item.id !== id);
      } else {
        updatedItems = prevItems.map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
            : item
        );
      }

      set("cartItems", updatedItems);
      return updatedItems;
    });
  };

  const isItems = (id) => {
    return items.some((item) => item.id === id);
  };

  const data = {
    items,
    addItems,
    delItems,
    isItems,
  };

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
};

export default CartContextProvider;
