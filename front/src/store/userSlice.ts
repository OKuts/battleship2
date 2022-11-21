import {io} from "socket.io-client";
import {createSlice} from "@reduxjs/toolkit";

export const initialState = {
  socket: io(),
  enSea: new Array(100).fill(null),
}

export const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {

    initConnection(state) {
        state.socket.on('back', (data: string) => {
          console.log(data)
        })
    },

    sendStep(state, action) {
      state.enSea[Number(action.payload)] = false
      state.socket.emit('step', action.payload)
    },

    resetEnemyField(state) {
      state.enSea = new Array(100).fill(null)
    },
  },
})

export const {
  sendStep, initConnection, resetEnemyField
} = userSlice.actions

export default userSlice.reducer
