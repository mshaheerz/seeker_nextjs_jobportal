import { createSlice} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'


 const userSlice = createSlice({
    name:"userDetails",
    initialState:{userDetails:null},
    reducers:{
        login:(state, action)=>{
            let newData = action.payload
            state.userDetails= newData.user;
        }
    }
});
export const userActions = userSlice.actions;
export default userSlice;