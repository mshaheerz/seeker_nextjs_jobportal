import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import Feed from '@/components/User/Feed/Feed'
import Sidebar from '@/components/User/Layouts/Sidebar'
import useSWR from 'swr'
import axios from '@/config/axios'
import {useEffect, useRef, useState} from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { user } from '@/redux/signupdetails'
import Modal from '@/components/User/Feed/Modal'
import Widgets from '@/components/User/Feed/Widgets'
import BottomNavigationBar from '@/components/Company/Layouts/BottomNavigationBar'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { io } from "socket.io-client";
// const fetcher = async ()=>{
//   const response = await fetch('http://localhost:3000/api/hello')
//   const data = await response.json()
//   return data
//   }

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  let users = useSelector((state:any)=>state.user.value)
  const router = useRouter()
  let dispatch = useDispatch(user)
  let [userDetails, setUserDetails]= useState({})
//  const socket: any = useRef();

 
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
   if(localStorage.getItem('usertoken')){
      axios.get('/isUserAuth',{
        headers:{'usertoken':localStorage.getItem("usertoken")}
      }).then((response)=>{
        if(response.data.status==="failed"){
          router.push('/auth')
        }else if(!response.data.isBanned){
        if(response.data.auth){
          dispatch(user(response.data))
          console.log(response.data)
          setUserDetails({name:`${response.data.firstname} ${response.data.lastname}`,recentjob:response.data.recentjob})
          
        }else{
          router.push('/auth')
        }
        } else{
          localStorage.removeItem('usertoken')
          

          
        }
        
      })
   }else{
    router.push('/auth')
   }
  
  }, [])


  // useEffect(() => {
  //   if(socket.current ==null){
  //     socket.current = io("ws://localhost:8800");
  //     socket.current.emit("new-user-add", users?.userId);
  //   }
  
  //     socket.current.on("get-users", (userss:any) => {
  //       setOnlineUsers(userss);
  //       console.log('online users',onlineUsers);
  //     }); 
  
  //   }, [users]);
   

 
  









  // const {data, error}= useSWR('dashboard',fetcher)
  // console.log(data)
  // //data contain api data and error contain error while fetching
  // if(error) return 'an error has occured'
  // if(!data) return 'Loading'

  return (
    <>
      <Head>
        <title>Seeker</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
        {/* sidebar */}
        <ToastContainer />
        <Sidebar userDetails ={users}/>
        {/* feed */}
        <Feed />

        <Widgets />
        {/* widgets */}
        
        <Modal />
        {/* modal */}
       <BottomNavigationBar />
      </main>
      
     
    </>
  )
}
