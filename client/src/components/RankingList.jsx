import React, { useLayoutEffect, useState } from 'react'
// import { animeList } from '../animes'
import { FaStar } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function RankingList() {

  const navigate = useNavigate();
  const handleNavigation = (animeSlug) => {
    navigate(`/anime/${animeSlug}`);
  }

  const [animeList, setAnimeList] = useState([]);

  // get anime list from server
  useLayoutEffect(() => {
    const getAnimeList = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/animes/0/10");
        setAnimeList(() => res?.data?.animes);
      } catch (err) {
        console.error(err.message);
      }
    };

    getAnimeList();
  }, []);


  return (
    <article className="p-4">
      <h2 className="text-3xl lg:text-4xl my-16 text-start lg:text-center">Ranking</h2>
      {animeList.length > 0 ?
        (<ul>
          {animeList.map((anime, index) => (
            <li key={index} className="my-4">
              <button onClick={() => handleNavigation(anime.slug)} className="w-full min-h-16 border border-white border-collapse rounded-sm hover:shadow-white hover:shadow-xs flex flex-row items-center justify-between px-4 hover:bg-neutral-900 transition-all duration-150 ease-in-out cursor-pointer">
                <h3>{anime.rank}. {anime.title}</h3>
                <div className="flex items-center gap-[0.125rem]">
                  <p>Overall Rating:</p>
                  <p className="text-yellow-300">({anime.overallRating}/10)</p>
                  <FaStar className="text-yellow-300" />
                </div>
              </button>
            </li>
          ))}
        </ul>) :
        (<h3>There is no anime in the list right now!</h3>)

      }
    </article>
  )
}

export default RankingList