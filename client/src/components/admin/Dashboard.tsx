import { getDashboardCounts } from "@/config/companyendpoints";
import { useEffect, useState } from "react";


function Dashboard() {
    const [counts , setCounts] = useState<any>({})
    useEffect(() => {
        async function invoke(){
            const data:any = await getDashboardCounts({'admintoken':localStorage.getItem('admintoken')})
            if(data.status === 'success'){
                setCounts(data.counts)
            }else{
                
            }
        }
        invoke()
    },[]);
    
  return (
    <div>
      <div className=" flex  justify-between">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">


          <div className="flex justify-between">
            <div className="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-black shadow-lg border">
              <img
                className=" w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
                src="https://hbr.org/resources/images/article_assets/2021/03/ICF.SC_.Article.2.image_.-HBR-positive-reinforcement_1099307402.jpg"
                alt="null"
              />
              <div className="p-6 flex flex-col justify-start">
                <h5 className="text-gray-300 text-xl font-medium mb-2">
                  USERS
                </h5>
                <h3 className="text-gray-300 text-6xl mb-4">
                {counts?.usercount}
                </h3>
                <p className="text-gray-300 text-xs">Last updated 3 mins ago</p>
              </div>
            </div>
          </div>


          <div className="flex justify-between">
            <div className="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-black shadow-lg border">
              <img
                className=" w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
                src="https://www.skytechindia.com/images/company.jpg"
                alt=""
              />
              <div className="p-6 flex flex-col justify-start">
                <h5 className="text-gray-300 text-xl font-medium mb-2">
                  COMPANY
                </h5>
                <h3 className="text-gray-300 text-6xl mb-4">
                {counts?.companycount}
                </h3>
                <p className="text-gray-300 text-xs">Last updated 3 mins ago</p>
              </div>
            </div>
          </div>


          
          <div className="flex justify-between">
            <div className="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-black shadow-lg border">
              <img
                className=" w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
                src="https://images.ctfassets.net/pdf29us7flmy/6CUCq15966GPkPR9gJbPSP/2fd7431ed38ec4fb8ca16365868e7c8e/Virtual_Interview_8.png"
                alt=""
              />
              <div className="p-6 flex flex-col justify-start">
                <h5 className="text-gray-300 text-xl font-medium mb-2">
                  JOBS
                </h5>
                <h3 className="text-gray-300 text-6xl mb-4">
                {counts?.jobsCount}
                </h3>
                <p className="text-gray-300 text-xs">Last updated 3 mins ago</p>
              </div>
            </div>
          </div>


 

          


        </div>
      </div>
    </div>
  );
}

export default Dashboard;
