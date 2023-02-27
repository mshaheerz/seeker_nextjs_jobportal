import { Message, Search } from "@mui/icons-material"
import Image from "next/image";
import Trending from "../User/Feed/Widgets";
import { useEffect, useState } from "react";
import { SearchUser } from "@/config/endpoints";
import { useRouter } from "next/router";
import ChatContainer from "./ChatContainer";
import { useSelector } from "react-redux";

function ChatWidgets({chats,currentUser,setCurrentChat}:any) {
  const users = useSelector((state:any)=>state.user.value)
  const router = useRouter()
  const [user, setUser] = useState<any>([])
  const [searchContainer, setSearchContainer] = useState(false)
  const handleSearch = async (e:any)=>{
      const data = await SearchUser(e.target.value,{'usertoken':localStorage.getItem('usertoken')})
      setUser(data?.users)
  }

  return (
    <div className="hidden lg:inline ml-8 xl:w-[450px] py-1 space-y-5">
    <div className="sticky top-0 py-1.5 bg-black z-50 w-11/12 xl:w-9/12">
      <div className="flex items-center bg-[#202327] p-3 rounded-full relative">
        <Search className="text-gray-500 h-5 z-50" />
        <input
          onKeyUp={()=>setSearchContainer(true)}
          onFocus={()=>setSearchContainer(false)}
          type="text"
          className="bg-transparent placeholder-gray-500 outline-none text-[#d9d9d9] absolute inset-0 pl-11 border border-transparent w-full focus:border-[#1d9bf0] rounded-full focus:bg-black focus:shadow-lg"
          placeholder="Search"
          onChange={handleSearch}
        />
       
      </div> 
      {searchContainer &&
      <div className="bg-black   w-auto rounded  justify-center text-[#d9d9d9]">
        {
          user && user.map((user:any)=>
          <div key={user?._id} className="bg-[#202327] flex flex-shrink items-center rounded border-b border-spacing-1">
            <img src={user?.image} className="rounded-full object-cover" height={50} width={50} alt="" />
           <div className="font-semibold ml-2 cursor-pointer" onClick={()=>router.push(`/user/${user?._id}`)}> {user?.firstname} {user?.lastname}</div>
           <div className="ml-auto mr-3 cursor-pointer"><Message /></div>
          </div>
          )
        }
       
      </div> }
    </div>

    <div className="text-[#d9d9d9] space-y-3 bg-[#15181c] pt-2 rounded-xl w-11/12 xl:w-10/12">
      <h4 className="font-bold text-xl px-4">New chats</h4>
      {chats?.map((chat:any) => (
        <ChatContainer onClick={()=>{setCurrentChat(chat); console.log('hehe');
        }} key={chat?._id} setCurrentChat={setCurrentChat} chat={chat} currentUser={currentUser}/>

       ))} 
   
    </div>
  </div>
  )
}

export default ChatWidgets