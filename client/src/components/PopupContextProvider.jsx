import React, { useState } from "react";
import { PopupContext } from "../context/popupContext";

export default function PopupContextProvider({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <PopupContext.Provider value={{ open, setOpen }}>
      {children}
    </PopupContext.Provider>
  )
}