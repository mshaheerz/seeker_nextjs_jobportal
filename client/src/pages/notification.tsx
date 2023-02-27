import Feed from "@/components/User/Feed/Feed";
import Sidebar from "@/components/User/Layouts/Sidebar";
import axios from "@/config/axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { user } from "@/redux/signupdetails";
import { useRouter } from "next/router";
import Head from "next/head";
import { BriefcaseIcon } from "@heroicons/react/24/solid";
import Jobs from "@/components/User/Jobs/Jobs";
import { Logout } from "@mui/icons-material";
import swal from "sweetalert";
import BottomNavigationBar from "@/components/Company/Layouts/BottomNavigationBar";
import Widgets from "@/components/User/Feed/Widgets";
import JobSearchComponent from "@/components/User/Jobs/JobSearchComponent";
import NotificationComponent from "@/components/Company/NotificationComponent";
import UserNotificationComponent from "@/components/User/UserNotification";

function Notificationpage() {
  let dispatch = useDispatch();
  //user
  let [userDetails, setUserDetails] = useState({});
  const router = useRouter();
  const users = useSelector((state:any)=>state.user.value)
  useEffect(() => {
    if (localStorage.getItem("usertoken")) {
      axios
        .get("/isUserAuth", {
          headers: { usertoken: localStorage.getItem("usertoken") },
        })
        .then((response) => {
          if (response.data.status === "failed") {
            router.push("/auth");
          } else if (response.data.auth) {
            dispatch(user(response.data));
            setUserDetails({
              name: `${response.data.firstname} ${response.data.lastname}`,
              recentjob: response.data.recentjob,
            });
          } else {
            router.push("/auth");
          }
        });
    } else {
      router.push("/auth");
    }
  }, []);


  const logout=()=>{
    swal({
      title: "Are you sure?",
      text: "Once logout, you need to add credentials when login",
      icon: "warning",
      buttons: ["cancel","ok"],
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
    <div className="">
      <Head>
        <title></title>
      </Head>

      <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
        {/* sidebar */}

        <Sidebar userDetails={users} />
        <div className="flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px]">
          <div className="flex item-center px-1.5 py-2 border-b border-r border-gray-700 text-[#d9d9d9] font-semibold text-xl gap-x-4 sticky top-0 z-50 bg-black">
            <div className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0">
              <BriefcaseIcon
                onClick={() => router.back()}
                className="h-7 text-white"
              />
            </div>
            Jobs
            <div className="hoverAnimation w-9 h-9 flex item-center justify-center xl:px-0 ml-auto">
                <Logout className="h-5 text-white" onClick={logout}/>
            </div>

          </div>
         
       
          <div className="pb-72">
         <UserNotificationComponent userId={users?.userId} />
          </div>
        </div>

        {/* feed */}

        {/* widgets */}
        <Widgets />

        {/* modal */}
        <BottomNavigationBar />
      </main>
    </div>
  );
}

export default Notificationpage;
