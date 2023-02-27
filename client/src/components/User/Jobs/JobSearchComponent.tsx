import { SearchJob, FilterByJobType} from '@/config/endpoints';
import React, { useState } from 'react'
import {jobs} from "@/redux/jobs";
import { useDispatch, useSelector } from "react-redux";

function JobSearchComponent() {
    const [search, setSearch] = useState('')
    const [filter , setFilter]= useState(null)
    let job = useSelector((state:any)=>state.jobs.value)
    let dispatch = useDispatch()
    //jobs
    const searchHandler = async (e:any)=>{
        setSearch(e.target.value);
        const data = await SearchJob(e.target.value,{'usertoken':localStorage.getItem('usertoken')})
        dispatch(jobs(data?.jobs))
    }

    const handleFilter = async (e:any)=>{
        setFilter(e.target.value);
        const data = await FilterByJobType(e.target.value,{'usertoken':localStorage.getItem('usertoken')})
        dispatch(jobs(data?.jobs))
       
    }
  return (
    
    
    <div className="mt-4 w-full  ml-4 mr-6">
    <form>
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <div className='flex justify-start'>
        <div className=' xs:w-2/3 w-2/3'>
        <input
          type="search"
          id="default-search"
          onChange={searchHandler}
          className="block  xs:w-2/3 w-2/3 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search job titles"
          list='searchers'
        
          required
        />
        <datalist id="searchers">
    {job?.map((item:any) =>
      <option key={item?._id}  value={item.jobtitle} />
    )}
  </datalist>
      
        
        </div> 
        
        <div className='ml-auto  px-4'>
            <select 
            className='bg-black border text-white
              border-gray-300 rounded-lg px-6 py-3 mr-4 '
             name=""
              id=""
              onChange={handleFilter}
              >
            <option value="Part-time">Part-time</option>
            <option value="Freelance">Freelance</option>
            <option value="Fulltime">Fulltime</option>
            <option value="Internship">Internship</option>
            
            
            </select>
            </div>
        </div>
      </div>

     
    </form>
  </div>
  )
}

export default JobSearchComponent