import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useRouter } from "next/router";
function Trending() {
  const router = useRouter()
  return (
    <div className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-2 cursor-pointer transition duration-200 ease-out flex items-center justify-between">
      <div className="space-y-3.5">
        <p className="text-[#6e767d] text-xs font-medium">{}</p>
        <h6 className="font-bold max-w-[250px] text-sm">
          {/* {result.description} */}
        </h6>
        <p className="text-[#6e767d] text-xs font-medium  max-w-[250px]">
          Are you a employer you want to hire employees ? {" "}
          {/* {result.tags.map((tag, index) => (
            <span className="tag" key={index}>
              {tag}
            </span>
          ))} */}
        </p>
        <div className="mt-4">
        <button onClick={()=>router.push('/company/login')} className="bg-white text-black font-semibold rounded-sm px-3 hover:bg-gray-200 ">create a account</button>
        </div>
      </div>
      <Image
        src='/images/employer.png'
        width={100}
        height={100}
        objectFit="cover"
        alt={""}        />
        
      {/* {result.img ? (
        <Image
          src={}
          width={70}
          height={70}
          objectFit="cover"
          className="rounded-2xl"
        />
      ) : (
        <div className="icon group">
          <EllipsisHorizontalIcon className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0]" />
        </div>
      )} */}
      
    </div>
  )
}

export default Trending