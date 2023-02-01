import { createSlice} from '@reduxjs/toolkit';

export const refreshCommentSlice = createSlice({
    name:"refreshcomment",
    initialState:{value:false},
    reducers:{
        refreshComment:(state, action)=>{
            state.value= action.payload;
        } 
    }
});
export const {refreshComment} = refreshCommentSlice.actions;
export default refreshCommentSlice.reducer;