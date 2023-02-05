import { createSlice} from '@reduxjs/toolkit';

export const companySlice = createSlice({
    name:"companyInfo",
    initialState:{value:null},
    reducers:{
        companyInfo:(state:any, action:any)=>{
            state.value= action.payload;
        } 
    }
});
export const {companyInfo} = companySlice.actions;
export default companySlice.reducer;