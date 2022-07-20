import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useSession } from 'next-auth/react'
import router from 'next/router'
import GoogleDriveAuth from '../../components/GooglrDriveAuth';

const App = () => {

  const { loading, error, userData } = useSelector((state) => state.userData)

  const { data: session, status } = useSession();
  const [newName, setName] = useState("");

  useEffect(() => {
    if (status === "unauthenticated" || !session?.user.email || (userData !== null && userData !== undefined)) {
      router.push("/")
    }
    else{
      console.log(session);
    }
  }, [status])

  return (
    <div>
      <p>Enter a Name : {session?.user?.name}</p>
      <br />
      <GoogleDriveAuth />
    </div>
  )
};

export default App;