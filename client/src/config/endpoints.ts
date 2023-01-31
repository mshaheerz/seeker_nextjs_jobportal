import axios from "./axios";


export async function deletePost(formData:any) {
    try {
        const {data} = await axios.delete(`/delete_post/${formData}`)
        return data
    } catch (error) {
        
    }
}

export async function fetchComments() {
    try {
        const {data} =  await axios.get(`/fetch_comments`)
        return data;
    } catch (error) {
        
    }
}


export async function fetchLikes() {
    try {
        const {data} =  await axios.get(`/fetch_likes/`)
        return data;
    } catch (error) {
        
    }
}


export async function unLike(formData: any) {
    try {
        const {data} = await axios.delete(`/delete_likes/${formData.userId}/${formData.postId}`)
        return data;
    } catch (error) {
        
    }
}   

export async function postLike(formData: any) {
    try {
        console.log(formData);
        const {data} = await axios.post(`/add_likes`,formData)
        return data;
    } catch (error) {
        
    }
}   

export async function getPosts(){
    try {
        const {data} = await axios.post('/getposts',{},{headers:{"usertoken":localStorage.getItem("usertoken")}})
        return data;   
    } catch (error) {
        console.log(error)
    }
}

export async function sendComment(formData: any,headers:any){
    try {
        const {data} = await axios.post('/send_post',formData,{headers:headers})
        return data
    } catch (error) {
        
    }
}