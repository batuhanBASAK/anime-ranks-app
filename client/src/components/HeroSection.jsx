import React from 'react'

function HeroSection() {
  const styles = {
    backgroundImage: 'url("src/assets/Gemini_Generated_Image_lbbrhrlbbrhrlbbr.png")',
  };
  return (
    <section className="h-96 w-full relative before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-black before:opacity-50 before:z-0 bg-cover bg-no-repeat bg-center" style={styles}>
      <div className="w-full h-full  flex flex-col items-start justify-center lg:items-center gap-4 px-4">
        <h1 className="z-10 text-4xl lg:text-5xl font-extrabold tracking-wide capitalize">Your online Anime Ranking & Rating Platform!</h1>
        <p className="z-10 font-semibold text-base lg:text-xl">You can rate animes and review the ranking to find your next anime to watch!</p>
      </div>
    </section>
  )
}

export default HeroSection
