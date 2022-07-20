import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useDispatch } from "react-redux"
import { useSession } from "next-auth/react"
import { signIn, signOut } from 'next-auth/react'
import { loadUser } from '../../redux/actions/userAction';

const Navbar = () => {

  const router = useRouter();
  const dispatch = useDispatch();

  const { data: session, status } = useSession();
  const user = session?.user;

  const [active, setActive] = useState(false)

  useEffect(() => {
    if (session !== undefined) {
      dispatch(loadUser(user?.email, user));
    }
  }, [router])

  const handleClick = () => {
    setActive(!active)
  }

  const handleSignIn = () => {
    signIn("google", { callbackUrl: "/app" })
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: `${window.location.origin}` })
  }

  return (
    <>

      <nav className='  bg-white p-3 border-slate-200 border-b fixed inset-x-0'>
        <div className='max-w-6xl flex items-center flex-wrap' >
          <Link href='/' >
            <a className='items-center inline-flex p-2 mr-4' >
              <svg
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
                className='fill-current text-indigo-600 h-8 w-8 mr-2'
              >
                <path d='M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z' />
              </svg>
              <span className='text-xl text-indigo-600 font-bold tracking-wide' >
                UCloud
              </span>
            </a>
          </Link>

          <button className='inline-flex p-3 hover:bg-slate-100  text-indigo-600 hover:text-indigo-600  rounded-lg lg:hidden text-indigo-600 ml-auto outline-none' onClick={handleClick}>
            <svg
              className='w-6 h-6'
              fill='none'

              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 6h16M4 12h16M4 18h16'
              />
            </svg>
          </button>

          <div className={`${active ? "text-center" : "hidden"} w-full lg:inline-flex lg:flex-grow lg:w-auto`}>
            <div className='lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center item-start flex flex-col lg:h-auto' >
              <Link href='/' >
                <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-indigo-600  font-bold items-center justify-center hover:bg-slate-100  hover:text-indigo-600' onClick={handleClick} >
                  Home
                </a>
              </Link>
              <Link href='/service' >
                <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-indigo-600 font-bold items-center justify-center hover:bg-slate-100  hover:text-indigo-600' onClick={handleClick}>
                  Services
                </a>
              </Link>
              <Link href='/about' >
                <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-indigo-600 font-bold items-center justify-center hover:bg-slate-100  hover:text-indigo-600' onClick={handleClick}>
                  About us
                </a>
              </Link>
              <Link href='/'>
                <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-indigo-600 font-bold items-center justify-center hover:bg-slate-100  hover:text-indigo-600' onClick={handleClick}>
                  {
                    status === "authenticated" ?
                      (<span onClick={handleSignOut}>Sign out</span>)
                      :
                      (<span onClick={handleSignIn}>Sign in</span>)
                  }
                </a>
              </Link>
            </div>
          </div>
        </div>

      </nav>
      <br />
      <br />
      <br />
    </>
  )
}

export default Navbar

export const getServerSideProps = async (context) => {
  const providers = await getProviders();
  return {
    props: { providers }
  }
}