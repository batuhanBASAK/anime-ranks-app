import React, { useRef } from 'react'
import Navbar from "../components/Navbar";
import axios from 'axios';


function AdminPage() {

  const titleRef = useRef();
  const slugRef = useRef();


  const addAnime = async (e) => {
    e.preventDefault();

    const title = titleRef.current.value;
    const slug = slugRef.current.value;

    try {
      await axios.post("http://localhost:3000/api/add-anime", { title, slug }, { withCredentials: true });
      alert("added successfully");
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      console.error(errorMessage);
    }
  };

  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main className="container mx-auto p-4">
        <h1 className="text-5xl">Admin page</h1>
        <form className="bg-neutral-900 text-white shadow-sm px-4 py-8 w-full md:w-xl" onSubmit={addAnime}>
          <h2 className="text-xl text-center uppercase tracking-wide mb-8">Add Anime</h2>
          <div className="flex flex-col w-full gap-6">
            <div className="flex flex-col w-full gap-2">
              <label className="font-bold text-sm" htmlFor="title">Title</label>
              <input ref={titleRef} className="border rounded-sm px-2 py-1 w-full text-base" type="text" name="title" placeholder='Please enter anime title here' />
            </div>
            <div className="flex flex-col w-full gap-2">
              <label className="font-bold text-sm" htmlFor="slug">Slug</label>
              <input ref={slugRef} className="border rounded-sm px-2 py-1 w-full text-base" type="text" name="title" placeholder='Please enter anime title here' />
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
              <button className="px-4 py-2 rounded-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold cursor-pointer transition-all duration-300 ease-in-out" type="submit">Submit</button>
            </div>
          </div>
        </form>






      </main>
    </div>
  )
}

export default AdminPage