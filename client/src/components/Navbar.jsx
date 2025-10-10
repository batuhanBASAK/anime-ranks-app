import React, { createContext, useContext, useState } from 'react'

import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/authContext';
import logoImage from '../assets/Gemini_Generated_Image_p3fpd0p3fpd0p3fp.png';

import axios from "axios";

const NavbarContext = createContext(null);

function useNavbarContext() {
  const context = useContext(NavbarContext);
  if (!context)
    throw new Error("useNavbarContext must be used within NavbarContext.Provider");
  return context;
}



function NavbarButton({ children, to, styles }) {
  const navigate = useNavigate();
  const { open, setOpen } = useNavbarContext();
  const handleNavigation = (e) => {
    e.preventDefault();

    if (open) {
      setOpen(false);
    }

    navigate(to);
  }

  return <button onClick={handleNavigation} className={styles}>{children}</button>
}


function Navbar() {
  const navigate = useNavigate();
  const { user, setAccessToken } = useAuthContext();

  const [open, setOpen] = useState(false);
  const toggle = () => {
    setOpen(prev => !prev);
  }

  const handleLogOut = async () => {
    try {
      await axios.post("http://localhost:3000/auth/logout", {}, { withCredentials: true });
      setAccessToken(null);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }

  const styles = `z-100 bg-neutral-900 transition-all duration-300 ease-in-out flex flex-col lg:flex-row items-center justify-center gap-4 fixed lg:static top-16 ${open ? "right-0 opacity-100 visible" : "-right-full opacity-0 lg:opacity-100 invisible lg:visible"} h-[calc(100vh-4rem)] lg:h-auto w-screen lg:w-auto`;
  return (
    <NavbarContext.Provider value={{ open, setOpen }}>
      <nav className="bg-neutral-900 h-16 w-full p-6">
        <div className="container mx-auto h-full">
          <div className="h-full flex items-center justify-between gap-4">
            <NavbarButton styles="font-semibold tracking-wide text-white hover:text-neutral-100 transition-all duration-300 ease-in-out cursor-pointer flex items-center justify-center gap-2" to="/">
              <img src={logoImage} alt="logo image" className="w-8 h-8 rounded-full" />
              <span>AnimeRanks</span>
            </NavbarButton>

            {user?.username ?
              (
                <ul className={styles}>
                  <li><NavbarButton styles="font-semibold tracking-wide text-white hover:text-neutral-100 transition-all duration-300 ease-in-out cursor-pointer relative before:absolute before:top-full before:left-0 before:h-1 before:bg-neutral-100 before:w-0 hover:before:w-full before:transition-all before:duration-300 before:ease-in-out" to="/userpage">{user.username}</NavbarButton></li>
                  <li><button onClick={handleLogOut} className="font-semibold tracking-wide text-white hover:text-neutral-100 transition-all duration-300 ease-in-out cursor-pointer relative before:absolute before:top-full before:left-0 before:h-1 before:bg-neutral-100 before:w-0 hover:before:w-full before:transition-all before:duration-300 before:ease-in-out" >Log Out</button></li>
                </ul>
              ) :
              (
                <ul className={styles}>
                  <li><NavbarButton styles="font-semibold tracking-wide text-white hover:text-neutral-100 transition-all duration-300 ease-in-out cursor-pointer relative before:absolute before:top-full before:left-0 before:h-1 before:bg-neutral-100 before:w-0 hover:before:w-full before:transition-all before:duration-300 before:ease-in-out" to="/login">Log In</NavbarButton></li>
                  <li><NavbarButton styles="font-semibold tracking-wide text-white hover:text-neutral-100 transition-all duration-300 ease-in-out cursor-pointer relative before:absolute before:top-full before:left-0 before:h-1 before:bg-neutral-100 before:w-0 hover:before:w-full before:transition-all before:duration-300 before:ease-in-out" to="/signup">Sign Up</NavbarButton></li>
                </ul>
              )
            }

            <button onClick={toggle} className="cursor-pointer lg:hidden p-2 rounded-sm hover:bg-neutral-800 transition-all duration-300 ease-in-out">
              <GiHamburgerMenu />
            </button>
          </div>
        </div>
      </nav>
    </NavbarContext.Provider >
  )
}

export default Navbar