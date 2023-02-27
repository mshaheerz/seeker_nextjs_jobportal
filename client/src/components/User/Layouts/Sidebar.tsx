import Image from "next/image";
import SidebarLink from "./SidebarLink";
import {
  HomeIcon,
  BriefcaseIcon,
  HeartIcon,
  UserIcon,
  EllipsisHorizontalCircleIcon,
  InboxIcon,
  BellIcon,
  BuildingOffice2Icon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import { ApprovalRounded } from "@mui/icons-material";
function Sidebar({ userDetails }: any) {
  const router = useRouter();

  return (
    <div className="hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full">
      <div className="flex item-center justify-center w-14 h-14 hoverAnimation p-0 xl:ml-24">
        {/* <Image  src={'/images/log_transparent.png'} alt='fds' width={300} height={300}></Image> */}
        <h4 className="text-white text-lg ml-2 xl:ml-8 font-bold p-2 ">
          SEEKER
        </h4>
      </div>
      <div className="space-y-2.5 mt-4 mb-2.5 xl:ml-24">
        <Link href={"/"}>
          {" "}
          <SidebarLink text="Home" Icon={HomeIcon} active={true} />{" "}
        </Link>
        <Link href={"/jobs"}>
          <SidebarLink text="Jobs" Icon={BriefcaseIcon} active={false} />{" "}
        </Link>
        <Link href={"/jobs/appliedjobs"}>
          <SidebarLink
            text="Applied jobs"
            Icon={ApprovalRounded}
            active={false}
          />{" "}
        </Link>
        <Link href={"/notification"}>
        <SidebarLink text="Notification" Icon={BellIcon} active={false} />
        </Link>
        <Link href={"/chat"}>
          {" "}
          <SidebarLink text="Messages" Icon={InboxIcon} active={false} />{" "}
        </Link>
        <Link href={"/companies"}>
          <SidebarLink
            text="Company"
            Icon={BuildingOffice2Icon}
            active={false}
          />
        </Link>
        <SidebarLink text="My jobs" Icon={HeartIcon} active={false} />
        <SidebarLink
          text="More"
          Icon={EllipsisHorizontalCircleIcon}
          active={false}
        />
      </div>
      <button className="hidden xl:inline ml-auto bg-white text-[#000] rounded-md w-52 h-[38px] text-lg font-bold shadow-md hover:bg-[#2f2e2e] hover:text-white ">
        Post
      </button>

      <div
        className="text-[#d9d9d9] flex item-center justify-center hoverAnimation xl:ml-auto xl:-mr-5 mt-auto"
        onClick={() => router.push("/profile")}
      >
        <img
          src={
            userDetails?.image
              ? userDetails?.image
              : "https://lh3.googleusercontent.com/ogw/AAEL6sgG2UNiqo6FhnY0vomhQbCo9WLthbflYev4z7iaBg=s32-c-mo"
          }
          alt="loading"
          className="h-10 w-10 rounded-full xl:mr-2.5"
        />
        <div className="hidden xl:inline leading-5">
          <h4 className="font-bold">
            {userDetails?.firstname} {userDetails?.lastname}
          </h4>
          <p className="text-[#6e767d]">{userDetails?.recentjob}</p>
        </div>
        <EllipsisVerticalIcon className="h-5 hidden xl:inline ml-10 rotate-90" />
      </div>
    </div>
  );
}

export default Sidebar;
