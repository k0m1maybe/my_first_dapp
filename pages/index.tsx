import type { NextPage } from 'next'
import Head from 'next/head'
import { useMoralis } from 'react-moralis'
import Header from '../conponents/Header'


const Home: NextPage = () => {
  const { isAuthenticated, authenticate, user, logout, isLoggingOut} = useMoralis()
  if (!isAuthenticated) {
    return (<>
      <Head>
        <title>Login | Dashboard3</title>
      </Head>
      <>
        <p>Dashboard</p>
        <button onClick={() => authenticate({
          signingMessage: "Login with Metamask"
        })}>Login with Metamask</button>
      </>
    </>)
  }
  return (
    <>
      <Header user={user!} logout={logout!} isLoggingOut={isLoggingOut!}></Header>
    </>
  )
}

export default Home
