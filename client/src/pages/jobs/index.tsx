import Feed from '@/components/User/Feed/Feed'
import Sidebar from '@/components/User/Layouts/Sidebar'
import axios from '@/config/axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {user} from '@/redux/signupdetails'
import { useRouter } from 'next/router'
function JobsPage() {


  let dispatch = useDispatch(user)
  let [userDetails, setUserDetails]= useState({})
const router = useRouter()
  useEffect(() => {
   if(localStorage.getItem('usertoken')){
      axios.get('/isUserAuth',{
        headers:{'usertoken':localStorage.getItem("usertoken")}
      }).then((response)=>{
        if(response.data.status==="failed"){
          router.push('/auth')
        }else if(response.data.auth){
          dispatch(user(response.data))
          setUserDetails({name:`${response.data.firstname} ${response.data.lastname}`,recentjob:response.data.recentjob})
          
        }else{
          router.push('/auth')
        }
      })
   }else{
    router.push('/auth')
   }
  
  }, [])

  return (
    <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
    {/* sidebar */}

    <Sidebar userDetails ={userDetails}/>
    {/* feed */}
    <Feed />

    
    {/* widgets */}

    {/* modal */}
  </main>
  )
}

export default JobsPage