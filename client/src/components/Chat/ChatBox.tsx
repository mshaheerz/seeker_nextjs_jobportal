import { GetChatUsers, addMessages, getMessages } from "@/config/endpoints";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import style from "@/styles/Home.module.css";
import Moment from "react-moment";
function ChatBox({ chat, currentUser, setSendMessage, recieveMessage }: any) {
  const [userData, setUserData] = useState(null);
  const users = useSelector((state: any) => state.user.value);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [refresh, setRefresh] = useState(false);
  const scroll = useRef()



  useEffect(() => {
    const userId = chat?.members?.find((id: any) => id !== users?.userId);
    const invoke = async () => {
      const data = await GetChatUsers(userId);
      setUserData(data?.user);
    };

    if (chat !== null) invoke();
  }, [chat, currentUser]);

  useEffect(() => {
    const fetchmessages = async () => {
      const data = await getMessages(chat._id);
      setMessages(data);
    };
    if (chat !== null) fetchmessages();
  }, [chat]);

  const handleSend = async (e: any) => {
    e.preventDefault();

    const message = {
      senderId: users?.userId,
      text: newMessage,
      chatId: chat?._id,
    };

        const recieverId = chat.members.find((id:any) => id !== users?.userId);
            //send ,message to socket server
        console.log(message)
        setSendMessage({ ...message, recieverId });
    // send ,message to database
    try {
      const data = await addMessages(message);
      setMessages([...messages, data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }


    
  
    };

    useEffect(() => {
        console.log('message arrived', recieveMessage)
        if (recieveMessage !== null && recieveMessage?.chatId === chat?._id) {
          setMessages([...messages, recieveMessage]);
     
        }
      }, [recieveMessage]);


      //always scroll to last message
        useEffect(()=>{
           scroll.current?.scrollIntoView({behavior: "smooth"})
        }, [messages])


  return (
    <div>
    {
      !userData && (
        <div className="text-center text-lg">Click chat to send</div>
      )
    }
      {
        userData && (
          <div className={style.ChatBoxcontainer}>
        <>
          <div className={style.chatheader}>
            <div className="follower text-white">
              <div className="flex">
                <img src={userData?.image} className="rounded-full" alt="" width={50} height={50} />
                <div className="name " style={{ fontSize: "0.8rem" }}>
                  <span className="text-base mt-5">
                    {userData?.firstname} {userData?.lastname}
                    {userData?.company}
                  </span>
                </div>
              </div>
            </div>
           <div className="border border-gray-700"></div>
          </div>

          {/* chat box messages */}

          <div className={`${style.chatbody} no-scrollbar`}>
            {messages.map((message) => (
     
                <div
                  ref={scroll}
                  key={message?._id}
                  className={
                    message?.senderId === users?.userId
                      ? `${style.message} ${style.own} mt-5`
                      : `${style.message} ${style.sender}`
                  }
                >
                  <span>{message?.text}</span>
                  <span>
                    <Moment fromNow>{message?.createdAt}</Moment>
                  </span>
                </div>
            
            ))}
          </div>
          {/* chat sender */}
          <div className={`${style.chatsender} border rounded`}>
            <div className="text-black">+</div>

            <input
              type="text"
              onChange={(e: any) => setNewMessage(e.target.value)}
              className="text-white border border-white  bg-black"
              placeholder="type a message"
            />
            <div>
              <button
              type="submit"
                className="bg-white text-black rounded px-4 text-bold"
                onClick={handleSend}
              >
                send
              </button>
            </div>
          </div>
        </>
      </div>
        )
      }
    </div>
  );
}

export default ChatBox;
