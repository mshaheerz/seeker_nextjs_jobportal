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
import NotifyBar from '@/components/User/NotifyBar'
export default function App({ Component, pageProps }: AppProps<{session:Session}>) {


  Router.events.on('routeChangeStart', () => NProgress.start()); Router.events.on('routeChangeComplete', () => NProgress.done()); Router.events.on('routeChangeError', () => NProgress.done());
  const [userDetails, setUserDetails]= useState<any>({})
  const [postRefresh, setPostRefresh]= useState(false)
  const [companyDetails, setCompanyDetails]= useState<any>({})
  const [sendNotification, setSendNotification] = useState<any>(null)
  const [recieveNotification, setRecieveNotification] = useState<any>(null)
  const [socket,setSocket]= useState<any>(io("ws://localhost:8800"))
  
  // useEffect(() => {
  //   if(socket.current ==null){
  //    socket.current = io("ws://localhost:8800")
  //   }
  // }, [])
  

    

  return (
    <Provider store={store}>
    <AppContext.Provider value={
      {
      userDetails:userDetails,
      companyDetails,
      setCompanyDetails,
      socket:socket,
      setUserDetails:setUserDetails,
      postRefresh:postRefresh,
      setPostRefresh:setPostRefresh,
      sendNotification,
      setSendNotification,
      recieveNotification,
      setRecieveNotification
    }
    }>
    
<SessionProvider session={pageProps.session}>
  <Component {...pageProps} />
  <NotifyBar />
</SessionProvider>
</AppContext.Provider>
</Provider>
  );
}
