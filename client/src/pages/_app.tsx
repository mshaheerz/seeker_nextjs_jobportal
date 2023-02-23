import '@/styles/globals.css'
import {SessionProvider} from 'next-auth/react'
import type { AppProps } from 'next/app'
import {Session} from 'next-auth'
import {Provider} from 'react-redux'
import  userReducer  from '@/redux/signupdetails'
import {store} from '@/redux/store'

import { AppContext } from '@/context/AppContext'
import { useEffect, useRef, useState } from 'react'
import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress
import { io } from "socket.io-client";

//Binding events. 

export default function App({ Component, pageProps }: AppProps<{session:Session}>) {


  Router.events.on('routeChangeStart', () => NProgress.start()); Router.events.on('routeChangeComplete', () => NProgress.done()); Router.events.on('routeChangeError', () => NProgress.done());
  const [userDetails, setUserDetails]= useState({})
  const [postRefresh, setPostRefresh]= useState(false)
  const [companyDetails, setCompanyDetails]= useState({})
  const socket: any = useRef();
  // useEffect(() => {
  //   if(socket.current ==null){
  //    socket.current = io("ws://localhost:8800")
  //   }
  // }, [])
  

    

  return (
    <Provider store={store}>
    <AppContext.Provider value={{
      userDetails:userDetails,companyDetails,setCompanyDetails,socket:io("ws://localhost:8800"), setUserDetails:setUserDetails,postRefresh:postRefresh,setPostRefresh:setPostRefresh
    }}>
    
<SessionProvider session={pageProps.session}>
  <Component {...pageProps} />
</SessionProvider>

</AppContext.Provider>
</Provider>
  );
}
