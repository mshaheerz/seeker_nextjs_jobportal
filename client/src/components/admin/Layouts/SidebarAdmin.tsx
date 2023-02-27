
import Link from "next/link"
import SidebarLinkCompany from "./SidebarLinksAdmin"
import { BellIcon, BriefcaseIcon, EllipsisVerticalIcon, InboxIcon } from "@heroicons/react/24/solid"
import { AccountCircle, Business, Dashboard, Report, VerifiedUser } from "@mui/icons-material"
import { Email ,Help} from "@mui/icons-material"
import { useRouter } from "next/router"

function SidebarAdmin() {
    const router = useRouter()
  return (
    <div className="hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full">
    <div className="flex item-center justify-center w-14 h-14 hoverAnimation p-0 xl:ml-24">
       {/* <Image  src={'/images/log_transparent.png'} alt='fds' width={300} height={300}></Image> */}
       <h4 className="text-white text-lg ml-2 xl:ml-8 font-bold p-2 ">SEEKER</h4>
    </div>
    
 
    <div className="space-y-2.5 mt-4 mb-2.5 xl:ml-24">
    <Link href='/admin'>
     <SidebarLinkCompany text='Dashboard' Icon={Dashboard} active={true} /> 
   </Link>
   <Link href='/admin/jobapprove'>
     <SidebarLinkCompany text='Job Approval' Icon={VerifiedUser} active={false}/>
  </Link>
     <Link href='/admin/users'>
     <SidebarLinkCompany text='Users' Icon={AccountCircle} active={false} />
     </Link>
     <Link href='/admin/companylist'>
      <SidebarLinkCompany text='Company' Icon={Business} active={false}/>
      </Link>

      <Link href='/admin/joblist'>
      <SidebarLinkCompany text='Jobs' Icon={BriefcaseIcon} active={false} />
      </Link>
      <Link href='/admin/reports'>
      <SidebarLinkCompany text='reports/flag' Icon={Report} active={false} />
      </Link>
    </div>
  
 
  </div>
  )
}

export default SidebarAdmin