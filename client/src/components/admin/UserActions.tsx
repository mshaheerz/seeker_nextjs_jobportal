import { AnyAction } from "redux"
import { useState } from "react"
import { Box, CircularProgress, Fab } from "@mui/material"
import { Check, Save } from "@mui/icons-material"
import { flagUser } from "@/config/companyendpoints"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
function UserActions({params, rowId, setRowId}:any) {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const handleSubmit = async () =>{
        setLoading(true)
      
        const {isBanned,_id} = params.row
        console.log(isBanned,_id)
         const data = await flagUser(isBanned,_id,{'admintoken':localStorage.getItem('admintoken')})
         if(data.status==='success'){
            toast.success(`user status successfully updated`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
         }else{
            toast.error(`OOPS! ${data?.message}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
         }
        setLoading(false)
    }
  return (
    <Box component="form"
    sx={{
        m:1,
        position:'relative',
    }}
    >
         <ToastContainer />

        {success ? (
            <Fab sx={{
                width:40,
                height:40,
                color:'#ffff',
                bgcolor:'#ffff',
                '&:hover':{bgcolor:'#0000'} ,
                
            }}
           
            >
                <Check/>
            </Fab>
        ):(
            <Fab sx={{
                width:40,
                height:40,
                bgcolor:'#ffff',
                color:'#ffff',
                '&:hover':{bgcolor:'green'}
             
            }}
            
            disabled={params.id !== rowId || loading}
            onClick={handleSubmit}
            >
                
                <Save/>
            </Fab >
        )}
        {loading && (
            <CircularProgress 
            size={52}
            sx={{
               color:"#fff", 
               position:'absolute',
               top:-6,
               left:-6,
               zIndex:1


            }}
            

            />
        )}


    </Box>
    
  )
}

export default UserActions