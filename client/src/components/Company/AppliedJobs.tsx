import React, { useMemo, useState, useEffect } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  tableContainerClasses,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Box,
  ThemeProvider,
  Toolbar,
} from "@mui/material";
import SearchBar from "@mkyy/mui-search-bar";
import UserApprovalAction from "./UserApprovalAction"
import { color } from "@mui/system";
import { GridToolbar } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { createTheme } from "@mui/material/styles";
import { green } from "@mui/material/colors";
import {
  getAllUserDetails,
  getNotApprovedJobs,
  getAppliedJobs,
} from "@/config/companyendpoints";

import JobAction from "../admin/JobAction";
const theme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    body1: {
      color: "#fff",
    },
  },
});

function AppliedJobs() {
  const [jobs, setJobs] = useState([]);
  const [rowId, setRowId] = useState(null);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    async function invoke() {
      const data = await getAppliedJobs({
        companytoken: localStorage.getItem("companytoken"),
      });
      console.log(data);
      setJobs(data.jobs);
    }
    invoke();
  }, [refresh]);
  const columns = useMemo(
    () => [
      {
        field: "avatar",
        headerName: "Avatar",
        width: 100,
        renderCell: (params: any) => {
          return (
            <div>
              <img
                className="rounded-xl h-14"
                src={params?.row?.user?.image && params?.row?.user?.image}
                alt=""
              />
            </div>
          );
        },
      },
      {
        field: "firsrname",
        headerName: "name",
        width: 170,
        renderCell: (params: any) => {
          return <div className="rowitem">{params.row.user.firstname}</div>;
        },
      },
      {
        field: "lastname",
        headerName: "Lastname",
        width: 170,
        renderCell: (params: any) => {
          return <div className="rowitem">{params.row.user.lastname}</div>;
        },
      },
      {
        field: "email",
        headerName: "Email",
        width: 170,
        renderCell: (params: any) => {
          return <div className="rowitem">{params.row.user.email}</div>;
        },
      },
      {
        field: "phone",
        headerName: "Phone",
        width: 150,
        renderCell: (params: any) => {
          return <div className="rowitem">{params.row.user.phone}</div>;
        },
      },
      {
        field: "resume",
        headerName: "Resume",
        width: 150,
        renderCell: (params) => {
          return (
            <div className="rowitem">
              <a
                className="text-blue-500"
                href={params.row.user.resume}
                download
                target="_blank"
              >
                download
              </a>
            </div>
          );
        },
      },
      {
        field: "approve",
        headerName: "Approve",
        width: 100,
        type: "boolean",
        editable: true,
      },
      {
        field: "actions",
        headerName: "Action",
        width: 200,
        type: "action",
        renderCell: (params) => (
          <UserApprovalAction {...{ params, rowId, setRowId, refresh, setRefresh }} />
        ),
      },
    ],
    [rowId]
  );
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          mt: 3,
          color: "#fff",
          height: 500,
          width: "100%",
        }}
      >
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
          components={{Toolbar: GridToolbar}}
          rows={jobs}
          getRowId={(row) => row?._id}
          getRowSpacing={(params) => ({
            top: params.isFirstVisible ? 0 : 5,
            bottom: params.isLastVisible ? 0 : 5,
          })}
          onCellEditCommit={(params) => setRowId(params.id)}
        />
      </Box>
    </ThemeProvider>
  );
}

export default AppliedJobs;
