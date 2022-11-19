import {createSlice} from "@reduxjs/toolkit";
import {ICell, MyFlotClass} from "../classes/MyFlotClass";
import {initialState} from "./initialState";

export const gameSlice = createSlice({
  name: 'sea',
  initialState,


  reducers: {
    reset(state) {
      state.sea = new MyFlotClass().getSea()
    },

    rememberShip(state, action) {
      state.currentShip.name = action.payload.ship
      state.currentShip.begin = action.payload.begin
      state.sea.forEach((cell: ICell, i: number) => {
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
        state.sea[cell].ship = state.currentShip.name
      })
      state.currentShip.name = ''
      state.currentShip.arr = []
      state.currentShip.tempArr = []
    },

    moveShip(state, action) {
      const d = action.payload - state.currentShip.tempArr[state.currentShip.begin]
      const min = Math.min(...state.currentShip.tempArr)
      const max = Math.max(...state.currentShip.tempArr)
      const [a, b] = [min + d - (min + d) % 10, max + d - (max + d) % 10]
      if (min + d >= 0 && max + d <= 99 && (Math.abs(max - min) >= 10 || a === b)) {
        state.currentShip.tempArr = state.currentShip.tempArr.map(el => el + d)
      } else {
        state.currentShip.begin = state.currentShip.tempArr.indexOf(action.payload)
      }
    },

    turnShip(state) {
      if (state.currentShip.tempArr[1]) {
        const isVertical = state.currentShip.tempArr[1] - state.currentShip.tempArr[0] === 10
        state.currentShip.tempArr = state.currentShip.tempArr.map((el, i) => {
          const shift = isVertical ? (state.currentShip.begin - i) : (i - state.currentShip.begin)
          return el + shift * 9
        })
      }
    },
  },
})

export const {
  reset, rememberShip, forgetShip, moveShip, turnShip
} = gameSlice.actions

export default gameSlice.reducer
