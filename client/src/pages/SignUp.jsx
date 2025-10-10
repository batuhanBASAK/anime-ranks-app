import React, { useRef, useState } from 'react'
import Navbar from "../components/Navbar"
import { NavLink } from "react-router-dom"
import Popup from '../components/Popup';
import axios from "axios";

function SignUp() {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const password2Ref = useRef();

  const [openPopup, setOpenPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const displayPopupMessage = (message) => {
    setPopupMessage(message);
    setOpenPopup(true);
  }

  const clearInputValues = () => {
    usernameRef.current.value = "";
    emailRef.current.value = "";
    passwordRef.current.value = "";
    password2Ref.current.value = "";
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const password2 = password2Ref.current.value;

    if (password !== password2) {
      displayPopupMessage("Warning: Passwords aren't matching!");
      clearInputValues();
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/auth/signup", { username, email, password });
      displayPopupMessage(res.data.message);
      clearInputValues();
    } catch (err) {
      displayPopupMessage(`Error: ${err.message}`);
      clearInputValues();
    }
  }
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main className="min-h-screen grid place-items-center">
        <form className="bg-neutral-900 text-white shadow-sm px-4 py-8 w-full md:w-xl" onSubmit={handleSubmit}>
          <h1 className="text-xl text-center uppercase tracking-wide mb-8">Sign Up</h1>
          <div className="flex flex-col w-full gap-6">
            <div className="flex flex-col w-full gap-2">
              <label className="font-bold text-sm" htmlFor="username">Username</label>
              <input ref={usernameRef} className="border rounded-sm px-2 py-1 w-full text-base" type="text" name="username" placeholder='Please enter your username here' />
            </div>
            <div className="flex flex-col w-full gap-2">
              <label className="font-bold text-sm" htmlFor="email">Email</label>
              <input ref={emailRef} className="border rounded-sm px-2 py-1 w-full text-base" type="email" name="email" placeholder='Please enter your email here' />
            </div>
            <div className="flex flex-col w-full gap-2">
              <label className="font-bold text-sm" htmlFor="password">Password</label>
              <input ref={passwordRef} className="border rounded-sm px-2 py-1 w-full text-base" type="password" name="password" placeholder='Please enter your password here' />
            </div>
            <div className="flex flex-col w-full gap-2">
              <label className="font-bold text-sm" htmlFor="password2">Password Again</label>
              <input ref={password2Ref} className="border rounded-sm px-2 py-1 w-full text-base" type="password" name="password2" placeholder='Please re-enter your password here' />
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
              <button className="px-4 py-2 rounded-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold cursor-pointer transition-all duration-300 ease-in-out" type="submit">Sign Up</button>
              <p className="text-sm">Do you have an account? <NavLink className="underline" to="/login">Login</NavLink> instead!</p>
            </div>
          </div>
        </form>
      </main>
      <Popup open={openPopup} setOpen={setOpenPopup}>
        {popupMessage}
      </Popup>
    </div >
  )
}

export default SignUp