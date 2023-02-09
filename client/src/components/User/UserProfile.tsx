// import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, createTheme } from "@mui/material"
import { useState,Fragment } from "react";
import { ThemeProvider } from "@mui/material";
import { Dialog, Transition } from '@headlessui/react'
import { ChartBarIcon, XMarkIcon } from "@heroicons/react/24/solid";

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
function UserProfile({users}:any) {
  const [open, setOpen] = useState(false);
  let [isOpen, setIsOpen] = useState(true)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
  return (
    <div className="h-64">
        <div className="relative bg-gray-800 w-full h-44  ">
        <img src="https://webtoolfeed.files.wordpress.com/2012/10/glasses-cat1.jpg" alt="kitty" className="rounded-sm h-44 w-full object-cover mr-2"  />
        <div className="absolute   -bottom-10 left-6 w-28 rounded-2xl bg-white h-28 ">
        <img src="https://www.alleycat.org/wp-content/uploads/2019/03/FELV-cat.jpg" alt="kitty" className="rounded-2xl h-full w-full object-cover mr-2"  />
        </div>
            <div className="h-px mt-10 flex justify-between">
                <div className="w-44 ">
               <p className="text-white font-semibold text-center">{users?.firstname} {users?.lastname}</p> 
               <p className="text-gray-500  text-center">{users?.recentjob}</p>
                </div>
                <div className="ml-auto mr-3">
                <button className="border border-white rounded px-4 py-1 text-white font-semibold" onClick={openModal}>Edit profile</button>
                </div>
            </div>
        </div>



  <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <div className="flex items-start justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                onClick={()=>setIsOpen(false)}
              >
                <XMarkIcon className="h-[22px] text-white" />
              </div>
              <div className="text-white">
        User edit
              </div>
            </div>
            <div className="flex px-4 pt-5 pb-2.5 sm:px-6">
              <div className="w-full">
                <div className="text-[#6e767d] flex gap-x-3 relative">
                <div className="relative bg-gray-800 w-full h-44  ">
                <img src="https://webtoolfeed.files.wordpress.com/2012/10/glasses-cat1.jpg" alt="kitty" className="rounded-sm h-44 w-full object-cover mr-2"  />
                <div className="absolute   -bottom-10 left-6 w-28 rounded-2xl bg-white h-28 ">
                <img src="https://www.alleycat.org/wp-content/uploads/2019/03/FELV-cat.jpg" alt="kitty" className="rounded-2xl h-full w-full object-cover mr-2"  />
                </div>
                  </div>
                </div>

                <div className="mt-7 flex space-x-3 w-full">
                  <div className="flex-grow mt-2">
                  <div class="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
        Username
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
        Password
      </label>
      <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
      <p className="text-red-500 text-xs italic">Please choose a password.</p>
    </div>

                    <div className="flex items-center justify-between pt-2.5">
                      <button
                        className="bg-white ml-auto text-black rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
                        type="submit"
                        // onClick={sendComment}
                        // disabled={!comment.trim()}
                      >
                        Update
                      </button>
                    </div>
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
  )
}

export default UserProfile