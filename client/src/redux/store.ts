
import userAuth from '@/redux/signupdetails'

import {applyMiddleware, configureStore} from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
// ...

export const store = configureStore({
  reducer: {
    user:userAuth.reducer,


  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch