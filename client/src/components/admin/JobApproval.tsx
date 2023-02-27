
import React, { useMemo, useState, useEffect} from "react";
import {Typography,Table,TableBody,TableCell,TableContainer,tableContainerClasses,TableHead,TableRow,Paper, TextField, Box, ThemeProvider } from "@mui/material";
import SearchBar from '@mkyy/mui-search-bar';
import { color } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import { getAllUserDetails,getNotApprovedJobs } from "@/config/companyendpoints";
import UserActions from "./UserActions";
import JobAction from "./JobAction";
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

function JobApproval() {

    const [jobs, setJobs] = useState<any>([])
    const [rowId, setRowId]=useState<any>(null)
    const [refresh,setRefresh] = useState<any>(false)
    useEffect(()=>{
        async function invoke(){
            const data = await getNotApprovedJobs({'admintoken':localStorage.getItem('admintoken')})
            console.log(data.jobs)
            setJobs(data.jobs)
        }
        invoke();
    },[refresh])
    const columns = useMemo(()=>[
        {field:'jobtitle',headerName:'Job Title',width:200},
        {field:'company',headerName:'company',width:170, renderCell: (params:any) => {
            return <div className="rowitem">{params.row.company.company}</div>;
          }},
        {field:'industry',headerName:'Industry',width:170,renderCell: (params:any) => {
            return <div className="rowitem">{params.row.company.industry}</div>;
          }},
        {field:'email',headerName:'Email',width:170,renderCell: (params:any) => {
            return <div className="rowitem">{params.row.company.email}</div>;
          }},
        {field:'phone',headerName:'Phone',width:150, renderCell: (params:any) => {
            return <div className="rowitem">{params.row.company.phone}</div>;
          }},
        {field:'approve',headerName:'Approve',width:100, type:'boolean', editable:true},
        {field:'actions',headerName:'Action',width:200, type:'action',
        renderCell:(params:any) => (<JobAction {...{params,rowId, setRowId,refresh,setRefresh}} />) },
      

        
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
      rows={jobs} 
      getRowId={(row)=>row?._id}
      getRowSpacing={params=>({
        top:params.isFirstVisible ? 0 : 5,
        bottom: params.isLastVisible ? 0 : 5


      })}
      onCellEditCommit={params=>setRowId(params.id)}
        />
   </Box>
   </ThemeProvider>
  )
}

export default JobApproval