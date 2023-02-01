import axios from "./axios";


export async function companyAuthentication(formData:any) {
    try {
        const {data} = await axios.get(`company/isCompanyAuth`,{headers:formData})
        return data
    } catch (error) {
        
    }
}