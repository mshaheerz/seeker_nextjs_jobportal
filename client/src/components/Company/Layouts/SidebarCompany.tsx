import Link from "next/link"
import SidebarLinkCompany from "./SidebarLinkCompany"
import { BellIcon, BriefcaseIcon, EllipsisVerticalIcon, InboxIcon } from "@heroicons/react/24/solid"
import { Email ,Help} from "@mui/icons-material"
function SidebarCompany() {
  return (
    <div className="hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full">
      <div className="flex item-center justify-center w-14 h-14 hoverAnimation p-0 xl:ml-24">
         {/* <Image  src={'/images/log_transparent.png'} alt='fds' width={300} height={300}></Image> */}
         <h4 className="text-white text-lg ml-2 xl:ml-8 font-bold p-2 ">SEEKER</h4>
      </div>
      <button className="hidden xl:inline ml-auto bg-white text-[#000] rounded-md w-52 h-[38px] text-lg font-bold shadow-md hover:bg-[#2f2e2e] hover:text-white ">Post a job</button>
      <div className="space-y-2.5 mt-4 mb-2.5 xl:ml-24">
     
       <SidebarLinkCompany text='Jobs' Icon={BriefcaseIcon} active={true} /> 
       <SidebarLinkCompany text='Applications' Icon={Email} active={false}/>
       <SidebarLinkCompany text='Notification' Icon={BellIcon} active={false} />
        <SidebarLinkCompany text='Messages' Icon={InboxIcon} active={false}/>
        <SidebarLinkCompany text='Questions' Icon={Help} active={false} />
        
      </div>
    
   
    </div>
  )
}

export default SidebarCompany