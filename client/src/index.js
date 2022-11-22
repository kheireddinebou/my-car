import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CurrentUserContextProvider } from "./context/currentUserContext/currentUserContext";
import { ShowAuthContextProvider } from "./context/showAuthContext/showAuthContext";
import { ShowEditContextProvider } from "./context/showEditContext copy/showEditContext ";
import { ShowSellContextProvider } from "./context/showSellContext/showSellContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ShowAuthContextProvider>
    <ShowSellContextProvider>
      <ShowEditContextProvider>
        <CurrentUserContextProvider>
          <App />
        </CurrentUserContextProvider>
      </ShowEditContextProvider>
    </ShowSellContextProvider>
  </ShowAuthContextProvider>
);
