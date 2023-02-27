import { AnyAction } from "redux";
import { useContext, useState } from "react";
import { Box, CircularProgress, Fab } from "@mui/material";
import { Check, Save } from "@mui/icons-material";
import { flagUser } from "@/config/companyendpoints";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { approveUser } from "@/config/companyendpoints";
import { Notify } from "@/config/endpoints";
import { AppContext } from "@/context/AppContext";
import { useSelector } from "react-redux";

function JobApprovalAction({ params, rowId, setRowId, refresh, setRefresh }: any) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const {
    sendNotification,setSendNotification
  }: any = useContext(AppContext);
  
  let companyDetails = useSelector((state:any)=>state.companyinfo.value)
  const handleSubmit = async () => {
    setLoading(true);

    const { approve, _id,user} = params.row;
    console.log(approve);
    const data = await approveUser(approve, _id, {
      companytoken: localStorage.getItem("companytoken"),
    });
    if (data.status === "success") {
      const notification = await Notify({
        authorCompany:companyDetails?._id,
        recieverUser:user?._id,
        content:`${companyDetails?.company} is approved your job request`,
        href:'/jobs/appliedjobs'
      })
      setSendNotification({recieverId:user?._id,notification:`${companyDetails?.company} is approved your job request`})

      toast.success(`job status successfully updated`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
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
    setRefresh(!refresh);
    setLoading(false);
  };
  return (
    <Box
      component="form"
      sx={{
        m: 1,
        position: "relative",
      }}
    >
      <ToastContainer />

      {success ? (
        <Fab
          sx={{
            width: 40,
            height: 40,
            color: "#ffff",
            bgcolor: "#ffff",
            "&:hover": { bgcolor: "#0000" },
          }}
        >
          <Check />
        </Fab>
      ) : (
        <Fab
          sx={{
            width: 40,
            height: 40,
            bgcolor: "#ffff",
            color: "#ffff",
            "&:hover": { bgcolor: "green" },
          }}
          disabled={params.id !== rowId || loading}
          onClick={handleSubmit}
        >
          <Save />
        </Fab>
      )}
      {loading && (
        <CircularProgress
          size={52}
          sx={{
            color: "#fff",
            position: "absolute",
            top: -6,
            left: -6,
            zIndex: 1,
          }}
        />
      )}
    </Box>
  );
}

export default JobApprovalAction;
