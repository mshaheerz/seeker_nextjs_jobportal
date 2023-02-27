import Feed from "@/components/User/Feed/Feed";
import Sidebar from "@/components/User/Layouts/Sidebar";
import axios from "@/config/axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { user } from "@/redux/signupdetails";
import { useRouter } from "next/router";
import Head from "next/head";
import { BriefcaseIcon, HeartIcon } from "@heroicons/react/24/solid";

import Jobs from "@/components/User/Jobs/Jobs";
import { ArrowBack, Logout } from "@mui/icons-material";
import swal from "sweetalert";
import { getOneApplydJob, getOneJobNoAuth } from "@/config/endpoints";
function JobDetailsPage({job}:any) {
  let dispatch = useDispatch();
  //user
  const [applyd, setApplyd] = useState(false)
  let [userDetails, setUserDetails] = useState({});
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("usertoken")) {
      axios
        .get("/isUserAuth", {
          headers: { usertoken: localStorage.getItem("usertoken") },
        })
        .then((response) => {
          if (response.data.status === "failed") {
            router.push("/auth");
          } else if (response.data.auth) {
            dispatch(user(response.data));
            setUserDetails({
              name: `${response.data.firstname} ${response.data.lastname}`,
              recentjob: response.data.recentjob,
            });
          } else {
            router.push("/auth");
          }
        });
    } else {
      router.push("/auth");
    }
  }, []);


  useEffect(() =>{
    async function invoke(){
      const data = await getOneApplydJob(job._id,{'usertoken':localStorage.getItem('usertoken')})
        console.log(data)
      if(data?.status==='success'){
    
        setApplyd(true)
      }
    }
    invoke();
  },[])
  const logout = () => {
    swal({
      title: "Are you sure?",
      text: "Once logout, you need to add credentials when login",
      icon: "warning",
      buttons: ["cancel","ok"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        localStorage.removeItem("usertoken");
        router.push("/auth");
      }
    });
  };
  return (
    <div className="">
      <Head>
        <title></title>
      </Head>

      <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
        {/* sidebar */}

        <Sidebar userDetails={userDetails} />
        <div className="flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px]">
          <div className="flex item-center px-1.5 py-2 border-b border-r border-gray-700 text-[#d9d9d9] font-semibold text-xl gap-x-4 sticky top-0 z-50 bg-black">
            <div className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0">
              <ArrowBack
                onClick={() => router.back()}
                className="h-7 text-white"
              />
            </div>
            Jobs
            <div className="hoverAnimation w-9 h-9 flex item-center justify-center xl:px-0 ml-auto">
              <Logout className="h-5 text-white" onClick={logout} />
            </div>
          </div>
          {/* job component */}

          <div>
            <div className=" mt-4 ml-3 mr-3 text-left   border border-gray-200 rounded-lg shadow sm:p-8 ">
              <h5 className="mb-1 text-3xl font-bold text-gray-900 dark:text-white">
                {job?.jobtitle}
              </h5>
              <p className=" text-base text-gray-500 sm:text-base dark:text-gray-300">
                {job?.company?.company}
              </p>
              <p className="text-gray-400 mb-3 font-normal text-sm">
              {job?.city}, {job?.state}
              </p>
              <p className="text-white">{job?.amount} per month</p>
              <div className="mt-4">
                {!applyd?( <button
                  type="button"
                  className=" inline-block px-6 py-2.5 bg-white text-black font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Apply
                </button>):( <button
                  type="button"
                  className=" inline-block px-6 py-2.5 bg-gray-600 text-black font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Applied
                </button>)}
               

                <HeartIcon className="text-white h-7 inline-block ml-3 hover:text-pink-500 cursor-pointer" />
              </div>
            </div>

            <div className=" mt-4 ml-3 mr-3 text-left   border border-gray-200 rounded-lg shadow sm:p-8 ">
              <h5 className="mb-1 text-3xl font-bold text-gray-900 dark:text-white">
                Job Details
              </h5>
              <div className="text-white">
                <h6>Salary:</h6>
              
                <span className="mb-3 text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-[#2C2C32] text-white rounded">{job?.amount}</span>
                <h6>Jobtype:</h6>
                {
                    job.jobtype && (
                        job.jobtype.map((element:any) =>(
                            <span key={element} className="mb-3 mr-2 text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-[#2C2C32] text-white rounded">{element}</span>

                        ))
                    )
                }

                <h6>schedule:</h6>
                {
                    job.schedule && (
                        job.schedule.map((element:any) =>(
                            <span key={element} className="mb-3 mr-2 text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-[#2C2C32] text-white rounded">{element}</span>
                        ))
                    )
                }

               

              </div>
            <hr />
              <div className="text-white mt-3">
            <h4 className="mb-3 text-lg font-bold ">Full job description</h4>
            <p className="whitespace-pre-line">{job.jobdescription}</p>
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  className=" inline-block px-6 py-2.5 bg-white text-black font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Report
                </button>

              </div>
            </div>

          </div>

          <div className="pb-72"></div>
        </div>

        {/* feed */}

        {/* widgets */}

        {/* modal */}
      </main>
    </div>
  );
}

export default JobDetailsPage;

export async function getServerSideProps(context: any) {
  const jobId = context.params.jobid;
  const data = await getOneJobNoAuth(jobId)

  return {
    props: {
        job:data?.jobs || null
    },
  };
}
