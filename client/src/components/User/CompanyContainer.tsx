import { useEffect ,useState} from 'react'
import HeartIcon from "@heroicons/react/24/outline/HeartIcon";
import { useRouter } from 'next/router';
import { ApplyJob, getOneApplydJob } from '@/config/endpoints';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
function CompanyContainer({company,refresh,setRefresh,}:any) {
    const [applyd, setApplyd] = useState(false)
    const [applydetails, setApplyDetails]= useState([])
    const router = useRouter();
    // useEffect(() =>{
    //     async function invoke(){
    //       const data = await getOneApplydJob(job._id,{'usertoken':localStorage.getItem('usertoken')})
    //         console.log(data)
    //       if(data?.status==='success'){
        
    //         setApplyd(true)
    //       }
    //     }
    //     invoke();
    //   },[refresh])

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
    <div key={company._id} className="flex-auto justify-center" onClick={()=>router.push(`/companies/${company._id}`)}>
           <ToastContainer />
   

           <div className="max-w-sm p-6  border border-gray-200 rounded-lg shadow bg-black dark:border-gray-700">
    <svg className="w-10 h-10 mb-2 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z" clip-rule="evenodd"></path><path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z"></path></svg>
    <a href="#">
        <h5 className=" text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{company?.company}</h5>
        <p className='text-gray-300 mb-2 font-thin'>{company?.industry}</p>
    </a>
    <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">{company?.description?.substring(0,90)}</p>
    <a href="#" className="inline-flex gap-2 items-center text-blue-600 hover:underline">
    <span className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-[#2C2C32] text-white rounded">something</span>
    <span className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-[#2C2C32] text-white rounded">something</span>
    </a>
</div>


  </div>
  )
}

export default CompanyContainer