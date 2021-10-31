import React from 'react'
import { useSelector } from 'react-redux'
import CompressUrl from '../components/compressUrl'
import SignIn from './signIn'

function Home() {
  const authentication = useSelector(state => state.authentication)

  return (
    <div>
      {
        !authentication.valid ? <SignIn /> : <CompressUrl />
      }
    </div>
  )
}

export default Home
