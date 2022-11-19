import {createSlice} from "@reduxjs/toolkit";
import {ICell, MyFlotClass} from "../classes/MyFlotClass";
import {initialState} from "./initialState";
import {createLogger} from "vite";

export const gameSlice = createSlice({
  name: 'game',
  initialState,


  reducers: {
    reset(state) {
      state.game = new MyFlotClass().getGame()
    },

    rememberShip(state, action) {
      state.currentShip.name = action.payload.ship
      state.currentShip.begin = action.payload.begin
      state.game.sea.forEach((cell: ICell, i: number) => {
        if (cell.ship === action.payload.ship) {
          cell.ship = ''
          state.currentShip.arr.push(i)
          state.currentShip.tempArr.push(i)
        }
      })
      state.currentShip.begin = state.currentShip.arr.indexOf(action.payload.begin)
    },

    forgetShip(state, action) {
      const arr = action.payload ? state.currentShip.tempArr : state.currentShip.arr
      arr.forEach(cell => {
        state.game.sea[cell].ship = state.currentShip.name
      })
      state.currentShip.name = ''
      state.currentShip.arr = []
      state.currentShip.tempArr = []
    },

    moveShip(state, action) {
      const d = action.payload - state.currentShip.tempArr[state.currentShip.begin]
      const min = Math.min(...state.currentShip.tempArr)
      const max = Math.max(...state.currentShip.tempArr)
      if ( min + d >= 0 && max + d <= 99) {
        state.currentShip.tempArr = state.currentShip.tempArr.map(el => el + d)
      } else {
        state.currentShip.begin = state.currentShip.tempArr.indexOf(action.payload)
      }
    },

    turnShip(state) {
      console.log('yes')
    },
  },
})

export const {
  reset, rememberShip, forgetShip, moveShip, turnShip
} = gameSlice.actions

export default gameSlice.reducer
