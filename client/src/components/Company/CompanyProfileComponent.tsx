// import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, createTheme } from "@mui/material"
import { useState, Fragment, useRef, use } from "react";
import { ThemeProvider } from "@mui/material";
import { Dialog, Transition } from "@headlessui/react";
import { ChartBarIcon, PencilIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { editProfile } from "@/config/endpoints";
import Loading from "@/pages/loading";
import { user } from '@/redux/signupdetails'
import { useDispatch, useSelector } from "react-redux";
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { editCompanyProfile } from "@/config/companyendpoints";
import { companyInfo } from "@/redux/companyinfo";

// const darkTheme = createTheme({
//   palette: {
//     mode: "dark",
//     primary: {
//       dark: "#000807",
//       light: "#ffffff",
//       main: "#ffffff",
//       contrastText: "#fff",
//     },
    //     secondary: {
    //       light: "#8F0992",
    //       main: "#ffff",
    //       dark: "#2C2C32",
    //       contrastText: "#000",
    //     },
//   },
// });


function CompanyProfileComponent({ company }: any) {
    let dispatch = useDispatch()
    //companyInfo
    let companyDetails = useSelector((state:any)=>state.companyinfo.value)
  const [open, setOpen] = useState(false);
  const [loading,setLoading] = useState(false);
  let [isOpen, setIsOpen] = useState(false);
  const coverPickerRef = useRef<any>(0)
  const profilePickerRef = useRef<any>(0)
  const [profileImage, setProfileImage] = useState(null)
  const [coverImage, setCoverImage] = useState(null)
  
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const addCoverPhoto = (e:any)=>{
    try {
   
             
            let filePath = e.target.files[0].name;
            // Allowing file type
            let allowedExtensions =/(\.jpg|\.jpeg|\.png|\.gif)$/i;
            if (!allowedExtensions.exec(filePath)) {
              toast.error(`OOPS! invalid file type`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
                return false;
            }
      const reader = new FileReader();
      if(e.target.files[0]){
        reader.readAsDataURL(e.target.files[0]);
      }
      reader.onload = (readerEvent:any)=>{
        setCoverImage(readerEvent.target.result)
      }
    } catch (error) {
      console.log(error)
    }
  }

    const addProfilePhoto = (e:any)=>{
      try {
          
        let filePath = e.target.files[0].name;
        // Allowing file type
        let allowedExtensions =/(\.jpg|\.jpeg|\.png|\.gif)$/i;
        if (!allowedExtensions.exec(filePath)) {
          toast.error(`OOPS! invalid file type`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
            return false;
        }
        const reader = new FileReader();
        if(e.target.files[0]){
          reader.readAsDataURL(e.target.files[0]);
        }
        reader.onload = (readerEvent:any)=>{
          setProfileImage(readerEvent.target.result)
        }
      } catch (error) {
        console.log(error)
      }
    }
  const updatePost = async (event: React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault()
    setLoading(false)
    const data = new FormData(event.currentTarget);
    let obj = {
      fullname: data.get("fullname"),
      company:data.get("company"),
      email: data.get("email"),
      employeeCount:data.get("employeeCount"),
      industry:data.get("industry"),
      description:data.get("description"),
      image:profileImage || null,
      cover:coverImage || null
      
    };
    console.log(obj)

    let regEmail =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if(obj.fullname && obj.company && obj.email && obj.employeeCount && obj.industry && obj.description){
      if(regEmail.test(obj.email.toString())){
        const data = await editCompanyProfile(obj,{"companytoken":localStorage.getItem('companytoken')})
        console.log(data);
        if(data.status ==='success'){
          setIsOpen(false)
          console.log(data)
          dispatch(companyInfo(data.company))
        }else{
          toast.error(`OOPS! ${data?.message}`, {
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
        toast.error(`OOPS! enter valid email`, {
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
      toast.error(`OOPS! all fields are required`, {
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
    setLoading(false)
    
  }
  return (
    <>
    {
  loading ? <Loading /> :(

    <div className="h-64">
      <ToastContainer />
   
      <div className="relative bg-gray-800 w-full h-44  ">
     
        <img
          src={`${company?.cover?company.cover:'https://webtoolfeed.files.wordpress.com/2012/10/glasses-cat1.jpg'}`}
          alt="kitty"
          className="rounded-sm h-44 w-full object-cover mr-2"
        />
        <div className="absolute   -bottom-10 left-6 w-28 rounded-2xl bg-white h-28 ">
          <img
            src={`${company?.image?company.image:'https://www.alleycat.org/wp-content/uploads/2019/03/FELV-cat.jpg'}`}
            alt="kitty"
            className="rounded-2xl h-full w-full object-cover mr-2"
          />
        </div>
        <div className="h-px mt-10 flex justify-between">
          <div className="w-44 ">
            <p className="text-white font-semibold text-center">
              {company?.company} 
            </p>
            <p className="text-gray-500  text-center">{company?.industry}</p>
          </div>
          <div className="ml-auto mr-3">
            <button
              className="border border-white rounded px-4 py-1 text-white font-semibold"
              onClick={openModal}
            >
              Edit profile
            </button>
            
          </div>
        </div>
      </div>
     
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-100" onClose={closeModal}>
          <div className="flex items-start justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 overflow-scroll">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed scroll-m-2 inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <div className="inline-block align-bottom bg-black rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
                    <div className="flex items-center px-1.5 py-2 border-b border-gray-700">
                      <div
                        className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
                        onClick={() => setIsOpen(false)}
                      >
                        <XMarkIcon className="h-[22px] text-white" />
                      </div>
                      <div className="text-white">User edit</div>
                    </div>
                    <div className="flex px-4 pt-5 pb-2.5 sm:px-6">
                      <div className="w-full">
                        <div className="text-[#6e767d] flex gap-x-3 relative">
                          <div className="relative bg-gray-800 w-full h-44  ">
                          <PencilIcon className="right-2 cursor-pointer h-6 w-6 absolute text-gray-900 hover:text-blue-700 -rotate-140"  onClick={()=>coverPickerRef.current.click()}/>
                          <input type="file" onChange={addCoverPhoto} ref={coverPickerRef} accept="image/*" hidden/>
                            <img
                            src={`${coverImage?coverImage:''}`}                              alt="kitty"
                              className="rounded-sm h-44 w-full object-cover mr-2"
                            />
                            
                            <div className="absolute   -bottom-10 left-6 w-28 rounded-2xl bg-white h-28 ">
                            <PencilIcon className="right-2 bottom-2 cursor-pointer h-6 w-6 absolute text-gray-900 hover:text-blue-700 -rotate-140" onClick={()=>profilePickerRef.current.click()}/>
                              <img
                                 src={`${profileImage?profileImage:''}`}
                                alt="kitty"
                                className="rounded-2xl h-full w-full object-cover mr-2"
                              />
                              <input type="file" accept="image/*" onChange={addProfilePhoto} ref={profilePickerRef} hidden  />
                            </div>
                          </div>
                        </div>

                        <div className="mt-7 flex space-x-3 w-full">
                          <div className="flex-grow mt-5">
                          <form  onSubmit={updatePost}>
                            <div className="mb-4">
                              
                              <label className="block text-gray-300 text-sm font-bold mb-2">
                                full name
                              </label>
                              <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-black leading-tight focus:outline-none focus:shadow-outline"
                                id="fullname"
                                type="text"
                                name="fullname"
                                defaultValue={company?.fullname}
                                placeholder="ceo name"
                              />
                            </div>
                            <div className="mb-6">
                              <label className="block text-gray-300 text-sm font-bold mb-2">
                                company name
                              </label>
                              <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-black leading-tight focus:outline-none focus:shadow-outline"
                                id="companyname"
                                name="company"
                                defaultValue={company?.company}
                                type="text"
                                placeholder="company name"
                              />
                        
                            </div>
                            <div className="mb-4">
                              <label className="block text-gray-300 text-sm font-bold mb-2">
                                Email
                              </label>
                              <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-black leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                placeholder="jhon@gmail.com"
                                name="email"
                                defaultValue={company?.email}
                              />
                            </div>

                            

                            <div className="mb-4">
                              <label className="block text-gray-300 text-sm font-bold mb-2">
                                number of employees your company
                              </label>
                              <select
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-black leading-tight focus:outline-none focus:shadow-outline"
                                id="employeeCount"
                                name="employeeCount"
                                placeholder="Username"
                                defaultValue={company?.employeeCount}
                              >
                                <option value={10}>0-10</option>
                                <option value={50}>10-50</option>
                                <option value={100}>50-100</option>
                                </select>
                            </div>


                            <div className="mb-4">
                              <label className="block text-gray-300 text-sm font-bold mb-2">
                                Industry
                              </label>
                              <select
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-black leading-tight focus:outline-none focus:shadow-outline"
                                id="industry"
                                name="industry"
                                placeholder="industry"
                                defaultValue={company?.industry}
                              >
                                    <option value='software'>Software</option>
                                    <option value='medical'>Medical</option>
                                    <option value='education'>Education</option>
                                    <option value='medical'>Medical</option>
                                    <option value='textile'>Textile</option>
                                    <option value='media'>Media and news</option>
                                    <option value='construction'>Construction</option>
                                    <option value='advertising'>Advertising</option>
                                </select>
                            </div>

                            <div className="mb-4">
                              <label className="block text-gray-300 text-sm font-bold mb-2">
                                Description
                              </label>
                              <textarea
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-black leading-tight focus:outline-none focus:shadow-outline"
                                placeholder=""
                                name="description"
                                defaultValue={company?.description}
                              ></textarea>
                            </div>
                            

                    

                         


                       

                            <div className="flex items-center justify-between pt-2.5">
                              <button
                                className="bg-white ml-auto text-black rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
                                type="submit"
                                // disabled={!comment.trim()}
                              >
                                Update
                              </button>
                            
                            </div>
                            </form>
                          </div>
                       
                        </div>
                      </div>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
    )}</>
  );
}

export default CompanyProfileComponent;
