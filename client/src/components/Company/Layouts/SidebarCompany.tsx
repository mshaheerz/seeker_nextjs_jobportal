import Link from "next/link"
import SidebarLinkCompany from "./SidebarLinkCompany"
import { BellIcon, BriefcaseIcon, InboxIcon } from "@heroicons/react/24/solid"

import { ApprovalRounded, Email ,Help} from "@mui/icons-material"
import { useRouter } from "next/router"
function SidebarCompany() {
  const router = useRouter()
  return (
    <div className="hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full">
      <div className="flex item-center justify-center w-14 h-14 hoverAnimation p-0 xl:ml-24">
         {/* <Image  src={'/images/log_transparent.png'} alt='fds' width={300} height={300}></Image> */}
         <h4 className="text-white text-lg ml-2 xl:ml-8 font-bold p-2 ">SEEKER</h4>
      </div>
      
      <button onClick={()=>router.push('/company/postjob')} className="hidden xl:inline ml-auto bg-white text-[#000] rounded-md w-52 h-[38px] text-lg font-bold shadow-md hover:bg-[#2f2e2e] hover:text-white ">Post a job</button>
   
      <div className="space-y-2.5 mt-4 mb-2.5 xl:ml-24">
      <Link href='/company'>
       <SidebarLinkCompany text='Jobs' Icon={BriefcaseIcon} active={true} /> 
     </Link>
     <Link href='/company/applications'>
       <SidebarLinkCompany text='Applications' Icon={Email} active={false}/>
       </Link>
       <Link href='/company/approvedusers'>
       <SidebarLinkCompany text='Approved users' Icon={ApprovalRounded} active={false} />
       </Link>
       <Link href='/company/notification'>
       <SidebarLinkCompany text='Notification' Icon={BellIcon} active={false} />
       </Link>
       <Link href='/company/message'>
        <SidebarLinkCompany text='Messages' Icon={InboxIcon} active={false}/>
        </Link>
        <SidebarLinkCompany text='Questions' Icon={Help} active={false} />
        
      </div>
    
   
    </div>
  )
}

export default SidebarCompany