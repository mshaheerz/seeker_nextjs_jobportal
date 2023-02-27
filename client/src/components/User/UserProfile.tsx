// import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, createTheme } from "@mui/material"
import { useState, Fragment, useRef, use } from "react";
import { ThemeProvider } from "@mui/material";
import { Dialog, Transition } from "@headlessui/react";
import { ChartBarIcon, PencilIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { createChat, editProfile } from "@/config/endpoints";
import Loading from "@/pages/loading";
import { user } from "@/redux/signupdetails";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Message } from "@mui/icons-material";
import { useRouter } from "next/router";

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

function UserProfile({ users, profile, currentUserId }: any) {
  const router = useRouter();
  const dispatch = useDispatch();
  //user
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  let [isOpen, setIsOpen] = useState(false);
  const coverPickerRef = useRef<any>(0);
  const profilePickerRef = useRef<any>(0);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const addCoverPhoto = (e: any) => {
    try {
      let filePath = e.target.files[0].name;
      // Allowing file type
      let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
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
      if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
      }
      reader.onload = (readerEvent:any) => {
        setCoverImage(readerEvent.target.result);
      };
    } catch (error) {
      console.log(error);
    }
  };

  const addProfilePhoto = (e: any) => {
    try {
      let filePath = e.target.files[0].name;
      // Allowing file type
      let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
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
      if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
      }
      reader.onload = (readerEvent:any) => {
        setProfileImage(readerEvent.target.result);
      };
    } catch (error) {
      console.log(error);
    }
  };
  const updatePost = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(false);
    const data = new FormData(event.currentTarget);
    let obj = {
      firstname: data.get("firstname"),
      lastname: data.get("lastname"),
      email: data.get("email"),
      city: data.get("city"),
      state: data.get("state"),
      zip: data.get("zip"),
      recentjob: data.get("recentjob"),
      recentcompany: data.get("recentcompany"),
      school: data.get("school"),
      image: profileImage || null,
      cover: coverImage || null,
    };

    let regEmail =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (
      obj.firstname &&
      obj.lastname &&
      obj.email &&
      obj.city &&
      obj.state &&
      obj.zip &&
      obj.recentcompany &&
      obj.recentjob &&
      obj.school
    ) {
      if (regEmail.test(obj.email.toString())) {
        const data = await editProfile(obj, {
          usertoken: localStorage.getItem("usertoken"),
        });
        console.log(data);
        if (data.status === "success") {
          setIsOpen(false);
          console.log(data);
          dispatch(user(data.user));
        } else {
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
      } else {
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
    } else {
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
    setLoading(false);
  };

  const handleChat = async () => {
    console.log(currentUserId, users?._id);
    const data = await createChat({
      senderId: currentUserId,
      receiverId: users?._id,
    });
    router.push("/chat");
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="h-64">
          <ToastContainer />

          <div className="relative bg-gray-800 w-full h-44  ">
            <img
              src={`${
                users?.cover
                  ? users.cover
                  : "https://webtoolfeed.files.wordpress.com/2012/10/glasses-cat1.jpg"
              }`}
              alt="kitty"
              className="rounded-sm h-44 w-full object-cover mr-2"
            />
            <div className="absolute   -bottom-10 left-6 w-28 rounded-2xl bg-white h-28 ">
              <img
                src={`${
                  users?.image
                    ? users.image
                    : "https://www.alleycat.org/wp-content/uploads/2019/03/FELV-cat.jpg"
                }`}
                alt="kitty"
                className="rounded-2xl h-full w-full object-cover mr-2"
              />
            </div>
            <div className="h-px mt-10 flex justify-between">
              <div className="w-44 ">
                <p className="text-white font-semibold text-center">
                  {users?.firstname} {users?.lastname}
                </p>
                <p className="text-gray-500  text-center">{users?.recentjob}</p>
              </div>
              <div className="ml-auto mr-3">
                {profile ? (
                  <Message
                    className="text-white mr-4 cursor-pointer"
                    onClick={handleChat}
                  />
                ) : (
                  <button
                    className="border border-white rounded px-4 py-1 text-white font-semibold"
                    onClick={openModal}
                  >
                    Edit profile
                  </button>
                )}
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
                                <PencilIcon
                                  className="right-2 cursor-pointer h-6 w-6 absolute text-gray-900 hover:text-blue-700 -rotate-140"
                                  onClick={() => coverPickerRef.current.click()}
                                />
                                <input
                                  type="file"
                                  onChange={addCoverPhoto}
                                  ref={coverPickerRef}
                                  accept="image/*"
                                  hidden
                                />
                                <img
                                  src={`${coverImage ? coverImage : ""}`}
                                  alt="kitty"
                                  className="rounded-sm h-44 w-full object-cover mr-2"
                                />

                                <div className="absolute   -bottom-10 left-6 w-28 rounded-2xl bg-white h-28 ">
                                  <PencilIcon
                                    className="right-2 bottom-2 cursor-pointer h-6 w-6 absolute text-gray-900 hover:text-blue-700 -rotate-140"
                                    onClick={() =>
                                      profilePickerRef.current.click()
                                    }
                                  />
                                  <img
                                    src={`${profileImage ? profileImage : ""}`}
                                    alt="kitty"
                                    className="rounded-2xl h-full w-full object-cover mr-2"
                                  />
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={addProfilePhoto}
                                    ref={profilePickerRef}
                                    hidden
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="mt-7 flex space-x-3 w-full">
                              <div className="flex-grow mt-5">
                                <form onSubmit={updatePost}>
                                  <div className="mb-4">
                                    <label className="block text-gray-300 text-sm font-bold mb-2">
                                      Firstname
                                    </label>
                                    <input
                                      className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-black leading-tight focus:outline-none focus:shadow-outline"
                                      id="lastname"
                                      type="text"
                                      name="firstname"
                                      defaultValue={users?.firstname}
                                      placeholder="firstname"
                                    />
                                  </div>
                                  <div className="mb-6">
                                    <label className="block text-gray-300 text-sm font-bold mb-2">
                                      Lastname
                                    </label>
                                    <input
                                      className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-black leading-tight focus:outline-none focus:shadow-outline"
                                      id="lastname"
                                      name="lastname"
                                      defaultValue={users?.lastname}
                                      type="text"
                                      placeholder="lastname"
                                    />
                                    {/* <p className="text-red-500 text-xs italic">
                                Please choose a password.
                              </p> */}
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
                                      defaultValue={users?.email}
                                    />
                                  </div>

                                  <div className="mb-4">
                                    <label className="block text-gray-300 text-sm font-bold mb-2">
                                      city
                                    </label>
                                    <input
                                      className="shadow appearance-none border rounded w-full py-2 px-3 text-white  bg-black leading-tight focus:outline-none focus:shadow-outline"
                                      id="city"
                                      type="text"
                                      name="city"
                                      placeholder="malappuram"
                                      defaultValue={users?.city}
                                    />
                                  </div>

                                  <div className="mb-4">
                                    <label className="block text-gray-300 text-sm font-bold mb-2">
                                      state
                                    </label>
                                    <select
                                      className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-black leading-tight focus:outline-none focus:shadow-outline"
                                      id="username"
                                      name="state"
                                      placeholder="Username"
                                      defaultValue={users?.state}
                                    >
                                      <option value="kerala">kerala</option>
                                      <option value="karnataka">
                                        karnataka
                                      </option>
                                      <option value="Thamilnadu">
                                        Thamilnadu
                                      </option>
                                    </select>
                                  </div>

                                  <div className="mb-4">
                                    <label className="block text-gray-300 text-sm font-bold mb-2">
                                      zip
                                    </label>
                                    <input
                                      className="shadow appearance-none border text-white rounded w-full py-2 px-3  bg-black leading-tight focus:outline-none focus:shadow-outline"
                                      id="zip"
                                      type="number"
                                      name="zip"
                                      placeholder="zip"
                                      defaultValue={users?.zip}
                                    />
                                  </div>

                                  <div className="mb-4">
                                    <label className="block text-gray-300 text-sm font-bold mb-2">
                                      recentjob
                                    </label>
                                    <input
                                      className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-black leading-tight focus:outline-none focus:shadow-outline"
                                      id="recentjob"
                                      type="text"
                                      name="recentjob"
                                      placeholder="recentjob"
                                      defaultValue={users?.recentjob}
                                    />
                                  </div>

                                  <div className="mb-4">
                                    <label className="block text-gray-300 text-sm font-bold mb-2">
                                      recentcompany
                                    </label>
                                    <input
                                      className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-black leading-tight focus:outline-none focus:shadow-outline"
                                      id="recentcompany"
                                      type="text"
                                      placeholder="recentcompany"
                                      name="recentcompany"
                                      defaultValue={users?.recentcompany}
                                    />
                                  </div>

                                  <div className="mb-4">
                                    <label className="block text-gray-300 text-sm font-bold mb-2">
                                      school
                                    </label>
                                    <input
                                      className="shadow appearance-none border rounded w-full py-2 px-3 text-white  bg-black leading-tight focus:outline-none focus:shadow-outline"
                                      id="school"
                                      type="text"
                                      placeholder="university"
                                      name="school"
                                      defaultValue={users?.school}
                                    />
                                  </div>

                                  <div className="mb-4">
                                    <label className="block text-gray-300 text-sm font-bold mb-2">
                                      resume
                                    </label>
                                    <input
                                      className="shadow appearance-none border rounded w-full py-2 px-3  bg-black leading-tight focus:outline-none focus:shadow-outline"
                                      id="username"
                                      type="file"
                                      placeholder="Username"
                                      name="resume"
                                    />
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
      )}
    </>
  );
}

export default UserProfile;
