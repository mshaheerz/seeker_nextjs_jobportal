export default function Loading() {
    return <div className="grid place-items-center bg-gradient-to-l from-gray-700 to-gray-900 h-screen">
    <div className="w-full bg-black rounded-md shadow-xl m-3">
      <div className="h-44 bg-gray-800 rounded-t-md animate-pulse"></div>
      <div className="p-5">
        <div className="h-6 rounded-sm bg-gray-800 duration-75 animate-pulse mb-4"></div>
        <div className="animate-pulse">
          <div className="h-1 mt-2 w-1/2 rounded-sm bg-gray-800"></div>
          <div className="h-1 mt-2 w-1/3 rounded-sm bg-gray-800"></div>
          <div className="h-1 mt-2 w-2/3 rounded-sm bg-gray-800"></div>
          <div className="h-1 mt-2 rounded-sm bg-gray-800"></div>
          <div className="h-1 mt-2 rounded-sm bg-gray-800"></div>
          <div className="h-1 mt-2 rounded-sm bg-gray-800"></div>
          <div className="h-2 rounded-sm bg-gray-800"></div>
        </div>
      </div>
    </div>
  
    <div className="flex w-full bg-black rounded-md shadow-xl m-3">
      <div className="w-1/3 bg-gray-800 rounded-l-md animate-pulse"></div>
      <div className="p-5 w-3/4">
        <div className="h-6 rounded-sm bg-gray-800 duration-75 animate-pulse mb-4"></div>
        <div className="animate-pulse">
          <div className="h-1 mt-2 w-1/3 rounded-sm bg-gray-800"></div>
          <div className="h-1 mt-2 w-2/3 rounded-sm bg-gray-800"></div>
          <div className="h-1 mt-2 rounded-sm bg-gray-800"></div>
          <div className="h-1 mt-2 rounded-sm bg-gray-800"></div>
          <div className="h-1 mt-2 rounded-sm bg-gray-800"></div>
          <div className="h-2 rounded-sm bg-gray-800"></div>
        </div>
      </div>
    </div>
  </div>
}