import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {MyFlotClass} from "../classes/MyFlotClass";


const initialState = {
  game: new MyFlotClass().getGame(),
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,

  reducers: {
      reset(state){
        state.game = new MyFlotClass().getGame()
      }
  },
})

export const {
  reset
} = gameSlice.actions

export default gameSlice.reducer
