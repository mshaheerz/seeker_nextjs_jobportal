import { GetChatUsers } from "@/config/endpoints"
import { useEffect, useState } from "react"
import OneChat from "./OneChat"


function ChatList({companyDetails,chats,setCurrentChat}:any) {
  
    
  return (
    <div className="bg-[#15181c] grid-5 w-[30%]  h-screen rounded">
     <div className="text-white">
     <div className="text-[#d9d9d9] space-y-3 bg-[#15181c] pt-2 rounded-xl w-11/12 xl:w-12/12">
      <h4 className="font-bold text-xl px-4">New chats</h4>
      {
        
        chats?.map((chat:any)=>
           <OneChat key={chat?._id} setCurrentChat={setCurrentChat} chat={chat} companyDetails={companyDetails} onClick={()=>setCurrentChat(chat)} /> 
        )
      }
      
      </div>
     </div>
    </div>
  )
}

export default ChatList