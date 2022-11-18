import {createSlice} from "@reduxjs/toolkit";
import {ICell, MyFlotClass} from "../classes/MyFlotClass";
import {initialState} from "./initialState";

export const gameSlice = createSlice({
  name: 'game',
  initialState,


  reducers: {
    reset(state) {
      state.game = new MyFlotClass().getGame()
    },

    rememberShip(state, action) {
      state.currentShip.name = action.payload
      state.game.sea.forEach((cell: ICell, i: number) => {
        if (cell.ship === action.payload) {
          state.currentShip.arr.push(i)
        }
      })
    },

    forgetShip(state) {
      state.currentShip.name = ''
      state.currentShip.arr = []
    },

    moveShip(state, action) {
      const {dy, dx} = action.payload
      const tempArr: number[] = []
      state.currentShip.arr.forEach((cell: number) => {
         tempArr.push(cell + dy * 10 + dx)
      })
      if (Math.max(...tempArr) <= 99 && Math.min(...tempArr) >= 0) {
        state.currentShip.arr.forEach((cell: number) =>
          state.game.sea[cell] = {ship: '', around: [], attack: false, plan: ''})
        tempArr.forEach(cell =>
          state.game.sea[cell] = {ship: '', around: [], attack: false, plan: state.currentShip.name})
        state.currentShip.arr = [...tempArr]
      }
    }
  },
})

export const {
  reset, rememberShip, forgetShip, moveShip
} = gameSlice.actions

export default gameSlice.reducer
