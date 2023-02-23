import React, { useEffect, useState } from 'react'
import { getNotification } from '@/config/endpoints'
import Link from 'next/link';
import { DoneAll } from '@mui/icons-material';

function NotificationComponent({companyId}:any) {
  const [notification, setNotification] = useState([]);
  useEffect(() => {
    async function invoke(){
       const data = await getNotification(companyId,{'companytoken':localStorage.getItem('companytoken')})
       setNotification(data?.notification)
    }
    invoke();
  
  
  }, [])
  
  return (
    <div>
      {!notification && (
        <div className='text-white text-center'>you have no notifications</div>
      )}
      {
        notification && 
        notification.map((notif)=>(
          <div>
         
          <div className='text-gray-300  border flex border-gray-700 rounded cursor-pointer'>
            <Link href={`${notif?.href}`}>
             
        
               

          <div className='py-3 ml-6 text-lg'>  <DoneAll className='text-green-500' /><span className='ml-4'>{notif?.content}</span></div>
          </Link>
          <div className='ml-auto mr-6 py-3 cursor-pointer font-semibold'>X</div>
          </div>
          </div>
        ))
      }
        
    </div>
  )
}

export default NotificationComponent