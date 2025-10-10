import React from 'react';
import Navbar from "../components/Navbar";
import { useAuthContext } from '../context/authContext';
// import axios from "axios";

function UserPage() {
  const { user } = useAuthContext();



  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="container mx-auto p-4">
        <h1 className="text-5xl">{user.username}</h1>
        {/* <button className="px-4 py-2 rounded-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold cursor-pointer transition-all duration-300 ease-in-out" onClick={fetchUser}>
          Fetch User
        </button> */}
      </main>
    </>
  )
}

export default UserPage