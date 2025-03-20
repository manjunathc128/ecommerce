import React, { createContext, useReducer, useContext } from "react";
import { reducer, initialState } from "./reducer";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [{ isLoggedIn, username, email }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        username,
        email,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
