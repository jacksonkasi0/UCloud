import {  useSession } from 'next-auth/react'
import { useEffect } from 'react';
import router from "next/router"

export default function Home() {
  
  const { data: session, status } = useSession();


useEffect(()=>{
  if (status === "authenticated" || session?.user?.email) {
    router.push("/app")
  }
},[router, status])  

  return (
    <>
      <img className="wow fadeInLeft mx-auto mt-[-30px]" src="/assets/images/cloud.png" height={350} width={350} data-wow-duration="2s" />

      <h1 className='flex flex-row flex-wrap gap-3.5 text-6xl text-indigo-600 justify-center mt-[-70px]' >
        <span className='wow animate__fadeInBottomLeft' data-wow-delay=".5s">Welcome</span>
        <span className='wow animate__fadeInBottomLeft' data-wow-delay="1s">to</span>
        <span className='wow animate__fadeInBottomLeft' data-wow-delay="1.3s">UCloud</span>
      </h1>

      <button className="wow fadeIn bg-indigo-500 hover:bg-indigo-600 text-white rounded px-3 py-2 block mx-auto my-7" data-wow-delay="1.8s">
        Get starded
      </button>

      <div className=" flex flex-grow" ></div>
    </>
  )
}
