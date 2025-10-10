import React from "react";
import { usePopupContext } from "../context/popupContext";


function PopupButton({ children, onClick }) {
  return (
    <button className="px-4 py-2 rounded-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold cursor-pointer transition-all duration-300 ease-in-out" onClick={onClick}>{children}</button>
  )
}

function PopupTitle({ children, styles, as = "p" }) {
  return (
    React.createElement(as, { className: `text-3xl ${styles}` }, children)
  )
}

function PopupContent({ children }) {
  return <p className="text-lg">{children}</p>
}


function Popup({ children }) {
  const { open } = usePopupContext();

  return (
    open ?
      (<div className="fixed z-[110] top-0 left-0 w-screen h-screen bg-neutral-950/90 grid place-items-center" >
        <div className="bg-neutral-800 w-full max-w-3xl min-h-36 rounded-sm flex flex-col items-center justify-center gap-4 p-8">
          {children}
        </div>
      </div>) : (<></>)

  )
}

Popup.Button = PopupButton;
Popup.Title = PopupTitle;
Popup.Content = PopupContent;


export default Popup;