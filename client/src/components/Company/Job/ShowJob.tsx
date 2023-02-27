import { useRouter } from "next/router";
import {
  EllipsisHorizontalCircleIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { getCompanyJobs } from "@/config/companyendpoints";
import { ActiveandInactiveJob } from "@/config/endpoints";


function ShowJob() {
  const router = useRouter();

  const [jobs, setJobs] = useState([]);
  const [jobActive,setJobActive] = useState('');
  const [refresh,setRefresh] = useState(false);
  useEffect(() => {
    async function invoke() {
      const data = await getCompanyJobs({
        companytoken: localStorage.getItem("companytoken"),
      });
      if (data) {
      
        setJobs(data);
        console.log(data)
      }
     
    }
    invoke();
  }, [refresh]);

  
  return (
    <div>
      <div className="flex pl-4 mt-5">
        <div className="text-white">
          <h4 className="text-lg font-semibold">Jobs</h4>
        </div>

        <div className="text-white ml-auto mr-6">
          <button
            className="bg-[#100072] font-semibold px-4 py-1 rounded hover:bg-[#2c2b36ad]"
            onClick={() => router.push("/company/postjob")}
          >
            Post Job
          </button>
        </div>
      </div>

      <div className="mt-4 ml-4 mr-6">
        <form>
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block  xs:w-1/3 w-1/3 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search job titles"
              required
            />
          </div>
        </form>
      </div>
      {jobs?.length >0 &&
        jobs.map((job:any) => (
          <div key={job._id} className="ml-4 mr-4 mt-4">
            <div className="w-full p-4 text-center  border border-gray-200 rounded-lg shadow sm:p-8 bg-gray-900 dark:border-gray-700">
              <div className="flex justify-between space-y-4 sm:flex sm:space-y-0 sm:space-x-4 text-white">
                <div className="max-w-sm">
                  <h4 className="">{job?.jobtitle}</h4>
                  <p className="text-gray-500 font-normal break-all ">
                    {job?.jobdescription.substring(0, 200)}.....
                  </p>
                </div>
                <div>
                <select 
                defaultValue={job?.active?'true':'false'}
                
                onChange={async (e)=>{
                 
                  const val = e.target.value;
                  const data = await ActiveandInactiveJob(job?._id,{status:val},{'companytoken':localStorage.getItem('companytoken')})
                  
                  setRefresh(!refresh)
                  
                }}
                className="bg-gray-500 rounded  text-white px-4">
                    <option value="false">Inactive</option>
                    <option value="true">Active</option>
                  </select>
                </div>
                <div>
                  {
                    job?.approved? (
                      <h4 className="text-green-500 font-bold">Approved</h4>
                    ):(
                       <h4 className="text-yellow-500 font-bold">waiting for admin approval</h4>
                    )
                  }
                 
                  
                </div>
                <div className="relative">
                <EllipsisHorizontalCircleIcon className="text-white h-10 cursor-pointer" onClick={()=>router.push(`company/editjob/${job._id}`)} />
                
                  
                  </div>
                  
                </div>
              </div>
            </div>
      
        ))}
    </div>
  );
}

export default ShowJob;
