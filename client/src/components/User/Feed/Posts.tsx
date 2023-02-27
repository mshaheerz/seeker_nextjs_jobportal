
import {ChartBarIcon, EllipsisHorizontalIcon, HeartIcon, ShareIcon, TrashIcon,ChatBubbleLeftIcon,ArrowRightIcon} from '@heroicons/react/24/solid'
import { useRouter } from 'next/router'
import HeartIconout from '@heroicons/react/24/outline/HeartIcon'
import Moment from 'react-moment'
import {setpostid} from '@/redux/setpostid'
import {refreshComment} from '@/redux/refreshcomment'
import {setisopen} from '@/redux/setisopen'
import { useDispatch, useSelector } from 'react-redux'
import { useContext, useEffect, useState } from 'react'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '@/firebase/firebase'
import { deletePost, unLike, postLike } from '@/config/endpoints'
import { AppContext } from '@/context/AppContext'
import { fetchComments,fetchLikes} from '@/config/endpoints'
import { IconButton, fabClasses } from '@mui/material'   
import {HandThumbUpIcon} from '@heroicons/react/24/solid'
import axios from '@/config/axios'
import { user } from '@/redux/signupdetails'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import swal from 'sweetalert'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer,toast } from "react-toastify"
import { flagPost } from '@/config/endpoints'
const options = [

  'spam',
  'Hate speech or symbols',
  'Bullying or harassment',
  'Suicide or self-injury',
  'Scams or fraud',
  'False information'



];

const ITEM_HEIGHT = 48;
import { TwitterShareButton,OKShareButton } from 'react-share';
import { BorderAll, BorderLeft, Report } from '@mui/icons-material'
function Posts({post, postPage}:any) {
   
    const router = useRouter()
    const users = useSelector((state:any)=>state.user.value)
    const dispatchpostid = useDispatch()
    //setpostid
    const dispatchisopen = useDispatch()
    //setisopen
    const setCommentRefresh = useDispatch()
    //refreshComment
    const dispatch = useDispatch()
    //user
    const postss = useSelector((state:any)=>state.setpostid.value)
    const [comments, setComments]= useState(['1'])
    const [liked, setLiked]= useState(false)
    const [likes, setLikes]= useState(['1'])
    const {setPostRefresh,postRefresh}:any = useContext(AppContext)
    const [changes, setChanges]=useState(fabClasses)


    const refreshcomment = useSelector((state:any)=>state.refreshcomment.value)
      // setpostid(setpostid({name:'fd'}))
     
  

      useEffect(() => {
        if(localStorage.getItem('usertoken')){
           axios.get('/isUserAuth',{
             headers:{'usertoken':localStorage.getItem("usertoken")}
           }).then((response)=>{
             if(response.data.status==="failed"){
               router.push('/auth')
             }else if(response.data.auth){
               dispatch(user(response.data))
             }else{
               router.push('/auth')
             }
           })
        }else{
         router.push('/auth')
        }
       
       }, [])

      useEffect(() => {
        async function invoke(){
          const data = await fetchComments(post?._id,{"usertoken":localStorage.getItem("usertoken")})
          
          setComments(data.comments)
          
        } 
        invoke();
       
      }, [refreshcomment])


    useEffect(() => {
      async function fetchlike(){
        const data = await fetchLikes(post._id,{"usertoken":localStorage.getItem("usertoken")})
   
        setLikes(data.likes)
      }
      fetchlike();
        
    },[liked])


      useEffect(() => 
      setLiked(
        likes?.findIndex((like:any)=>like?.user===users?.userId) !==-1
      ),
       [likes])
      


      const likePost = async() =>{
        if(liked){
         
           const data = await unLike({postId:post._id,userId:users?.userId})
           setLiked(false)
          console.log(data)
        }else{
    
          const data = await postLike({postId:post._id,userId:users?.userId})
          setLiked(true)
          console.log(data)
        }
      }

      const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
      const open = Boolean(anchorEl);
      const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        console.log(event.currentTarget.dataset)
        setAnchorEl(event.currentTarget);
    
      };
      const handleClose = (event:any) => {
        event.stopPropagation();
        console.log(event.currentTarget.dataset)
        console.log(event.target.value)
        setAnchorEl(null);

      };
  
  return (
    <div className="p-3 flex cursor-pointer border-b border-gray-700 " onClick={()=>{
        router.push(`/${post._id}`)
    }}>
      <ToastContainer />

    {!postPage && (
        <img src={post?.user?.image} onClick={(e:any)=>{
          e.stopPropagation();
          router.push(`/user/${post?.user?._id}`)
        }} alt="loading" className="h-11 w-11 rounded-full mr-4" />)}
        <div className="flex flex-col space-y-2 w-full">
        <div className={`flex ${!postPage && "justify-between"}`}>
            {postPage && (
            <img src={post?.user?.image} alt="profie" className="h-11 w-11 rounded-full mr-4" />
            )}

            <div className="text-[#6e767d]">
                <div className="inline-block group">
                <h4 className={`font-bold text-[15px] sm:text-base text-[#d9d9d9] group-hover:underline ${!postPage && "inline-block"}`}> {post?.user?.firstname} {post?.user?.lastname} </h4>
                <span className={`text-sm sm:text-[15px] ${!postPage && "ml-1.5"}`}>@{post?.user?._id.substring(3,9)}</span>
                </div>{" "}
                ·{" "}
                <span className="hover:underline text-sm sm:text-[15px] sm:text-base mt-0.5">
                <Moment fromNow>{post?.updatedAt}</Moment>
                </span>
                {!postPage && (
                    <p className="text-[#d9d9d9] text-[15px]">{post?.text}</p>
                )}
            </div>
            <div className="icon group flex-shrink-0 ml-auto">
                <EllipsisHorizontalIcon className='h-5 text-[#6e767d] group-hover:text-[#1d9bf0]'/>

            </div>
        </div>
        {postPage && (
            <p className='text-[#d9d9d9] text-[15px] sm:text-base mt-0.5'>
                {post?.text}
            </p>
        )}
        {
      post?.image &&
     
        <img src={post?.image} alt="somthing" className='round-2xl max-h-[700px] object-cover mr-2' />
      }
        <div className={`text-[#6e767d] flex justify-between w-10/12 ${postPage && "mx-auto"}`}>
            {/* newwwwwwwwwwwwww */}
            <div
            className="flex items-center space-x-1 group"
            onClick={(e) => {
              e.stopPropagation();
              dispatchpostid(setpostid(post._id));
              dispatchisopen(setisopen(true));
            }}
          >
            <div className="icon  group-hover:bg-[#1d9bf0] group-hover:bg-opacity-10">
              <ChatBubbleLeftIcon className="h-5 group-hover:text-[#1d9bf0]" />
            </div>
            {comments?.length > 0 && (
              <span className="group-hover:text-[#1d9bf0] text-sm">
                {comments?.length}
              </span>
            )}
          </div>

          {users?.userId === post?.user._id ? (
            <div
              className="flex items-center space-x-1 group"
              onClick={async (e) => {
                e.stopPropagation();
                swal({
                  title: "Are you sure?",
                  text: "post delete",
                  icon: "warning",
                  buttons: ["cancel","ok"],
                  dangerMode: true,
                })
                .then(async (willDelete) => {
                  if (willDelete) {
                console.log(post.googleid)
                deleteDoc(doc(db, "posts", post?.googleid))
                const data = await deletePost(post._id)
                console.log(data)
                if(data.status==='success'){
                    setPostRefresh(!postRefresh)
                    //success message
                    router.push("/");

                }else{
                    //error message 
                }
                  } 
                });
              
              }}
            >
              <div className="icon group-hover:bg-red-600/10">
                <TrashIcon className="h-5 group-hover:text-red-600" />
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-1 group">
              <div className="icon group-hover:bg-green-500/10">
              <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? 'long-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleClick}
      >
      <Report className="h-5 text-gray-500 group-hover:text-green-500" />

        </IconButton>
              </div>
            </div>
          )}
 <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '30ch',
            background:'black',
            color:'white'
          
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option}  selected={option === 'spam'} onClick={async (event:any)=>{
            event.stopPropagation();
            console.log(event.currentTarget.dataset)
            console.log(event.target.value)
            setAnchorEl(null);
            console.log(option)
            const data = await flagPost({flag:option,postId:post?._id},{'usertoken':localStorage.getItem('usertoken')})
            console.log(data)
            if(data.status=='failed'){

              toast.error(`This post already reported`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            }else {
              toast.success(`successfully reported post`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            }
            }}>
            {option}
          </MenuItem>
        ))}
      </Menu>
          <div
            className="flex items-center space-x-1 group"
            onClick={(e) => {
              e.stopPropagation();
              likePost();
            }}
          >
            <div className="icon group-hover:bg-pink-600/10">
              {liked ? (
                <HandThumbUpIcon className="h-5 text-pink-600" />
              ) : (
                <HandThumbUpIcon className="h-5 group-hover:text-pink-600" />
              )}
            </div>
            {likes?.length > 0 && (
              <span
                className={`group-hover:text-pink-600 text-sm ${
                  liked && "text-pink-600"
                }`}
              >
                {likes?.length}
              </span>
            )}
          </div>

          <div className="icon group">
            {/* <OKShareButton  quote={'Dummy text!'} url={'http://localhost:3000/'} > */}
              <ShareIcon onClick={(e)=>{
                e.stopPropagation();
                navigator.clipboard.writeText(`http://localhost:3000/${post._id}`);
                toast.success(`Link copied to clipboard`, {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                  });
              }} className="h-5 group-hover:text-[#1d9bf0]"/>
              
              {/* </OKShareButton> */}
          </div>
     
            {/* newwwwwwwwwwwwwwwwwwwww */}

        </div>
        </div>
    </div>
  )}
  

export default Posts

function dispatch(arg0: any) {
  throw new Error('Function not implemented.')
}
function setUserDetails(arg0: { name: string; recentjob: any }) {
  throw new Error('Function not implemented.')
}

