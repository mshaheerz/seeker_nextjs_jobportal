import Image from "next/image";
import Multiselect from "multiselect-react-dropdown";
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import { ToastContainer,toast } from "react-toastify"
import { EditJob, companyPostJob } from "@/config/companyendpoints";
import { useRouter } from "next/router";

function EditJobComponent({job}:any) {
  const router = useRouter();

  const [jobtype, setJobType] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [suplimentalpay, setSuplementalpay] = useState([]);


  const [jobtitleerr, setJobtitleerr] = useState(false);
  const [jobtitleerrMessage, setJobtitleerrMessage] = useState('');

  const [addresserr, setAddresserr] = useState(false);
  const [addresserrMessage, setAddresserrMessage] = useState('');

  const [cityerr, setCityerr] = useState(false);
  const [cityerrMessage, setCityerrMessage] = useState('');

  const [jobdescriptionerr, setJobdescriptionerr] = useState(false);
  const [jobdescriptionerrMessage, setJobdescriptionerrMessage] = useState('')



  async function sendJobPost(e: any) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    let obj = {
      jobtitle: data.get("jobtitle"),
      address: data.get("address"),
      city: data.get("city"),
      zip: data.get("zip"),
      amount: data.get("amount"),
      state: data.get("state"),
      hirecount: data.get("hirecount"),
      jobdescription: data.get("jobdescription"),
      schedule,
      jobtype,
      suplimentalpay,
    };
  

    if(obj.jobtitle && obj.address && obj.city && obj.state && obj.hirecount && obj.jobdescription){
      let regName = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;
      if(regName.test(obj.jobtitle.toString())){
        setJobtitleerr(false)
        const data = await EditJob(job?._id,obj,{"companytoken":localStorage.getItem('companytoken')})
        if(data.status ==='success'){
          toast.success(`${data.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
            router.push('/company')
        }else{
 
          toast.error(`OOPS! ${data.message}`, {
           position: "top-right",
           autoClose: 5000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
           theme: "dark",
           });
        }
      }else{
       setJobtitleerr(true)
       setJobtitleerrMessage('Please enter valid title')
       toast.error(`OOPS! Please enter valid job title`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      }
    }else{
      setJobtitleerr(true)
      setJobtitleerrMessage('please fillout this field')
      setAddresserr(true);
      setAddresserrMessage('please fillout this field')
      setCityerr(true);
      setCityerrMessage('please fillout this field');
      setJobdescriptionerr(true);
      setJobdescriptionerrMessage('please fill out this field')
      toast.error(`OOPS! Please fill required fields`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
  }

  function onSelectJobtype(selectedList: any, selectedItem: any) {
    setJobType(selectedList);
  }

  function onSelectSchedule(selectedList: any, selectedItem: any) {
    setSchedule(selectedList);
  }

  function onSelectSuplemntalpay(selectedList: any, selectedItem: any) {
    setSuplementalpay(selectedList);
  }

  return (
    <div>
      <ToastContainer />
      <div className="bg-white pb-4 ml-2 mt-2 mr-5 rounded-2xl">
        <div className="flex pt-4 ml-3 mr-3 pb-4">
          <div>
            <h4 className="font-bold text-lg">
              Post job provide some informations{" "}
            </h4>
          </div>
          <div className="ml-auto mt-1 mr-4">
            <Image
              src={"/images/job.png"}
              alt={"loading"}
              height={40}
              width={40}
            />
          </div>
        </div>
      </div>

      <div className=" border-2 border-gray-500 pb-4 ml-2 mt-2 mr-5 rounded-2xl">
        <form className="mt-4 mr-3 ml-3 pt-4 " onSubmit={sendJobPost}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Job title
              </label>
              <input
                required
                className="appearance-none block w-full bg-white text-black border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                name="jobtitle"
                defaultValue={job?.jobtitle}
                type="text"
                placeholder="Software developer"
              />
              {
                jobtitleerr && <p className="text-red-500 text-xs italic">
                {jobtitleerrMessage}
              </p>
              }
             
            </div>

            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2"
                htmlFor="grid-state"
              >
                Job Type
              </label>
              <Multiselect
              
                style={{
                  chips: {
                    background: "black",
                  },
                  multiselectContainer: {
                    color: "black",
                  },
                  searchBox: {
                    padding: "8px",
                  },
                  optionContainer: {
                    color: "white",
                  },
                  option: {
                    background: "#2C2C32",
                  },
                  groupHeading: {
                    background: "black",
                  },
                }}
                isObject={false}
                placeholder="select job type"
                selectedValues={job?.jobtype}
                className="  bg-white border rounded-md border-gray-200 text-gray focus:outline-none focus:bg-white focus:border-gray-500"
                options={[
                  "Part-time",
                  "Fulltime",
                  "Freelance",
                  "Temporary",
                  "Internship",
                ]} // Options to display in the dropdown
                 // Preselected value to persist in dropdown
                onSelect={onSelectJobtype} // Function will trigger on select event
                // onRemove={this.onRemove} // Function will trigger on remove event
                // Property name to display in the dropdown options
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Street address
              </label>
              <input
                required
                className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id=""
                defaultValue={job?.address}
                name="address"
                type="text"
                placeholder="street address"
              />
              <p className="text-gray-200 text-xs italic">
                whre is your job location 
              </p>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2"
                htmlFor="grid-city"
              >
                City
              </label>
              <input
                required
                className="appearance-none block w-full bg-white text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-city"
                name="city"
                defaultValue={job?.city}
                type="text"
                placeholder="kozhikode"
              />
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2"
                htmlFor="grid-state"
              >
                State
              </label>
              <div className="relative">
                <select
                  required
                  name="state"
                  defaultValue={job?.state}
                  className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                >
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Andaman and Nicobar Islands">
                    Andaman and Nicobar Islands
                  </option>
                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option value="Assam">Assam</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Chandigarh">Chandigarh</option>
                  <option value="Chhattisgarh">Chhattisgarh</option>
                  <option value="Dadar and Nagar Haveli">
                    Dadar and Nagar Haveli
                  </option>
                  <option value="Daman and Diu">Daman and Diu</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Lakshadweep">Lakshadweep</option>
                  <option value="Puducherry">Puducherry</option>
                  <option value="Goa">Goa</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Himachal Pradesh">Himachal Pradesh</option>
                  <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                  <option value="Jharkhand">Jharkhand</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Manipur">Manipur</option>
                  <option value="Meghalaya">Meghalaya</option>
                  <option value="Mizoram">Mizoram</option>
                  <option value="Nagaland">Nagaland</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Sikkim">Sikkim</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Tripura">Tripura</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                  <option value="West Bengal">West Bengal</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2"
                htmlFor="grid-zip"
              >
                Zip
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-zip"
                type="number"
                defaultValue={job?.zip}
                name="zip"
                placeholder="90210"
              />
              <p className="text-gray-200 text-xs italic">
                Pin code
              </p>
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Job description
              </label>
              <textarea
                required
                name="jobdescription"
               
                className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 min-h-[70px]"
                id="grid-password"
                defaultValue={job?.jobdescription}
                placeholder="Job description"
               />
              <p className="text-gray-200 text-xs italic">
                Make it a good description
              </p>
            </div>

            <div className="w-full md:w-1/2 px-3 mb-6 mt-4 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2"
                htmlFor="grid-state"
              >
                What is shedule for this job ?
              </label>
              <Multiselect
                style={{
                  chips: {
                    background: "black",
                  },
                  multiselectContainer: {
                    color: "black",
                  },
                  searchBox: {
                    padding: "8px",
                  },
                  optionContainer: {
                    color: "white",
                  },
                  option: {
                    background: "#2C2C32",
                  },
                  groupHeading: {
                    background: "black",
                  },
                }}
                isObject={false}
                placeholder="select shedule"
                className="  bg-white border rounded-md border-gray-200 text-gray focus:outline-none focus:bg-white focus:border-gray-500"
                selectedValues={job?.schedule}
                options={[
                  "Day-shift",
                  "Fixed-shift",
                  "Evening-shift",
                  "Morning",
                ]} // Options to display in the dropdown
                 // Preselected value to persist in dropdown
                onSelect={onSelectSchedule} // Function will trigger on select event
                // onRemove={this.onRemove} // Function will trigger on remove event
                // Property name to display in the dropdown options
              />
            </div>

            <div className=" mb-6 mt-4 md:mb-0 w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2"
                htmlFor="grid-state"
              >
                How many people you want to hire ?
              </label>
              <div className="relative">
                <select
                  required
                  name="hirecount"
                  defaultValue={job?.hirecount}
                  className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="3">4</option>
                  <option value="3">5</option>
                  <option value="3">6</option>
                  <option value="3">7</option>
                  <option value="3">8</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="text-black py-4 bg-white font-bold text-lg rounded-md">
            <div className="flex">
              <div>
                <h2 className="ml-3">Include Compensation</h2>
              </div>
              <div className="ml-auto mr-4">
                <Image
                  src={"/images/compensation.png"}
                  height={50}
                  width={50}
                  alt="compensation"
                ></Image>
              </div>
            </div>
          </div>

          <div className="text-white py-4  font-semibold text-lg rounded-md">
            What is the pay
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                amount per month
              </label>
              <input
                name="amount"
                className="appearance-none block w-full bg-white text-black border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                defaultValue={job?.amount}
                type="number"
                placeholder="30000 per month"
              />
              <p className="text-red-500 text-xs italic">
                Please fill out this field.
              </p>
            </div>

            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2"
                htmlFor="grid-state"
              >
                do you offer any supplemental pay ?
              </label>
              <Multiselect
                style={{
                  chips: {
                    background: "black",
                  },
                  multiselectContainer: {
                    color: "black",
                  },
                  searchBox: {
                    padding: "8px",
                  },
                  optionContainer: {
                    color: "white",
                  },
                  option: {
                    background: "#2C2C32",
                  },
                  groupHeading: {
                    background: "black",
                  },
                }}
                isObject={false}
                placeholder="select"
                selectedValues={job?.suplimentalpay}
                className="  bg-white border rounded-md border-gray-200 text-gray focus:outline-none focus:bg-white focus:border-gray-500"
                options={["joining-bonus", "overtime-pay", "Perfomance-pay"]} // Options to display in the dropdown
                // selectedValues={} // Preselected value to persist in dropdown
                onSelect={onSelectSuplemntalpay} // Function will trigger on select event
                // onRemove={this.onRemove} // Function will trigger on remove event
                // Property name to display in the dropdown options
              />
            </div>
          </div>
          <div className="text-white flex">
            <div className="ml-auto">
              <button
                type="submit"
                className="bg-[#444d48]   text-white px-14 font-bold rounded py-2 hover:text-black hover:bg-white"
              >
                Post now
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditJobComponent;
