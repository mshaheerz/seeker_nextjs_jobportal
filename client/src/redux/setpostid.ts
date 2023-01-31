import { createSlice} from '@reduxjs/toolkit';

export const postidSlice = createSlice({
    name:"setpostid",
    initialState:{value:''},
    reducers:{
        setpostid:(state:any, action:any)=>{
            state.value= action.payload;
        } 
    }
});
export const {setpostid} = postidSlice.actions;
export default postidSlice.reducer;