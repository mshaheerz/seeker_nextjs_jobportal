import { createSlice} from '@reduxjs/toolkit';

export const setisopenSlice = createSlice({
    name:"setisopen",
    initialState:{value:false},
    reducers:{
        setisopen:(state, action)=>{
            state.value= action.payload;
        } 
    }
});
export const {setisopen} = setisopenSlice.actions;
export default setisopenSlice.reducer;