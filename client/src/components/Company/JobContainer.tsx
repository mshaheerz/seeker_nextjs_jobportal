import { useEffect ,useState} from 'react'
import HeartIcon from "@heroicons/react/24/outline/HeartIcon";
import { useRouter } from 'next/router';
import { ApplyJob, getOneApplydJob } from '@/config/endpoints';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
function JobContainer({job,refresh,setRefresh,applied,jobs}:any) {
    const [applyd, setApplyd] = useState(false)
    const [applydetails, setApplyDetails]= useState([])
    const router = useRouter();
    useEffect(() =>{
        async function invoke(){
          const data = await getOneApplydJob(job._id,{'usertoken':localStorage.getItem('usertoken')})
            console.log(data)
          if(data?.status==='success'){
        
            setApplyd(true)
          }
        }
        invoke();
      },[refresh])

      const handlepost = async (jobId:string,companyId:string)=>{
        console.log(jobId,companyId)
          const data = await ApplyJob(jobId,companyId,{'usertoken':localStorage.getItem('usertoken')})
          console.log(data)
          if(data.status=='success'){
            setRefresh(!refresh)
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
    <div key={job._id} className="flex-shrink justify-center" onClick={()=>router.push(`/jobs/${job._id}`)}>
           <ToastContainer />
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


      <p className="text-gray-200 font-normal whitespace-pre-line  text-sm mb-1">
        {job?.jobdescription.substring(0 , 400)}...
      </p>  
      {
        applied && (
            <div className='mb-3 text-white'>
               
                
                <p className='font-semibold'>status: <span className={`${!jobs.status ? 'text-yellow-400' : 'text-green-500'}`}> {jobs.status} </span></p>
           </div>
        )
    }
      {
        !applyd?(<button
        type="button"
        className=" inline-block px-6 py-2.5 bg-white text-black font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        onClick={(e)=>{
          e.stopPropagation();
          handlepost(job._id,job.company._id)
        
        }}
      >
        Apply
      </button>):(<button
        type="button"
        className=" inline-block px-6 py-2.5 bg-gray-600 text-black font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        onClick={(e)=>{
          e.stopPropagation();
          handlepost(job._id,job.company._id)
        
        }}
        disabled={true}
      >
        Applied
      </button>)
      }
      
      
      <HeartIcon className="text-white h-7 inline-block ml-3 hover:text-pink-500 cursor-pointer"/>
  
    </div>
  </div>
  )
}

export default JobContainer