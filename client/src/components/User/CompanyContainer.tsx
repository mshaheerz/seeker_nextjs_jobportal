import { useEffect, useState } from "react";
import HeartIcon from "@heroicons/react/24/outline/HeartIcon";
import { useRouter } from "next/router";
import { ApplyJob, getOneApplydJob } from "@/config/endpoints";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer, toast } from "react-toastify";
import { BuildingOffice2Icon } from "@heroicons/react/24/solid";
function CompanyContainer({ company, refresh, setRefresh }: any) {
  const [applyd, setApplyd] = useState(false);
  const [applydetails, setApplyDetails] = useState([]);
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

  const handlepost = async (jobId: string, companyId: string) => {
    console.log(jobId, companyId);
    const data = await ApplyJob(jobId, companyId, {
      usertoken: localStorage.getItem("usertoken"),
    });
    console.log(data);
    if (data.status == "success") {
      setRefresh(!refresh);
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
    } else {
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
  };
  return (
    <div
      key={company._id}
      className="flex-auto justify-center"
      onClick={() => router.push(`/companies/${company._id}`)}
    >
      <ToastContainer />

      <div className="max-w-sm p-6  border border-gray-200 rounded-lg shadow bg-black dark:border-gray-700">
        {/* className="w-10 h-10 mb-2 text-gray-500 dark:text-gray-400"  */}
        {company?.image ? (
          <img
            src={company?.image}
            className="w-10 h-10 mb-2 text-gray-500 dark:text-gray-400"
          />
        ) : (
          <BuildingOffice2Icon className="w-10 h-10 mb-2 text-gray-500 dark:text-gray-400" />
        )}
        <a href="#">
          <h5 className=" text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {company?.company}
          </h5>
          <p className="text-gray-300 mb-2 font-thin">{company?.industry}</p>
        </a>
        <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
          {company?.description?.substring(0, 90)}
        </p>
        <a
          href="#"
          className="inline-flex gap-2 items-center text-blue-600 hover:underline"
        >
          <span className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-[#2C2C32] text-white rounded">
            something
          </span>
          <span className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-[#2C2C32] text-white rounded">
            something
          </span>
        </a>
      </div>
    </div>
  );
}

export default CompanyContainer;
