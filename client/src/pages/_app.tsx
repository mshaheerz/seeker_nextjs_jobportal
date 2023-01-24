import '@/styles/globals.css'
import {SessionProvider} from 'next-auth/react'
import type { AppProps } from 'next/app'
import {Session} from 'next-auth'
import {configureStore} from '@reduxjs/toolkit'
import {Provider} from 'react-redux'
import  userReducer  from '@/redux/signupdetails'
import {store} from '@/redux/store'
import { AppContext } from '@/context/AppContext'
import { useState } from 'react'
export default function App({ Component, pageProps }: AppProps<{session:Session}>) {
  const [userDetails, setUserDetails]= useState({})
  return (
    <AppContext.Provider value={{
      userDetails:userDetails, setUserDetails:setUserDetails
    }}>
    <Provider store={store}>
<SessionProvider session={pageProps.session}>
  <Component {...pageProps} />
</SessionProvider>
</Provider>
</AppContext.Provider>
  );
}
