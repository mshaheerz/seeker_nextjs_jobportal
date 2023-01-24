import { createSlice} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'


export const userSlice = createSlice({
    name:"userDetails",
    initialState:{value:'fdsa'},
    reducers:{
        login:(state, action: PayloadAction<any>)=>{
            state.value= action.payload;
        }
    }
});
export const {login} = userSlice.actions;
export default userSlice.reducer;