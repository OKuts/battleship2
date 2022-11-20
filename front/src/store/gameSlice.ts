import {createSlice} from "@reduxjs/toolkit";
import {ICell, MyFlotClass} from "../classes/MyFlotClass";
import {isVerticalShip} from "../utils/isVerticalShip";
import {editedArr} from "../utils/editedArr";
import {IInitialState} from "./storeTypes";
import {canToPlace} from "../utils/canToPlace";

export const initialState: IInitialState = {
  sea: new MyFlotClass().getSea(),
  currentShip: {
    name: '',
    arr: [],
    begin: 0,
    tempArr: []
  },
  enSea: new Array(100).fill(null)
}

export const gameSlice = createSlice({
  name: 'sea',
  initialState,

  reducers: {
    reset(state) {
      state.sea = new MyFlotClass().getSea()
      state.enSea = new Array(100).fill(null)
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
      const isCanToPlace = canToPlace(state.currentShip.tempArr, state.sea)
      const arr = action.payload && isCanToPlace ? state.currentShip.tempArr : state.currentShip.arr

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

    turnShip(state, action) {
      if (state.currentShip.tempArr[1]) {
        const isVertical = isVerticalShip(state.currentShip.tempArr)
        const tempArr = state.currentShip.tempArr.map((el, i) => {
          const shift = isVertical ? (state.currentShip.begin - i) : (i - state.currentShip.begin)
          return el + shift * 9
        })
        state.currentShip.tempArr = editedArr(tempArr, state.currentShip.begin)
        state.currentShip.begin = state.currentShip.tempArr.indexOf(action.payload)
      }
    },

    doStep (state, action) {
      state.enSea[action.payload] = false
    }
  },
})

export const {
  reset, rememberShip, forgetShip, moveShip, turnShip, doStep
} = gameSlice.actions

export default gameSlice.reducer
