import Head from "next/head";
import ShowJob from "@/components/Company/Job/ShowJob";
import SidebarCompany from "@/components/Company/Layouts/SidebarCompany";
import { BriefcaseIcon, EllipsisVerticalIcon,BuildingOffice2Icon } from "@heroicons/react/24/solid";
import { Logout } from "@mui/icons-material";
import { use, useEffect } from "react";
import { companyAuthentication } from "@/config/companyendpoints";
import { useRouter } from "next/router";
import { companyInfo } from '@/redux/companyinfo'
import { useDispatch, useSelector } from "react-redux";

import swal from 'sweetalert'
function CompanyPage() {

  let setCompanydetails = useDispatch(companyInfo)

  let companyDetails = useSelector((state:any)=>state.companyinfo.value)
  const router = useRouter()
  useEffect(() => {
    async function invoke(){
        if(localStorage.getItem("companytoken")){
            const data = await companyAuthentication({"companytoken":localStorage.getItem("companytoken")})
            console.log(data._doc)
            setCompanydetails(companyInfo(data._doc))
            if(data.status ==="failed"){
              router.push('/company/login')
            }else if(data.auth){
                router.push('/company')
            }else{
                router.push('/company/login')
            }
        }else{
            router.push('/company/login')
        }
        
    }
    invoke();

 }, [])

 const logout=()=>{
  swal({
    title: "Are you sure?",
    background:'black',
    text: "Once logout, you need to add credentials when login",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      localStorage.removeItem('companytoken')
      router.push('/company/login')
    } 
  });
}
  return (
    <>
      <Head>
        <title>Seeker</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
        {/* sidebar */}
        {/* userDetails ={userDetails} */}
        <SidebarCompany />
        <div className="flex-grow border-l border-r border-gray-700 max-w sm:ml-[73px] xl:ml-[370px]">
          <div className="flex item-center px-1.5 py-2 border-b border-r border-gray-700 text-[#d9d9d9] font-semibold text-xl gap-x-4 sticky top-0 z-50 bg-black">
            <div className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0">
              <BriefcaseIcon className="h-7 text-white" />
            </div>
            Jobs
            <div className="text-[#d9d9d9] flex item-center justify-center hoverAnimation sm:ml-auto xl:-mr-5 ml-auto mt-auto" onClick={()=>router.push('/company/profile')}>
            <BuildingOffice2Icon className="h-10 w-10 rounded-full xl:mr-2.5"/>
              <div className="hidden xl:inline leading-4">
                <p className="font-medium text-base">{companyDetails?.company}</p>
                <p className="text-[#6e767d] text-sm">{companyDetails?.email}</p>
              </div>
              
            </div>
            <Logout onClick={logout} className=" h-5 pl-4 mt-4 w-9 rounded-full xl:mr-2.5 cursor-pointer  "/>
          </div>
          <ShowJob />
          <div className="pb-72"></div>
        </div>
        {/* feed */}
        {/* <Feed /> */}

        {/* widgets */}

        {/* modal */}
      </main>
    </>
  );
}

export default CompanyPage;
