import { createSlice} from '@reduxjs/toolkit';

export const jobSlice = createSlice({
    name:"jobs",
    initialState:{value:null},
    reducers:{
        jobs:(state:any, action:any)=>{
            state.value= action.payload;
        } 
    }
});
export const {jobs} = jobSlice.actions;
export default jobSlice.reducer;