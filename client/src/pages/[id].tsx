import Modal from "@/components/User/Feed/Modal";
import Sidebar from "@/components/User/Layouts/Sidebar";
import axios from "@/config/axios";
import { fetchComments, fetchCommentsNoAuth, getOnePost, getOnePostNoAuth } from "@/config/endpoints";
import { setisopen } from "@/redux/setisopen";
import { setpostid } from "@/redux/setpostid";
import { user } from "@/redux/signupdetails";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Head from "next/head";
import  { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Posts from "@/components/User/Feed/Posts";
import Comment from "@/components/User/Feed/Comment";
import { refreshComment } from "@/redux/refreshcomment";

function PostPage({post,postId}:any) {
  const commentrefresh = useSelector(
    (state: any) => state.refreshcomment.value
  );
  const setCommentRefresh = useDispatch();
  //refreshComment
  const dispatchpostid = useDispatch();
  //setpostid
  const dispatchisopen = useDispatch();
  //setisopen
  const router = useRouter();
  const isOpen = useSelector((state: any) => state.setisopen.value);
  let [userDetails, setUserDetails] = useState({});
  // let [post, setPost] = useState();
  const [refresh,setRefresh]=useState(false)
  let [comments, setComments] = useState([]);
  const { id } = router.query;
  useEffect(() => {
    if (localStorage.getItem("usertoken")) {
      axios
        .get("/isUserAuth", {
          headers: { usertoken: localStorage.getItem("usertoken") },
        })
        .then((response) => {
          if (response.data.status === "failed") {
            router.push("/auth");
          } else if (response.data.auth) {
            setUserDetails({
              name: `${response.data.firstname} ${response.data.lastname}`,
              recentjob: response.data.recentjob,
            });
          } else {
            router.push("/auth");
          }
        });
    } else {
      router.push("/auth");
    }
  }, []);

  useEffect(() => {
    async function invoke() {
      const data = await fetchCommentsNoAuth(postId);;
      console.log(data);
      setComments(data?.comments);
    }
    invoke();
  }, [commentrefresh]);

  // useEffect(() => {
  //   async function invoke() {
  //     const data = await getOnePost(
  //       { postId: id },
  //       { usertoken: localStorage.getItem("usertoken") }
  //     );
  //     setPost(data.posts);
  //     console.log(data.posts);
  //   }
  //   invoke();
  // }, []);

  return (
    <div className="">
      <Head>
        <title>
          {post?.user?.firstname} on seeker {post?.text}
        </title>
      </Head>

      <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
        {/* sidebar */}

        <Sidebar userDetails={userDetails} />
        <div className="flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px]">
          <div className="flex item-center px-1.5 py-2 border-b border-r border-gray-700 text-[#d9d9d9] font-semibold text-xl gap-x-4 sticky top-0 z-50 bg-black">
            <div className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0">
              <ArrowLeftIcon
                onClick={() => router.back()}
                className="h-5 text-white"
              />
            </div>
            post
          </div>
          {post && <Posts id={post?._id} post={post} postPage={true} />}

          {comments?.length > 0 && (
            <div className="pb-72">
              {comments.map((comment:any) => (
                <Comment key={comment._id} comment={comment} />
              ))}
            </div>
          )}
        </div>

        {/* feed */}

        {/* widgets */}
        {isOpen && <Modal />}
        {/* modal */}
      </main>
    </div>
  );
}

export async  function getServerSideProps(context:any){
  try {
  console.log(context.params.id)
  const data = await fetchCommentsNoAuth(context.params.id);

  const postdata = await getOnePostNoAuth(
    { postId: context.params.id },
    
  );

  return {
    props:{
        postId:context.params.id,
        comments:data?.comments||null,
        post:postdata?.posts || null

    }
  }
  } catch (error) {
    console.log(error)
  }

}
export default PostPage;
