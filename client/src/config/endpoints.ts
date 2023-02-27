import axios from "./axios";


export async function deletePost(formData:any) {
    try {
        const {data} = await axios.delete(`/delete_post/${formData}`)
        return data
    } catch (error) {
        
    }
}


export async function deleteReport(formData:any) {
    try {
        const {data} = await axios.delete(`/report/${formData}`)
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

export async function getOneCompanyNoAuth(formData:any){
    try {
        const {data} = await axios.get(`/get_onecompanyNoAuth/${formData}`)
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

export async function editProfile(formData: any,header:any){
    try {
        const {data} = await axios.put('/profile_edit',formData,{headers:header})
        return data
    } catch (error) {
        alert('pee')
    }
}


export async function getOneApplydJob(formData: any,header:any){
    try {
        const {data} = await axios.get(`/get_oneapplied_job/${formData}`,{headers:header})
        return data
    } catch (error) {
       
    }
}


export async function getUserApplydJob(header:any){
    try {
        const {data} = await axios.get(`/get_applied_job`,{headers:header})
        return data
    } catch (error) {
       
    }
}


export async function getAllCompanies(header:any){
    try {
        const {data} = await axios.get('/get_allcompanies',{headers:header})
        return data;
    } catch (error) {
        
    }
}

export async function CompanyWiseJobFetch(formData:any,header:any){
    try {
        const {data} = await axios.get(`/get_companywise_job/${formData}`,{headers:header})
        return data;
    } catch (error) {
        
    }
}

export async function SearchJob(formData:any,header:any){
    try {
        const {data} = await axios.get(`/search_job?search=${formData}`,{headers:header})
        return data;
    } catch (error) {
        
    }
}

export async function FilterByJobType(formData:any,header:any){
    try {
        const {data} = await axios.get(`/filter_by_jobtype?search=${formData}`,{headers:header})
        return data;
    } catch (error) {
        
    }
}

export async function ActiveandInactiveJob(jobId:any,formData:any,header:any){
    try {
        const {data} = await axios.patch(`/company/active_inactive_job/${jobId}`,formData,{headers:header})
        return data;
    } catch (error) {
        
    }
}

export async function SearchUser(formData:any,header:any){
    try {
        const {data} = await axios.get(`/search_user?search=${formData}`,{headers:header})
        return data;
    } catch (error) {
        
    }
}


export async function getOneUserNoAuth(formData:any){
    try {
        const {data} = await axios.get(`/get_oneuser/${formData}`)
        return data;
    } catch (error) {
        
    }
}


export async function getUserPosts(formData:any,header:any){
    try {
        const {data} = await axios.get(`/get_user_posts/${formData}`,{headers:header})
        return data;   
    } catch (error) {
        console.log(error)
    }
}

export async function flagPost(formData:any,header:any){
    try {
        const {data} = await axios.patch(`/flagpost`,formData,{headers:header})
        return data;   
    } catch (error) {
        console.log(error)
    }
}


export async function UserChats(formData:any){
    try {

        const {data} = await axios.get(`/chat/${formData}`)
        return data;   
    } catch (error) {
        console.log(error)
    }
}


export async function createChat(formData:any){
    try {

        const {data} = await axios.post(`/chat`,formData)
        return data;   
    } catch (error) {
        console.log(error)
    }
}

export async function GetChatUsers(formData:any){
    try {
        const {data} = await axios.get(`/chat/getchatusers/${formData}`)
        return data;
    } catch (error) {
        
    }
}

export async function getMessages(formData:any){
    try {
        const {data} = await axios.get(`/message/${formData}`)
        return data;
    } catch (error) {
        
    }
}

export async function addMessages(formData:any){
    try {
        const {data} = await axios.post(`/message/`,formData)
        return data;
    } catch (error) {
        
    }
}


export async function getAllCompanyDetails(formData:any){
    try {
        const {data} = await axios.get(`/admin/getallcompanydetails`,{headers:formData})
        return data;
    } catch (error) {
        
    }
}


export async function getAllJobDetails(formData:any){
    try {
        const {data} = await axios.get(`/admin/getalljobdetails`,{headers:formData})
        return data;
    } catch (error) {
        
    }
}

export async function Notify(formData:any){
    try {
        const {data} = await axios.post(`/notification`,formData)
        return data;
    } catch (error) {
        
    }
}


export async function getNotification(formdata:any,header:any){
    try {
        const {data} = await axios.get(`/GetCompanynotification/${formdata}`,{headers:header})
        return data;
    } catch (error) {
        
    }
}

export async function getUserNotification(formdata:any,header:any){
    try {
        const {data} = await axios.get(`/notification/${formdata}`,{headers:header})
        return data;
    } catch (error) {
        
    }
}



export async function deleteNotification(formData:any) {
    try {
        const {data} = await axios.delete(`/notification/${formData}`)
        return data
    } catch (error) {
        
    }
}

export async function getAllReports(header:any) {
    try {
        const {data} = await axios.get(`/admin/report`,{headers:header})
        return data
    } catch (error) {
        
    }
}

export async function deleteComment(formData:any,header:any) {
    try {
        const {data} = await axios.delete(`/comment/${formData}`,{headers:header})
        return data
    } catch (error) {
        
    }
}




export async function deleteAppliedJob(formData:any,header:any) {
    try {
        const {data} = await axios.delete(`/company/applyjob/${formData}`,{headers:header})
        return data
    } catch (error) {
        
    }
}


