import {configureStore} from "@reduxjs/toolkit"
import gameReducer from './gameSlice'
import userReducer from './userSlice'

export const store = configureStore({
  reducer: {
    game: gameReducer,
    user: userReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
