import React from 'react'
import Navbar from '../components/Navbar'
import RankingList from '../components/RankingList'
import HeroSection from '../components/HeroSection'

function Home() {
  return (
    <>
      <header>
        <Navbar />
        <HeroSection />
      </header>
      <main className="container mx-auto my-4">
        <RankingList />
      </main>
    </>
  )
}

export default Home