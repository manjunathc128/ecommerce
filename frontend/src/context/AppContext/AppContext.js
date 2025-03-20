import React, { createContext, useReducer, useContext, useEffect } from "react";
import { reducer, initialState } from "./reducer";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [
    { products, cart, category, search, cartVisible, isLoggedIn },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch("https://ecommerce-s1b5.onrender.com/api/products", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch({ type: "SET_PRODUCTS", payload: data });
      });
  }, []);

  return (
    <AppContext.Provider
      value={{
        products,
        cart,
        category,
        search,
        cartVisible,
        isLoggedIn,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
