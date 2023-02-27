import { useContext, useRef, useState } from "react";
import {
  XCircleIcon,
  PhotoIcon,
  FaceSmileIcon,
} from "@heroicons/react/24/solid";
import Picker from "@emoji-mart/react";
import { Data } from "emoji-mart";
import { useSelector } from "react-redux";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import { db, storage } from "@/firebase/firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import axios from "@/config/axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import { AppContext } from "@/context/AppContext";
function Input() {
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile]: any = useState(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setPostRefresh, postRefresh }: any = useContext(AppContext);
  const filePickerRef = useRef<any>(0);
  // HTMLInputElement
  const users = useSelector((state: any) => state.user.value);
  const router = useRouter();

  const sendPost = async () => {
    if (loading) return;
    setLoading(true);

    const docRef = await addDoc(collection(db, "posts"), {
      text: input,
      timestamp: serverTimestamp(),
    });
    axios
      .post(
        "/userpost",
        {
          googleid: docRef.id,
          text: input,
        },
        {
          headers: { usertoken: localStorage.getItem("usertoken") },
        }
      )
      .then((resonse) => {
        console.log(resonse.data);
      })
      .catch((error) => {
        console.log(error.message);
      });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);
    if (selectedFile) {
      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);

        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });

        axios
          .post(
            "/userpostupdate",
            {
              googleid: docRef.id,
              text: input,
              image: downloadURL,
            },
            {
              headers: { usertoken: localStorage.getItem("usertoken") },
            }
          )
          .then((response) => {
            if (response.data.status === "success") {
              toast.success(`success! ${response?.data?.message}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
            } else {
              toast.error(`OOPS! ${response?.data?.message}`, {
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
          })
          .catch((error) => {
            toast.error(`OOPS! ${error.message}`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          });
      });
    }

    setLoading(false);
    setInput("");
    setSelectedFile(null);
    setShowEmojis(false);
    setPostRefresh(!postRefresh);
    console.log(postRefresh);
  };

  const addEmoji = (e: any) => {
    let sym = e.unified.split("-");
    console.log(sym);
    let codeArray: any[] = [];
    sym.forEach((element: any) => {
      codeArray.push("0x" + element);
    });
    let imoji = String.fromCodePoint(...codeArray);
    setInput(input + imoji);
  };

  const addImageToPost = (e: any) => {
    try {
      let filePath = e.target.files[0]?.name;
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
        setSelectedFile(readerEvent.target.result);
      };
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className={`border-b border-gray-700 p-3 flex space-x-3 overflow-y-scroll overflow-hidden no-scrollbar ${
        loading && "opacity-60"
      }`}
    >
      <ToastContainer />
      <img
        src={users?.image}
        alt="loading"
        className="h-11 w-11 rounded-full cursor-pointer"
      />
      <div className="w-full divide-y divide-gray-700">
        <div className={`${selectedFile && "pb-7"} ${input && "space-y-2.5"}`}>
          <textarea
            placeholder="New Achivements?"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            rows={2}
            className="bg-transparent outline-none text-[d9d9d9] text-lg placeholder-gray-500  tracking-wide w-full min-h-[50px] "
          />
          {/* icons */}
          {selectedFile && (
            <div className="relative">
              <div
                className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer"
                onClick={() => setSelectedFile(null)}
              >
                <XCircleIcon className="text-white h-5" />
              </div>
              <img
                src={selectedFile}
                className="rounded-2xl max-h-80 object-contain"
                alt="fds"
              />
            </div>
          )}
        </div>
        {!loading && (
          <div className="flex items-center justify-between pt-2.5">
            <div className="flex item-center">
              <div
                className="icon"
                onClick={() => filePickerRef.current.click()}
              >
                <PhotoIcon className="h-[22px] text-[#fff]" />
                <input
                  type="file"
                  onChange={addImageToPost}
                  accept="image/*"
                  ref={filePickerRef}
                  hidden
                />
              </div>

              <div className="icon ">
                <VideoLibraryIcon className="h-[22px] text-[#fff]" />
              </div>

              <div className="icon" onClick={() => setShowEmojis(!showEmojis)}>
                <FaceSmileIcon className="h-[22px] text-[#fff]" />
              </div>

              {showEmojis && (
                <Picker
                  onEmojiSelect={addEmoji}
                  data={Data}
                  skin={{
                    position: "absolute",
                    marginTop: "465px",
                    marginLeft: -40,
                    maxWidth: "320px",
                    borderRadius: "20px",
                  }}
                  theme="dark"
                />
              )}
            </div>
            <button
              onClick={sendPost}
              className="bg-white text-black rounded-2xl px-4 py-1.5 font-bold shadow-md hover:bg-slate-600 disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
              disabled={!input.trim() && !selectedFile}
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Input;
