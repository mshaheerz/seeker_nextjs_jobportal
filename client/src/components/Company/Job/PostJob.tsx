import Image from "next/image";
import Multiselect from "multiselect-react-dropdown";
function PostJobComponent() {
  function onSelect(selectedList: any, selectedItem: any) {
    console.log(selectedList);
    console.log(selectedItem);
  }
  return (
    <div>
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
        <form className="mt-4 mr-3 ml-3 pt-4 ">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Job title
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-200 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Software developer"
              />
              <p className="text-red-500 text-xs italic">
                Please fill out this field.
              </p>
            </div>

            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2"
                for="grid-state"
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
                className="  bg-white border rounded-md border-gray-200 text-gray focus:outline-none focus:bg-white focus:border-gray-500"
                options={[
                  "Part-time",
                  "Fulltime",
                  "Freelance",
                  "Temporary",
                  "Internship",
                ]} // Options to display in the dropdown
                // selectedValues={} // Preselected value to persist in dropdown
                onSelect={onSelect} // Function will trigger on select event
                // onRemove={this.onRemove} // Function will trigger on remove event
                // Property name to display in the dropdown options
              />
           
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2"
                for="grid-password"
              >
                Street address
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id=""
                type="text"
                placeholder="street address"
              />
              <p className="text-gray-200 text-xs italic">
                Make it as long and as crazy as you'd like
              </p>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2"
                for="grid-city"
              >
                City
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-200 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-city"
                type="text"
                placeholder="kozhikode"
              />
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2"
                for="grid-state"
              >
                State
              </label>
              <div className="relative">
                <select
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
                for="grid-zip"
              >
                Zip
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-zip"
                type="text"
                placeholder="90210"
              />
               <p className="text-gray-200 text-xs italic">
                Make it as long and as crazy as you'd like
              </p>
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2"
                for="grid-password"
              >
                Job description
              </label>
              <textarea
                
                className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 min-h-[70px]"
                id="grid-password"
                placeholder="Job description"
              />
              <p className="text-gray-200 text-xs italic">
                Make it as long and as crazy as you'd like
              </p>
            </div>



            <div className="w-full md:w-1/3 px-3 mb-6 mt-4 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2"
                for="grid-state"
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
                options={[
                  "Day-shift",
                  "Fixed-shift",
                  "Evening-shift",
                  "Morning",
                ]} // Options to display in the dropdown
                // selectedValues={} // Preselected value to persist in dropdown
                onSelect={onSelect} // Function will trigger on select event
                // onRemove={this.onRemove} // Function will trigger on remove event
                // Property name to display in the dropdown options
              />
           
            </div>




            <div className="w-full md:w-1/3 px-3 mb-6 mt-4 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2"
                for="grid-state"
              >
                How many people you want to hire ?
              </label>
              <div className="relative">
                <select
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


          <div className="text-white font-bold text-lg">
                <h2>Include compensation</h2>
            </div>
                


        </form>
      </div>
    </div>
  );
}

export default PostJobComponent;
