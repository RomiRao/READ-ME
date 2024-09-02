import { createContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const { get, set } = useLocalStorage();
  const [items, setItems] = useState([]);
  const [shipping, setShipping] = useState("Standard Delivery - $5");

  // Clear the cart by resetting items
  const clearCart = () => {
    setItems([]);
    set("cartItems", []); // Clear cart items from local storage as well
  };

  // Calculate total price of items
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Extract shipping cost from the selected shipping option
  const shippingCost = parseInt(shipping.split("$")[1]);

  // Calculate the grand total
  const grandTotal = totalPrice + shippingCost;

  // Load items from local storage when component mounts
  useEffect(() => {
    const storedItems = get("cartItems");
    setItems(storedItems || []);
  }, []); // The empty dependency array ensures this only runs once on mount

  // Function to add items to the cart
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

      set("cartItems", updatedItems); // Update local storage
      return updatedItems;
    });
  };

  // Function to remove items from the cart
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

      set("cartItems", updatedItems); // Update local storage
      return updatedItems;
    });
  };

  // Function to check if an item is in the cart
  const isItems = (id) => {
    return items.some((item) => item.id === id);
  };

  const data = {
    items,
    addItems,
    delItems,
    isItems,
    shipping,
    setShipping,
    grandTotal,
    totalPrice,
    shippingCost,
    clearCart, // Expose clearCart in the context data
  };

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
};

export default CartContextProvider;
