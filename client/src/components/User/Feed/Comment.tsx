import Moment from "react-moment"
import {ChatBubbleLeftIcon,ChartBarIcon, EllipsisHorizontalIcon, HeartIcon, ShareIcon} from "@heroicons/react/24/solid"

function Comment({comment}:any) {
  return (
    <div className="p-3 flex cursor-pointer border-b border-gray-700">
        <img src={comment.user.profile ? comment.user.profile:'https://t3.ftcdn.net/jpg/01/18/01/98/360_F_118019822_6CKXP6rXmVhDOzbXZlLqEM2ya4HhYzSV.jpg'} alt="prof" className="h-11 w-11
        rounded-full mr-4" />
        <div className="flex flex-col space-y-2 w-full">
            <div className="flex justify-between">
                <div className="text-[#6e767d]">
                    <div className="inline-block group">
                     <h4 className="font-bold text-[#d9d9d9] text-[15px] sm:text-base inline-block group-hover:underline">               
                            {comment?.user?.firstname} {comment?.user?.lastname}
                        </h4>
                        <span className="ml-1.5 text-sm sm:text-[15px]">
                            @smd
                        </span>
                    </div>{" "}
                    {" "}
                    <span className="hover:underline text-sm sm:text-[15px]">
                    <Moment fromNow>{comment.updatedAt}</Moment>
                    </span>
                    <p className="text-[#d9d9d9] mt-0.5 max-w-lg overflow-scroll no-scrollbar text-[15px] sm:text-base">
                    {comment?.text}
                    </p>
                </div>
                <div className="icon group flex-shrink-0">
            <EllipsisHorizontalIcon className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0]" />
          </div>
            </div>
            <div className="text-[#6e767d] flex justify-between w-10/12">
          <div className="icon group">
            <ChatBubbleLeftIcon className="h-5 group-hover:text-[#1d9bf0]" />
          </div>

          <div className="flex items-center space-x-1 group">
            <div className="icon group-hover:bg-pink-600/10">
              <HeartIcon className="h-5 group-hover:text-pink-600" />
            </div>
            <span className="group-hover:text-pink-600 text-sm"></span>
          </div>

          <div className="icon group">
            <ShareIcon className="h-5 group-hover:text-[#1d9bf0]" />
          </div>
        
        </div>

        </div>
    </div>
  )
}

export default Comment