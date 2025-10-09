import React from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { animeList } from '../animes';
import Navbar from '../components/Navbar';
function AnimePage() {
  const { animeID } = useParams();
  const anime = animeList.find(a => a.id === animeID);
  return (
    <>
      <header>
        <Navbar />
      </header>
      {anime ? (<main className="container mx-auto p-4">
        <h1 className="text-5xl">{anime.title}</h1>




      </main>) :
        (<main className="w-full h-screen grid place-items-center p-4">
          <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="font-semibold text-3xl lg:text-4xl">There is no such anime in our database!</h1>
            <NavLink to="/" className="px-4 py-2 rounded-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold cursor-pointer transition-all duration-300 ease-in-out">Move back to the home page</NavLink>
          </div>
        </main>)}

    </>
  )
}

export default AnimePage