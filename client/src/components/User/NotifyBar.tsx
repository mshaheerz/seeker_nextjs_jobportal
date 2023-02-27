import { AppContext } from "@/context/AppContext";
import { use, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function NotifyBar() {
  const [onlineUsers, setOnlineUsers] = useState([]);

  let companyDetails = useSelector((state: any) => state.companyinfo.value);
  const users = useSelector((state: any) => state.user.value);
  const {
    socket,
    sendNotification,
    recieveNotification,
    setRecieveNotification,
  }: any = useContext(AppContext);

  // useEffect(()=>{
    

  // },[])

  useEffect(() => {
    if(socket.current ==null){
      // socket.current = io("ws://localhost:8800");
      socket.emit("new-user-add", users?.userId);
    }

      socket.on("get-users", (userss:any) => {
        setOnlineUsers(userss);
        console.log('online users',onlineUsers);
      });

    }, [users]);

    useEffect(() => {
      if(socket.current==null){
        socket.emit("new-user-add", companyDetails?._id);
      }

        socket.on("get-users", (userss:any) => {
          setOnlineUsers(userss);
          console.log('online users',onlineUsers);
        });

      }, [companyDetails]);

  useEffect(() => {
    if (sendNotification !== null) {
      socket?.emit("send-notification", sendNotification);
    }
  }, [sendNotification]);

  useEffect(() => {
    socket.on("recieve-notification", (data: any) => {
      console.log("recieve-notification", data);
      setRecieveNotification(data);
    });
  }, []);

  useEffect(() => {
    console.log("notifcation arrived", recieveNotification);
    if (companyDetails?._id) {
      if (
        recieveNotification !== null &&
        recieveNotification?.recieverId === companyDetails?._id
      ) {
        //   setMessages([...messages, recieveMessage]);
        toast.success(`${recieveNotification?.notification}`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } else if (users?.userId) {
      if (
        recieveNotification !== null &&
        recieveNotification?.recieverId === users?.userId
      ) {
        //   setMessages([...messages, recieveMessage]);
        toast.success(`${recieveNotification?.notification}`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }
  }, [recieveNotification]);
  return (
    <div>
      {" "}
      <ToastContainer />
    </div>
  );
}

export default NotifyBar;
