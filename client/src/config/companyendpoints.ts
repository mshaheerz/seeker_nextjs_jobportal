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