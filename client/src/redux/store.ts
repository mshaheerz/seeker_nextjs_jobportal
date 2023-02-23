
import user from '@/redux/signupdetails'
import postReducer from "@/redux/setpostid"
import isopenReducer from "@/redux/setisopen"
import refreshcomment from './refreshcomment'
import companyinfo from './companyinfo'
import jobs from './jobs'
import {applyMiddleware, configureStore} from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
// ...

export const store = configureStore({
  reducer: {
    user:user,
    setpostid:postReducer,
    setisopen:isopenReducer,
    refreshcomment:refreshcomment,
    companyinfo:companyinfo,
    jobs:jobs,

  
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch