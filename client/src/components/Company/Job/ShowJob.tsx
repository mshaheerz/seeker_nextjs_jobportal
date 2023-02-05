import { useRouter } from "next/router";
import {
  EllipsisHorizontalCircleIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { getCompanyJobs } from "@/config/companyendpoints";

function ShowJob() {
  const router = useRouter();
  
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    async function invoke() {
      const data = await getCompanyJobs({
        companytoken: localStorage.getItem("companytoken"),
      });
      if (data) {
        setJobs(data);
      }
      console.log(data);
    }
    invoke();
  }, []);
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
      {jobs &&
        jobs.map((job) => (
          <div className="ml-4 mr-4 mt-4">
            <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
              <div className="flex justify-between space-y-4 sm:flex sm:space-y-0 sm:space-x-4 text-white">
                <div className="max-w-sm">
                  <h4 className="">{job?.jobtitle}</h4>
                  <p className="text-gray-500 font-normal break-all ">
                    {job?.jobdescription.substring(0, 200)}.....
                  </p>
                </div>
                <div>
                  <h4>0 of 1 hired</h4>
                </div>
                <div>
                  <h4>waiting for admin approval</h4>
                  <button className="bg-white text-black px-4">Active</button>
                </div>
                <div className="relative">
                  action
                
                  
                  </div>
                  <button
                    type="button"
                    data-dial-toggle="speed-dial-menu-dropdown"
                    aria-controls="speed-dial-menu-dropdown"
                    aria-expanded="false"
                    className="flex items-center justify-center ml-auto text-black bg-white rounded-full w-14 h-14 hover:bg-blue-800  dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                    </svg>
                    <span className="sr-only">Open actions menu</span>
                  </button>
                </div>
              </div>
            </div>
      
        ))}
    </div>
  );
}

export default ShowJob;
