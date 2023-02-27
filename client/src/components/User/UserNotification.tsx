import React, { useEffect, useState } from 'react'
import { deleteNotification, getNotification, getUserNotification } from '@/config/endpoints'
import Link from 'next/link';
import { Delete, DoneAll, NotificationsOff } from '@mui/icons-material';
import { GridCloseIcon } from '@mui/x-data-grid';
import Moment from 'react-moment';

function UserNotificationComponent({userId}:any) {
  const [notification, setNotification] = useState<any>([]);
  const [refresh, setRefresh] = useState(false)
  useEffect(() => {
    async function invoke(){
       const data = await getUserNotification(userId,{'usertoken':localStorage.getItem('usertoken')})
       setNotification(data?.notification)
    }
    invoke();
  }, [refresh])
  

  const deleteNotificationHandler = async(id:string)=> {
        const data = await deleteNotification(id)
        setRefresh(!refresh)
        console.log(data)
  }


  return (
    <div>
      {notification?.length==0 && (
        <div className='flex-row mt-20 justify-center items-center'>

     
        <div className='text-white text-center text-5xl font-medium'>Nothing to see here — yet</div>
        <div className='text-center mt-6 '>
        <NotificationsOff className='text-white text-7xl' />
        </div>
        </div>
      )}
      {
        notification && 
        notification.map((notif:any)=>(
          <div key={notif?._id}>
         
          <div className='text-gray-300  border flex border-gray-700 rounded cursor-pointer'>
            <Link href={`${notif?.href}`}>
          <div className='py-3 ml-6 text-lg'>  <DoneAll className='text-green-500' /><span className='ml-4'>{notif?.content}</span>
          <p className='text-sm pt pt-1 text-gray-300'><Moment fromNow>{notif?.createdAt}</Moment></p>
          </div>
          </Link>
          <div className='ml-auto mr-6 py-3 cursor-pointer font-semibold'><GridCloseIcon className='text-gray-500 cursor-grab' onClick={(e:any)=>{
             e.stopPropagation();
             deleteNotificationHandler(notif._id);
          }} /></div>
          </div>
          </div>
        ))
      }

      
        
    </div>
  )
}

export default UserNotificationComponent