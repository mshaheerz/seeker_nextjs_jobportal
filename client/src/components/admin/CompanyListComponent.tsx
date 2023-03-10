
import React, { useMemo, useState, useEffect} from "react";
import {Typography,Table,TableBody,TableCell,TableContainer,tableContainerClasses,TableHead,TableRow,Paper, TextField, Box, ThemeProvider } from "@mui/material";
import SearchBar from '@mkyy/mui-search-bar';
import { color } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import { getAllUserDetails } from "@/config/companyendpoints";
import UserActions from "./UserActions";
import CompanyActions from "./CompanyAction";
import { getAllCompanyDetails } from "@/config/endpoints";
const theme = createTheme({
    palette:{
        mode: "dark",
    },
  typography: {
    body1: {
      color: '#fff'
    },
 
  }
});

 


function CompanyListComponent() {
    const [company, setCompany] = useState([])
    const [rowId, setRowId]=useState(null)
    useEffect(()=>{
        async function invoke(){
            const data = await getAllCompanyDetails({'admintoken':localStorage.getItem('admintoken')})
            console.log(data)
            setCompany(data.company)
        }
        invoke();
    },[])
    const columns = useMemo(()=>[
        {field:'image',headerName:'Avatar',width:60, renderCell:(params:any) => (<div><img src={params?.row?.image} alt="" /></div>)},
        {field:'company',headerName:'company',width:170},
        {field:'fullname',headerName:'owner',width:170},
        {field:'email',headerName:'Email',width:200},
        {field:'phone',headerName:'Phone',width:200},
        {field:'isBanned',headerName:'Banned',width:100, type:'boolean', editable:true},
        {field:'actions',headerName:'Action',width:200, type:'action',
        renderCell:(params:any) => (<CompanyActions {...{params,rowId, setRowId}} />) },
      

        
    ],[rowId])
      
  
  return (
    <ThemeProvider theme={theme}>
    <Box sx={{
        mt:3,
        color:'#fff',
        height:500,
        width:'100%',
        
    }}>
        {/* <Typography
        variant="h3"
        component='h3'
        sx={{textAlign: 'center', mt:3, mb:3}}
        >
    Manage Users
        </Typography> */}
    <DataGrid 
    
   
    sx={{
        boxShadow: 2,
        border: 1,
       
      }}  
      columns={columns} 
      rows={company} 
      getRowId={(row:any)=>row?._id}
      getRowSpacing={params=>({
        top:params.isFirstVisible ? 0 : 5,
        bottom: params.isLastVisible ? 0 : 5


      })}
      onCellEditCommit={(params:any)=>setRowId(params.id)}
        />
   </Box>
   </ThemeProvider>
  )
}

export default CompanyListComponent



