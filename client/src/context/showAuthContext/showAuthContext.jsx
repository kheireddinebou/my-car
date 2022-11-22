import { createContext, useState } from "react";

export const ShowAuthContext = createContext();

export const ShowAuthContextProvider = ({ children }) => {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <ShowAuthContext.Provider
      value={{
        showLogin,
        showRegister,
        setShowRegister,
        setShowLogin,
      }}
    >
      {children}
    </ShowAuthContext.Provider>
  );
};
