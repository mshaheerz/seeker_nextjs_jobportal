import { useRef, useState } from "react"
import {XCircleIcon,PhotoIcon, ChartBarIcon,VideoCameraIcon, FaceSmileIcon } from "@heroicons/react/24/solid"
import Picker from "@emoji-mart/react"
import { Data } from "emoji-mart"
import { fabClasses } from "@mui/material"


function Input() {
   
    const [input, setInput] =useState('')
    const [selectedFile, setSelectedFile]:any =useState(null)
    const [showEmojis, setShowEmojis]= useState(false)
    const [loading, setLoading] = useState(false)
    const filePickerRef = useRef<HTMLInputElement>(0)

    const sendPost=()=>{
        if(loading) return;
        setLoading(true)

        
    }


    const addEmoji= (e:any)=>{
        let sym = e.unified.split("-");
        console.log(sym)
        let codeArray: any[] = [];
        sym.forEach((element:any) => {
                codeArray.push("0x" +element);
        });
        let imoji = String.fromCodePoint(...codeArray);
        setInput(input+imoji)
    }

    
    const addImageToPost=()=>{

    }
  return (
    <div className={`border-b border-gray-700 p-3 flex space-x-3 overflow-y-scroll overflow-hidden no-scrollbar`}>
        <img src="https://lh3.googleusercontent.com/ogw/AAEL6sgG2UNiqo6FhnY0vomhQbCo9WLthbflYev4z7iaBg=s32-c-mo" alt="loading" 
        className="h-11 w-11 rounded-full cursor-pointer" />
        <div className="w-full divide-y divide-gray-700">
            <div className={`${selectedFile && "pb-7"} ${input && "space-y-2.5"}`}>
                <textarea 
                placeholder="New Achivements?"
                onChange={(e)=>setInput(e.target.value)}
                value={input}
                rows={2}
                className="bg-transparent outline-none text-[d9d9d9] text-lg placeholder-gray-500  tracking-wide w-full min-h-[50px] "
                />
                {/* icons */}
                {selectedFile && (
                     <div className="relative">
                    <div 
                    className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer"
                    onClick={()=>setSelectedFile(null)}
                    >
                        <XCircleIcon className="text-white h-5" />
                    </div>
                    <img src={selectedFile} className="rounded-2xl max-h-80 object-contain" alt="fds" />
                </div> 
                )}
              
            </div>

            <div className="flex items-center justify-between pt-2.5">
               <div className="flex item-center">
                <div className="icon" onClick={()=>filePickerRef.current.click()}>
                    <PhotoIcon className="h-[22px] text-[#fff]"/>
                    <input type="file" onChange={addImageToPost} ref={filePickerRef} hidden/>
                </div>

                <div className="icon rotate-90">
                    <ChartBarIcon className="h-[22px] text-[#fff]"/>
                   
                </div>
                

                <div className="icon" onClick={()=>setShowEmojis(!showEmojis)}>
                    <FaceSmileIcon className="h-[22px] text-[#fff]"/>
                    
                </div>




                {showEmojis &&(
                    <Picker
                    
                    onEmojiSelect={addEmoji}
                    data={Data}
                    skin={{
                        position:'absolute',
                        marginTop:"465px",
                        marginLeft:-40,
                        maxWidth: "320px",
                        borderRadius:"20px"
                    }}
                    theme="dark"
                    />
                )}
               </div>
               <button className="bg-white text-black rounded-2xl px-4 py-1.5 font-bold shadow-md hover:bg-slate-600 disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default" disabled={!input.trim() && !selectedFile}>
                Send
               </button>
            </div>
       
        </div>
    </div>
  )
}

export default Input