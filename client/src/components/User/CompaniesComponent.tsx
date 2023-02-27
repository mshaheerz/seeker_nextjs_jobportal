import {
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useEffect,
  useState,
} from "react";

import HeartIcon from "@heroicons/react/24/outline/HeartIcon";
import {
  getAllCompanies,
  ApplyJob,
  getUserApplydJob,
} from "@/config/endpoints";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import JobContainer from "@/components/Company/JobContainer";
import CompanyContainer from "@/components/User/CompanyContainer";
function ConmpaniesComponent() {
  const router = useRouter();
  const [refresh, setRefresh] = useState(false);
  const [company, setCompany] = useState<any>([]);
  useEffect(() => {
    async function invoke() {
      const data = await getAllCompanies({
        usertoken: localStorage.getItem("usertoken"),
      });
      if (data?.company) {
        setCompany(data.company);
      }
    }
    invoke();
  }, [refresh]);
  console.log(company);

  return (
    <div className=" flex items-center justify-center">
      <ToastContainer />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 p-5 cursor-pointer">
        {company &&
          company.map((company:any) => (
            <CompanyContainer
              key={company?._id}
              company={company}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          ))}
      </div>
    </div>
  );
}

export default ConmpaniesComponent;
