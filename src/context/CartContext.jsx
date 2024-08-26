import { createContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const { get, set } = useLocalStorage();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const storedItems = get("cartItems");
    setItems(storedItems || []);
  }, [get]);

  const addItems = (e, book) => {
    e.stopPropagation();
    const existingItem = items.find((item) => item.id === book.id);
    let updatedItems;

    if (existingItem) {
      updatedItems = items.map((item) =>
        item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedItems = [...items, { ...book, quantity: 1 }];
    }

    setItems(updatedItems);
    set("cartItems", updatedItems);
  };

  const delItems = (e, id, removeAll = false) => {
    e.stopPropagation();
    let updatedItems;

    if (removeAll) {
      updatedItems = items.filter((item) => item.id !== id);
    } else {
      const existingItem = items.find((item) => item.id === id);
      if (existingItem && existingItem.quantity > 1) {
        updatedItems = items.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        updatedItems = items.filter((item) => item.id !== id);
      }
    }

    setItems(updatedItems);
    set("cartItems", updatedItems);
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
