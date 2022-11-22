import { createContext, useState } from "react";

export const ShowEditContext = createContext();

export const ShowEditContextProvider = ({ children }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [editedPost, setEditedPost] = useState(false);

  return (
    <ShowEditContext.Provider
      value={{
        showEdit,
        setShowEdit,
        editedPost,
        setEditedPost
      }}
    >
      {children}
    </ShowEditContext.Provider>
  );
};
