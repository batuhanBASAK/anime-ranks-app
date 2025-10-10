import React from "react";


function Popup({ children, open, setOpen }) {
  const togglePopup = () => {
    setOpen(prev => !prev);
  }

  return (
    open ?
      (<div className="fixed z-[110] top-0 left-0 w-screen h-screen bg-neutral-950/90 grid place-items-center" >
        <div className="bg-neutral-800 w-full max-w-3xl min-h-36 rounded-sm flex flex-col items-center justify-center gap-4 p-8">
          <p className="text-lg">{children}</p>
          <button className="px-4 py-2 rounded-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold cursor-pointer transition-all duration-300 ease-in-out" onClick={togglePopup}>Close</button>
        </div>
      </div >) : (<></>)
  )
}


export default Popup;