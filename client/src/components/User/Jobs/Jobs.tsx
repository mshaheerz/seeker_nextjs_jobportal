import { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useEffect, useState } from "react";
import Feed from "../Feed/Feed";
import Sidebar from "../Layouts/Sidebar";
import HeartIcon from "@heroicons/react/24/outline/HeartIcon";
import { getAllJobs,ApplyJob } from "@/config/endpoints";
import { useRouter } from "next/router";      
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
function Jobs() {
  const router = useRouter();
  const [jobs, setJobs] = useState([])
  useEffect(() =>{
    async function invoke(){
      const data = await getAllJobs({'usertoken':localStorage.getItem('usertoken')})
   
      if(data?.jobs){
      
        setJobs(data.jobs)
      }
    }
    invoke();
  },[])


  const handlepost = async (jobId:string,companyId:string)=>{
  console.log(jobId,companyId)
    const data = await ApplyJob(jobId,companyId,{'usertoken':localStorage.getItem('usertoken')})
    console.log(data)
    if(data.status=='success'){
      toast.success(`${data.message}`, {
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
      toast.error(`OOPS! ${data.message}`, {
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
  }
  return (
    <div className=" flex items-center justify-center">
      <ToastContainer />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 p-5 cursor-pointer">
      
      {jobs &&
        (
          jobs.map((job)=>(
          <div key={job._id} className="flex-shrink justify-center" onClick={()=>router.push(`/jobs/${job._id}`)}>
          <div className="block p-6 rounded-lg shadow-lg border-2 border-white  max-w-xl">
            <h5 className="text-gray-200 text-xl leading-tight font-medium mb-1">
              {job.jobtitle} 
            </h5>
            <p className="text-gray-400 ">{job.company.company}</p>
            <p className="text-gray-400 font-thin mb-2">{job.state} {job.city}</p>

            
            <div className="flex-shrink space-x-2 justify-start mb-4">
              {job?.jobtype &&
                job.jobtype.map((element: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined) => {
                 return (<span className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-[#2C2C32] text-white rounded">{element}</span>) 

                })
              }

              {
                job?.schedule && job.schedule.map(element=>(
                  <span className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-[#2C2C32] text-white rounded">{element}</span>
                ))
              }
             
            </div>


            <p className="text-gray-200 font-normal whitespace-pre-line  text-sm mb-4">
              {job?.jobdescription.substring(0 , 400)}...
            </p>
            <button
              type="button"
              className=" inline-block px-6 py-2.5 bg-white text-black font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              onClick={(e)=>{
                e.stopPropagation();
                handlepost(job._id,job.company._id)
              
              }}
            >
              Apply
            </button>
            
            <HeartIcon className="text-white h-7 inline-block ml-3 hover:text-pink-500 cursor-pointer"/>
          
          </div>
        </div>
          ))
          

   

        )
      }
       





      </div>
    </div>
  );
}

export default Jobs;
