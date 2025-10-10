import React, { useRef, useState } from 'react'
import Navbar from "../components/Navbar"
import { NavLink } from 'react-router-dom'
import Popup from '../components/Popup';
import axios from 'axios';
import { useAuthContext } from '../context/authContext';
import { usePopupContext } from '../context/popupContext';

function Login() {
  const { setAccessToken } = useAuthContext();
  const { setOpen } = usePopupContext();

  const emailRef = useRef();
  const passwordRef = useRef();


  const [popupTitle, setPopupTitle] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [popupButtonText, setPopupButtonText] = useState("");



  const popupHandler = () => {
    setOpen(() => false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const res = await axios.post("http://localhost:3000/auth/login", { email, password }, { withCredentials: true });
      setAccessToken(() => res.data.accessToken);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setPopupTitle(() => "Warning!");
      setPopupMessage(() => errorMessage);
      setPopupButtonText(() => "Close");
      setOpen(() => true);

    }
  }


  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main className="min-h-screen grid place-items-center">
        <form className="bg-neutral-900 text-white shadow-sm px-4 py-8 w-full md:w-xl" onSubmit={handleSubmit}>
          <h1 className="text-xl text-center uppercase tracking-wide mb-8">Login</h1>
          <div className="flex flex-col w-full gap-6">
            <div className="flex flex-col w-full gap-2">
              <label className="font-bold text-sm" htmlFor="email">Email</label>
              <input ref={emailRef} className="border rounded-sm px-2 py-1 w-full text-base" type="email" name="email" placeholder='Please enter your email here' />
            </div>
            <div className="flex flex-col w-full gap-2">
              <label className="font-bold text-sm" htmlFor="password">Password</label>
              <input ref={passwordRef} className="border rounded-sm px-2 py-1 w-full text-base" type="password" name="password" placeholder='Please enter your password here' />
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
              <button className="px-4 py-2 rounded-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold cursor-pointer transition-all duration-300 ease-in-out" type="submit">Login</button>
              <p className="text-sm">Don't you have an account? <NavLink className="underline" to="/signup">Sign Up</NavLink> instead!</p>
            </div>
          </div>
        </form>
      </main>
      <Popup>
        <Popup.Title>{popupTitle}</Popup.Title>
        <Popup.Content>{popupMessage}</Popup.Content>
        <Popup.Button onClick={popupHandler}>{popupButtonText}</Popup.Button>
      </Popup>
    </div>
  )
}

export default Login