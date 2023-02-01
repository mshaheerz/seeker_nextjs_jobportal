import Feed from "../Feed/Feed";
import Sidebar from "../Layouts/Sidebar";
import HeartIcon from "@heroicons/react/24/outline/HeartIcon";
function Jobs() {
  return (
    <div className=" flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 p-5">
      
      
        <div className="flex justify-center">
          <div className="block p-6 rounded-lg shadow-lg border-2 border-white  max-w-xl">
            <h5 className="text-gray-200 text-xl leading-tight font-medium mb-1">
              web developer
            </h5>
            <p className="text-gray-400 font-thin mb-2">Trivandrum, kerala</p>

            
            <div className="flex space-x-2 justify-between mb-4">
          <span className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-[#2C2C32] text-white rounded">fulltime</span>
            </div>


            <p className="text-gray-200  text-base mb-4">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <button
              type="button"
              className=" inline-block px-6 py-2.5 bg-white text-black font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Apply
            </button>
            
            <HeartIcon className="text-white h-7 inline-block ml-3 hover:text-pink-500 cursor-pointer"/>
          
          </div>
        </div>

        <div className="flex justify-center">
          <div className="block p-6 rounded-lg shadow-lg border-2 border-white  max-w-xl">
            <h5 className="text-gray-200 text-xl leading-tight font-medium mb-2">
              web developer
            </h5>
            <p className="text-gray-200  text-base mb-4">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <button
              type="button"
              className=" inline-block px-6 py-2.5 bg-white text-black font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Apply
            </button>
          </div>
        </div>


        <div className="flex justify-center">
          <div className="block p-6 rounded-lg shadow-lg border-2 border-white  max-w-xl">
            <h5 className="text-gray-200 text-xl leading-tight font-medium mb-2">
              web developer
            </h5>
        
            <p className="text-gray-200  text-base mb-4">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <button
              type="button"
              className=" inline-block px-6 py-2.5 bg-white text-black font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Apply
            </button>
          </div>
        </div>



      </div>
    </div>
  );
}

export default Jobs;
