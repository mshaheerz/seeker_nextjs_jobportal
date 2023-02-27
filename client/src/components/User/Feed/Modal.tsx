import {setisopen} from '@/redux/setisopen'
import {setpostid} from '@/redux/setpostid'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Moment from "react-moment";
import { CalendarIcon,XMarkIcon, ChartBarIcon } from '@heroicons/react/24/solid';
import { getPosts, addComment, fetchComments } from '@/config/endpoints';
import axios from '@/config/axios';
import { refreshComment } from '@/redux/refreshcomment';

  
function Modal() {

const commentrefresh = useSelector((state:any)=>state.refreshcomment.value)
const user = useSelector((state:any)=>state.user.value)
const isOpen = useSelector((state:any)=>state.setisopen.value)
const postId = useSelector((state:any)=>state.setpostid.value)
const dispatchpostid = useDispatch()
//setpostid
const dispatchisopen = useDispatch()
//setisopen
const setCommentRefresh = useDispatch()
//refreshComment
const router = useRouter();
const [post, setPost] = useState<any>([]);
const [comment, setComment] = useState("");




useEffect(() => {
    axios.post('/getonepost',{postId:postId},{headers:{"usertoken":localStorage.getItem("usertoken")}}).then((response)=>{
      setPost(response.data.posts)
      setCommentRefresh(refreshComment(!commentrefresh))
    }).catch((error:any) => {alert(error.message)});
    
  }, [isOpen])

const sendComment = async (e:any) => {
      
    const data = await addComment({text:comment,user:user.userId,post:post._id},{"usertoken":localStorage.getItem("usertoken")})
    console.log(data)
    dispatchisopen( setisopen(false))
    setCommentRefresh(refreshComment(!commentrefresh))
    setComment("");
}

  return (
    <Transition.Root show={isOpen} as={Fragment}>
    <Dialog as="div" className="fixed z-50 inset-0 pt-8" onClose={setisopen}>
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
          <Dialog.Overlay className="fixed inset-0 bg-[#5b7083] bg-opacity-40 transition-opacity" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enterTo="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div className="inline-block align-bottom bg-black rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
            <div className="flex items-center px-1.5 py-2 border-b border-gray-700">
              <div
                className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
                onClick={() => dispatchisopen(setisopen(false))}
              >
                <XMarkIcon className="h-[22px] text-white" />
              </div>
            </div>
            <div className="flex px-4 pt-5 pb-2.5 sm:px-6">
              <div className="w-full">
                <div className="text-[#6e767d] flex gap-x-3 relative">
                  <span className="w-0.5 h-full z-[-1] absolute left-5 top-11 bg-gray-600" />
                  <img
                     src={user?.image ? user.image :'https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg'}
                    alt=""
                    className="h-11 w-11 rounded-full"
                  />
                  <div>
                    <div className="inline-block group">
                      <h4 className="font-bold text-[#d9d9d9] inline-block text-[15px] sm:text-base">
                       {post?.user?.firstname}
                      </h4>
                      <span className="ml-1.5 text-sm sm:text-[15px]">
                        {/* @{post?.tag}{" "} */}
                      </span>
                    </div>{" "}
                    ·{" "}
                    <span className="hover:underline text-sm sm:text-[15px]">
                      <Moment fromNow>{post?.updatedAt}</Moment>
                    </span>
                    <p className="text-[#d9d9d9] text-[15px] sm:text-base">
                      {post?.text}
                    </p>
                  </div>
                </div>

                <div className="mt-7 flex space-x-3 w-full">
                  <img
                    src={user?.image ? user.image :'https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg'}
                    alt="error"
                    className="h-11 w-11 rounded-full"
                  />
                  <div className="flex-grow mt-2">
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Comment your reply"
                      rows={2}
                      className="bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full min-h-[80px]"
                    />

                    <div className="flex items-center justify-between pt-2.5">
                      <div className="flex items-center">
                        <div className="icon">
                          <ChartBarIcon className="text-[#1d9bf0] h-[22px]" />
                        </div>

       
                      </div>
                      <button
                        className="bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
                        type="submit"
                        onClick={sendComment}
                        disabled={!comment.trim()}
                      >
                        Comment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition.Child>
      </div>
    </Dialog>
  </Transition.Root>
  )
}

export default Modal