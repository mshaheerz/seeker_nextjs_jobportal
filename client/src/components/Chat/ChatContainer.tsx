import React, { useEffect, useState } from 'react'
import Image from "next/image";
import { getOneUserNoAuth,GetChatUsers } from '@/config/endpoints';
import { useSelector } from 'react-redux';
function ChatContainer({chat,currentUser,setCurrentChat}:any) {
    const [userData, setUserData] = useState<any>(null)
   const users = useSelector((state:any)=>state.user.value)
    useEffect(()=> {

        const userId = chat?.members.find((id:any)=>id!==users?.userId)
        const invoke= async()=>{
        const data = await GetChatUsers(userId)
        console.log(data)
        setUserData(data?.user)
        console.log(data)

        }

        invoke();
    },[])
  return (
    <div
          className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-2 cursor-pointer transition duration-200 ease-out flex items-center">
          <img
            src={userData?.image? userData.image :''  }
            width={50}
            height={50}
            // objectFit="cover"
            className="rounded-full object-cover" alt={""}          />
          <div className="ml-4 leading-5 group">
            <h4 className="font-bold group-hover:underline">
            {userData?.firstname? userData?.firstname : userData?.company} {userData?.lastname}
            </h4>
            <h5 className="text-gray-500 text-[15px]">{userData?.recentjob? userData?.recentjob : userData?.industry} </h5>
          </div>
          <button onClick={()=>setCurrentChat(chat)} className="ml-auto bg-white text-black rounded-full font-bold text-sm py-1.5 px-3.5">
            chat
          </button>
    </div>

  )
}

export default ChatContainer