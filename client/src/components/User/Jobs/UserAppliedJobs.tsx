import { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useEffect, useState } from "react";
import Feed from "../Feed/Feed";
import Sidebar from "../Layouts/Sidebar";
import HeartIcon from "@heroicons/react/24/outline/HeartIcon";
import { getAllJobs,ApplyJob, getUserApplydJob } from "@/config/endpoints";
import { useRouter } from "next/router";      
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import JobContainer from "@/components/Company/JobContainer";

function Jobs() {
  const router = useRouter();
  const [refresh , setRefresh]= useState(false)
  const [jobs, setJobs] = useState([])
  useEffect(() =>{
    async function invoke(){

       const data = await getUserApplydJob({'usertoken':localStorage.getItem('usertoken')})
        console.log(data)
      if(data?.jobs){
        setJobs(data.jobs)
      }
      
      
    }
    invoke();
  },[refresh])



  return (
    <div className=" flex items-center justify-center">
        {
          jobs.length==0 && (
            <div>
            <div className="text-white text-center text-3xl mt-5">Your not applied any jobs</div>
            <div className=" text-center mt-3  ">
              <a onClick={()=>router.push('/jobs')} className=" bg-white font-bold px-4 py-1 rounded cursor-pointer hover:bg-blue-400 hover:text-white">Apply now</a>
            </div>
            </div>
          )
        }
      <ToastContainer />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 p-5 cursor-pointer">
      
      
      {jobs &&
        
          jobs.map((job:any)=>(<JobContainer key={job?._id} job={job?.job} jobs={job} applied={true} refresh={refresh} setRefresh={setRefresh} />)
          

   

        )
      }
       





      </div>
    </div>
  );
}

export default Jobs;
