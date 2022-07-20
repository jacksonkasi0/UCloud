import React from 'react'
import Link from 'next/link'

const About = () => {
  return (
    <div className='mx-5 my-2 h-full flex flex-grow flex-col'>
      <div className='flex h-full mx-auto sm:m-0 flex-col  sm:flex-row-reverse  sm:justify-around justify-center items-center gap-2' >

        <Link href="https://github.com/jacksonkasi0" >
          <a target="_blank" rel="noopener noreferrer">
            <img src="https://avatars.githubusercontent.com/u/68270206?v=4" alt="jackson kasi" className='rounded-full w-full  max-w-[288px] h-full max-h-72 mx-auto sm:ml-auto mb-8  shadow-lg  shadow-indigo-500/50' />
          </a>
        </Link>

        <div >
          <h3 className='text-xl flex ' >HI THERE

            <span >
              <img src="https://cdn.joypixels.com/products/previews/O6D7BMG8R2DMMNC4LLZH/2411_HZWARHWk0TImR0UBwvuHRUXPorcBwWs1.gif" alt=" hi " className='w-10 h-10 -mt-3' />
            </span>

            I'M</h3>
          <h1 className='text-6xl cursor-pointer font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-fuchsia-500 break-words my-3 w-fit'>
            <Link href="https://github.com/jacksonkasi0" >
              <a target="_blank" rel="noopener noreferrer">
                Jackson Kasi
              </a>
            </Link>
          </h1>

          <h2 className='text-3xl font-semibold mb-2'>FULLSTACK DEVELOPER 👨‍💻</h2>
          <p className='text-xl mb-5'>
            I'm a professional Fullstack Developer.
            <br />
            Completed school, but no college. But I'm learner until death 🔥
          </p>

          <button className='px-4 py-3  mb-3 rounded-lg bg-violet-600 hover:bg-violet-700 active:bg-violet-900           
          focus:outline-none focus:ring focus:ring-violet-300 text-xl text-white  '>
            Hire Me
          </button>
        </div>
      </div>
    </div>
  )
}

export default About