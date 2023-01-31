import { createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name:"user",
    initialState:{value:null},
    reducers:{
        user:(state:any, action:any)=>{
            state.value= action.payload;
        } 
    }
});
export const {user} = userSlice.actions;
export default userSlice.reducer;