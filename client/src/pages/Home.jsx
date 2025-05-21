import React from 'react'
import homeGif from '../assets/homeGif.gif'
function Home() {
  return (
    <>
      
       <div className="flex flex-col md:flex-row items-center justify-between p-6 md:p-10 rounded-2xl max-w-6xl mx-auto mt-8">
  {/* Text Section */}
  <div className="md:w-1/2 mb-8 md:mb-0 text-center md:text-left">
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
      Why Buy,When you can Borrow?
    </h2>
    <p className="mt-4 text-lg sm:text-xl md:text-2xl text-secondary font-medium">
      Rent tools around you – smarter, cheaper, faster!
    </p>
  </div>

  {/* GIF Section */}
  <div className="md:w-1/2 flex justify-center">
    <img
      src={homeGif}
      alt="Tool Sharing Animation"
      className="w-[85%] max-w-md h-auto rounded-xl "
    />
  </div>
</div>

    </>
  )
}

export default Home
