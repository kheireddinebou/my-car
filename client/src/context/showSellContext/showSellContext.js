import { createContext, useState } from "react";

export const ShowSellContext = createContext();

export const ShowSellContextProvider = ({ children }) => {
  const [showSellForm, setShowSellForm] = useState(false);

  return (
    <ShowSellContext.Provider
      value={{
        showSellForm,
        setShowSellForm,
      }}
    >
      {children}
    </ShowSellContext.Provider>
  );
};
