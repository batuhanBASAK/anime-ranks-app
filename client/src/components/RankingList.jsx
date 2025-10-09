import React from 'react'
import { animeList } from '../animes'
import { FaStar } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { useLayoutEffect } from 'react';
function RankingList() {

  useLayoutEffect(() => {

  }, []);


  const navigate = useNavigate();
  const handleNavigation = (animeID) => {
    navigate(`/anime/${animeID}`);
  }


  return (
    <article className="p-4">
      <h2 className="text-3xl lg:text-4xl my-16 text-start lg:text-center">Ranking</h2>
      <ul>
        {animeList.map((anime, index) => (
          <li key={index} className="my-4">
            <button onClick={() => handleNavigation(anime.id)} className="w-full min-h-16 border border-white border-collapse rounded-sm hover:shadow-white hover:shadow-xs flex flex-row items-center justify-between px-4 hover:bg-neutral-900 transition-all duration-150 ease-in-out cursor-pointer">
              <h3>{anime.rank}. {anime.title}</h3>
              <div className="flex items-center gap-[0.125rem]">
                <p>Overall Rating:</p>
                <p className="text-yellow-300">({anime.overallRating}/10)</p>
                <FaStar className="text-yellow-300" />
              </div>
            </button>
          </li>
        ))}
      </ul>
    </article>
  )
}

export default RankingList