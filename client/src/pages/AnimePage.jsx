import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useAuthContext } from '../context/authContext';
function AnimePage() {
  const { setLoading } = useAuthContext();
  const [anime, setAnime] = useState();
  const { animeSlug } = useParams();

  useEffect(() => {
    const getAnime = async () => {
      setLoading(() => true);
      try {
        const res = await axios.get(`http://localhost:3000/api/anime/${animeSlug}`, { withCredentials: true });
        setAnime(() => res?.data?.animeInfo);
      } catch (err) {
        console.error(err.message);
        setAnime(() => { });
      } finally {
        setLoading(() => false);
      }
    }

    getAnime();
  }, [animeSlug]);






  return (
    <>
      <header>
        <Navbar />
      </header>
      {anime ? (<main className="container mx-auto p-4">
        <h1 className="text-5xl">{anime.title}</h1>
        <div className="w-full my-4">
          <h2 className="text-xl font-semibold mb-4">Ratings</h2>
          <div className="w-full flex flex-col items-start justify-start gap-2">
            {anime.ratings.map((rating, index) => (
              <div key={index} className="w-full flex items-center gap-4">
                <h3 className="text-lg text-white w-8">{index + 1}</h3>
                <div className="h-10 bg-blue-600 rounded-sm relative" style={{ width: anime.totalRates === 0 ? "0" : `calc((${rating}/${anime.totalRates})*100%)` }}>
                  <h3 className="absolute top-1/2 left-4 -translate-y-1/2 text-lg text-white">{anime.totalRates === 0 ? "0" : `${(rating / anime.totalRates) * 100}%`}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main >) :
        (<main className="w-full h-screen grid place-items-center p-4">
          <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="font-semibold text-3xl lg:text-4xl">There is no such anime in our database!</h1>
            <NavLink to="/" className="px-4 py-2 rounded-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold cursor-pointer transition-all duration-300 ease-in-out">Move back to the home page</NavLink>
          </div>
        </main>)
      }

    </>
  )
}

export default AnimePage