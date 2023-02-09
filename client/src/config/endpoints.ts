import axios from "./axios";


export async function deletePost(formData:any) {
    try {
        const {data} = await axios.delete(`/delete_post/${formData}`)
        return data
    } catch (error) {
        
    }
}

export async function fetchComments(formData:any,header:any) {
    try {
        const {data} =  await axios.get(`/fetch_comments/${formData}`,{headers:header})
        return data;
    } catch (error) {
        
    }
}

export async function fetchCommentsNoAuth(formData:any) {
    try {
        const {data} =  await axios.get(`/fetch_commentsNoAuth/${formData}`)
        return data;
    } catch (error) {
        
    }
}


export async function fetchLikes(formData:any,header:any) {
    try {
        const {data} =  await axios.get(`/fetch_likes/${formData}`,{headers:header})
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

export async function addComment(formData: any,headers:any){
    try {
        const {data} = await axios.post('/send_post',formData,{headers:headers})
        return data
    } catch (error) {
        
    }
}

export async function getOnePost(formData:any, headers:any){
    try {
        const {data} = await axios.post('/getonepost',formData,{headers:headers})
        return data
    } catch (error) {
            
    }
}

export async function getOnePostNoAuth(formData:any){
    try {
        const {data} = await axios.post('/getOnepostNoAuth',formData)
        return data
    } catch (error) {
        
    }
}

export async function getAllJobs(header:any){
    try {
        const {data} = await axios.get('/get_allposts',{headers:header})
        return data;
    } catch (error) {
        
    }
}

export async function getOneJobNoAuth(formData:any){
    try {
        const {data} = await axios.get(`/get_onejobNoAuth/${formData}`)
        return data
    } catch (error) {
        
    }
}

export async function ApplyJob(jobId:any,companyId:any,header:any){
    try {
        const {data} = await axios.post(`/applyjob`,{jobId,companyId},{headers:header})
        return data
    } catch (error) {
        
    }
}

export async function getProfilePosts(header:any){
    try {
        const {data} = await axios.get('/get_profile_posts',{headers:header})
        return data;   
    } catch (error) {
        console.log(error)
    }
}