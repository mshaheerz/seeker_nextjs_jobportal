import Feed from "@/components/User/Feed/Feed";
import Sidebar from "@/components/User/Layouts/Sidebar";
import axios from "@/config/axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { user } from "@/redux/signupdetails";
import { useRouter } from "next/router";
import Head from "next/head";
import { BriefcaseIcon, InboxIcon } from "@heroicons/react/24/solid";
import Jobs from "@/components/User/Jobs/Jobs";
import { Logout } from "@mui/icons-material";
import swal from "sweetalert";
import BottomNavigationBar from "@/components/Company/Layouts/BottomNavigationBar";
import Widgets from "@/components/User/Feed/Widgets";
import UserProfile from "@/components/User/UserProfile";
import { AppContext } from "@/context/AppContext";
import { useContext } from "react";
import { getProfilePosts } from "@/config/endpoints";
import Posts from "@/components/User/Feed/Posts";
import UserInfos from "@/components/User/UserInfos";
import ChatWidgets from "@/components/Chat/ChatWidget";
import { UserChats } from "@/config/endpoints";
import ChatBox from "@/components/Chat/ChatBox";
import { io } from "socket.io-client";
function ChatPage() {
  let dispatch = useDispatch();
  //user
  const [chats, setchats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [recieveMessage, setRecieveMessage] = useState(null);
  const { setPostRefresh, postRefresh }: any = useContext(AppContext);
  // const socket: any = useRef();
  
  const users = useSelector((state: any) => state.user.value);
  const router = useRouter();
  const {socket}:any = useContext(AppContext)

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
          } else {
            router.push("/auth");
          }
        });
    } else {
      router.push("/auth");
    }
  }, []);





  useEffect(() => {
    socket.emit("new-user-add", users?.userId);
    socket.on("get-users", (userss:any) => {
      setOnlineUsers(userss);
      console.log('online users',onlineUsers);
    }); 

  }, [users]);

  //send message to socket server

  useEffect(() => {
    if (sendMessage !== null) {
      socket?.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  //receive message from socket server

  useEffect(() => {
    socket.on("recieve-message", (data: any) => {
        console.log('recieve message',data)
      setRecieveMessage(data);
    });
  }, []);

  useEffect(() => {
    const getChats = async () => {
      try {
        const data = await UserChats(users?.userId);
        console.log(data);
        setchats(data?.chat);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [users]);

  const logout = () => {
    swal({
      title: "Are you sure?",
      // background: "black",
      text: "Once logout, you need to add credentials when login",
      icon: "warning",
      buttons: ["cancel","ok"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        localStorage.removeItem("usertoken");
        router.push("/auth");
      }
    });
  };
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
              <InboxIcon
                onClick={() => router.back()}
                className="h-7 text-white"
              />
            </div>
            Messages
            <div className="hoverAnimation w-9 h-9 flex item-center justify-center xl:px-0 ml-auto">
              <Logout className="h-5 text-white" onClick={logout} />
            </div>
          </div>
          
          <div className="mt-5 text-white">
            <ChatBox
              recieveMessage={recieveMessage}
              setSendMessage={setSendMessage}
              chat={currentChat}
              currentUser={users?._id}
            />
          </div>
        </div>

        {/* feed */}

        {/* widgets */}
        <ChatWidgets
          setCurrentChat={setCurrentChat}
          chats={chats}
          currentUser={users?.userId}
        />

        {/* modal */}
        <BottomNavigationBar />
      </main>
    </div>
  );
}

export default ChatPage;
