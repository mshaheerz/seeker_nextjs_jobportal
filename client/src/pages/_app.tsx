import '@/styles/globals.css'
import {SessionProvider} from 'next-auth/react'
import type { AppProps } from 'next/app'
import {Session} from 'next-auth'
import {Provider} from 'react-redux'
import  userReducer  from '@/redux/signupdetails'
import {store} from '@/redux/store'

import { AppContext } from '@/context/AppContext'
import { useState } from 'react'

export default function App({ Component, pageProps }: AppProps<{session:Session}>) {
  const [userDetails, setUserDetails]= useState({})
  return (
    <Provider store={store}>
    <AppContext.Provider value={{
      userDetails:userDetails, setUserDetails:setUserDetails
    }}>
    
<SessionProvider session={pageProps.session}>
  <Component {...pageProps} />
</SessionProvider>

</AppContext.Provider>
</Provider>
  );
}
