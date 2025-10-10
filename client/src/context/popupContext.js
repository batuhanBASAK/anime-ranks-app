import React, { createContext, useContext } from "react";

export const PopupContext = createContext({});

export function usePopupContext() {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error("usePopupContext should be used in Popup");
  }
  return context;
}
