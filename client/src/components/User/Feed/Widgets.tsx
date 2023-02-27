import { Message, Search } from "@mui/icons-material"
import Image from "next/image";
import Trending from "./Trending";
import { useState } from "react";
import { SearchUser } from "@/config/endpoints";
import { useRouter } from "next/router";


function Widgets() {
  const router = useRouter()
  const [user, setUser] = useState([])
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
          <div key={user._id} className="bg-[#202327] flex flex-shrink items-center rounded border-b border-spacing-1">
            <img src={user?.image} className="rounded-full object-cover" height={50} width={50} alt="" />
           <div className="font-semibold ml-2 cursor-pointer" onClick={()=>router.push(`/user/${user?._id}`)}> {user?.firstname} {user?.lastname}</div>
           <div className="ml-auto mr-3 cursor-pointer"><Message /></div>
          </div>
          )
        }
       
      </div> }
    </div>

    <div className="text-[#d9d9d9] space-y-3 bg-[#15181c] pt-2 rounded-xl w-11/12 xl:w-9/12">
      <h4 className="font-bold text-xl px-4">Are you a Employer ?</h4>
      {/* {trendingResults.map((result, index) => (
       
      ))} */}
       <Trending   />
   
    </div>

    <div className="text-[#d9d9d9] space-y-3 bg-[#15181c] pt-2 rounded-xl w-11/12 xl:w-9/12">
      <h4 className="font-bold text-xl px-4">New chats</h4>
      {/* {followResults.map((result, index) => ( */}
        <div
          className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-2 cursor-pointer transition duration-200 ease-out flex items-center"
          
        >
          <Image
            src={'/images/some.jpg'}
            width={50}
            height={50}
            // objectFit="cover"
            className="rounded-full object-cover" alt={""}          />
          <div className="ml-4 leading-5 group">
            <h4 className="font-bold group-hover:underline">
              result.username
            </h4>
            <h5 className="text-gray-500 text-[15px]">result.tag</h5>
          </div>
          <button className="ml-auto bg-white text-black rounded-full font-bold text-sm py-1.5 px-3.5">
            chat
          </button>
        </div>
      {/* ))} */}
      <button className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-3 cursor-pointer transition duration-200 ease-out flex items-center justify-between w-full text-[#1d9bf0] font-light">
        Show more
      </button>
    </div>
  </div>
  )
}

export default Widgets