import { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useEffect, useState } from "react";
import Feed from "../Feed/Feed";
import Sidebar from "../Layouts/Sidebar";
import HeartIcon from "@heroicons/react/24/outline/HeartIcon";
import { getAllJobs,ApplyJob, getUserApplydJob } from "@/config/endpoints";
import { useRouter } from "next/router";      
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import JobContainer from "@/components/Company/JobContainer";
import {jobs} from "@/redux/jobs";
import { useDispatch, useSelector } from "react-redux";
function JobsComponent() {

  let job = useSelector((state:any)=>state.jobs.value)
  let dispatch = useDispatch()
  //jobs
  const router = useRouter();
  const [refresh , setRefresh]= useState(false)
  // const [jobs, setJobs] = useState([])
  useEffect(() =>{
    async function invoke(){

     
      const data = await getAllJobs({'usertoken':localStorage.getItem('usertoken')})
      if(data?.jobs){
        dispatch(jobs(data.jobs))
        // setJobs(data.jobs)
      }
     
      
    }
    invoke();
  },[refresh])



  return (
    <div className=" flex items-center justify-center">
      <ToastContainer />
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 p-5 cursor-pointer">
      
      {job &&
        
          job.map((job:any)=>(<JobContainer key={job?._id} job={job} applied={false} refresh={refresh} setRefresh={setRefresh} />)
        
        )
      }
      </div>
    </div>
  );
}

export default JobsComponent;
