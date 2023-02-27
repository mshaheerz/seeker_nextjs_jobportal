import swal from "sweetalert";
import LogoutIcon from '@mui/icons-material/Logout';
import Input from "./Input"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "@/config/axios";
import Posts from "./Posts";
import { AppContext } from "@/context/AppContext";
import {useContext} from 'react'


function Feed() {
  const router = useRouter();
  const [posts, setPosts]  =useState([])
  const {setPostRefresh,postRefresh}:any = useContext(AppContext)
  
  useEffect(() => {
    axios.post('/getposts',{},{headers:{"usertoken":localStorage.getItem("usertoken")}}).then((response)=>{
      setPosts(response.data.posts)
   
    }).catch((error:any) => {alert(error.message)});
    
    
 
  }, [postRefresh])
  

  const logout=()=>{
    swal({
      title: "Are you sure?",
      text: "Once logout, you need to add credentials when login",
      icon: "warning",
      buttons: ['cancel', 'Ok'],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        localStorage.removeItem('usertoken')
        router.push('/auth')
      } 
    });
  }



  return (
    <div className="text-white flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px]">
        <div className="text-[#d9d9d9] flex items-center sm:justify-between py-2 px-3 sticky top-0 z-50 bg-black border-b border-gray-700">
            <h2 className="text-lg sm:text-xl font-bold">Home</h2>
            <div className="hoverAnimation w-9 h-9 flex item-center justify-center xl:px-0 ml-auto">
                <LogoutIcon className="h-5 text-white" onClick={logout}/>
            </div>
        </div>
        <Input />
        <div className="pb-72">
    {posts && posts.map((post:any)=> <Posts key={post._id} id={post._id} post={post} />
    
)}
        </div>
    </div>
  )
}

//  export const getServerSideProps = ()=> {


//   return {
//     props:{

//     }
//   }
// }

export default Feed