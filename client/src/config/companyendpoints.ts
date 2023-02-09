import axios from "./axios";


export async function companyAuthentication(formData:any) {
    try {
        const {data} = await axios.get(`company/isCompanyAuth`,{headers:formData})
        return data
    } catch (error) {
        
    }
}

export async function companyPostJob(formData:any, header:any) {
    try {
        const {data} = await axios.post(`company/postjob`,formData,{headers:header})
        return data
    } catch (error) {
        
    }
}

export async function getCompanyJobs(header:any) {
    try {
       
        const {data} = await axios.post(`company/get_company_jobs`,{},{headers:header})
     
        return data
    } catch (error) {
        
    }
}


export async function adminAuthentication(formData:any) {
    try {
        const {data} = await axios.get(`admin/isAdminAuth`,{headers:formData})
        return data
    } catch (error) {
        
    }
}



export async function getDashboardCounts(formData:any) {
    try {
        const {data} = await axios.get(`admin/get_all_counts`,{headers:formData})
        return data
    } catch (error) {
        
    }
}

export async function getAllUserDetails(formData:any) {
    try {
        const {data} = await axios.get(`admin/getall_user_details`,{headers:formData})
        return data
    } catch (error) {

    }
}

export async function flagUser(formData:any,id:any,header:any) {
    try {
        const {data} = await axios.patch(`admin/flag_user/${id}`,{isBanned:formData},{headers:header})
        return data
    } catch (error) {

    }
}

export async function getNotApprovedJobs(header:any) {
    try {
        const {data}= await axios.get(`admin/get_notapproved_jobs`,{headers:header})
        return data
    } catch (error){

    }
}

export async function approveJob(formData:any,id:any,header:any) {
    try {
        const {data} = await axios.patch(`admin/approve_job/${id}`,{approve:formData},{headers:header})
        return data
    } catch (error) {

    }
}

export async function getAppliedJobs(formData:any) {
    try {
        const {data} = await axios.get(`company/get_appliedjobs`,{headers:formData})
        return data
    } catch (error) {

    }
}
