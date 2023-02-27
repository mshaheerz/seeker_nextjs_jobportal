// import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, createTheme } from "@mui/material"
import { useState, Fragment, useRef, use } from "react";
import { ThemeProvider } from "@mui/material";
import { Dialog, Transition } from "@headlessui/react";
import { ChartBarIcon, PencilIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { editProfile } from "@/config/endpoints";
import Loading from "@/pages/loading";
import { user } from "@/redux/signupdetails";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

function CompanyProfile({ company }: any) {
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
      reader.onload = (readerEvent: any) => {
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
      reader.onload = (readerEvent: any) => {
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
                company?.cover
                  ? company.cover
                  : "https://webtoolfeed.files.wordpress.com/2012/10/glasses-cat1.jpg"
              }`}
              alt="kitty"
              className="rounded-sm h-44 w-full object-cover mr-2"
            />
            <div className="absolute   -bottom-10 left-6 w-28 rounded-2xl bg-white h-28 ">
              <img
                src={`${
                  company?.image
                    ? company.image
                    : "https://www.alleycat.org/wp-content/uploads/2019/03/FELV-cat.jpg"
                }`}
                alt="kitty"
                className="rounded-2xl h-full w-full object-cover mr-2"
              />
            </div>
            <div className="h-px mt-10 flex justify-between">
              <div className="w-44 ">
                <p className="text-white font-semibold text-center">
                  {company?.company}
                </p>
                <p className="text-gray-500  text-center">
                  {company?.industry}
                </p>
              </div>
              <div className="ml-auto mr-3">
                <button
                  className="border border-white rounded px-4 py-1 text-white font-semibold"
                  onClick={openModal}
                >
                  Ask?
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CompanyProfile;
