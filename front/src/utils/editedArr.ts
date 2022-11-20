import {isVerticalShip} from "./isVerticalShip";
import {getDecades} from "./getDecades";

export const editedArr = (arr: number[], n: number): number[] => {
  if (!arr[1]) return arr
  const [min, max] = [Math.min(...arr), Math.max(...arr)]

  if (isVerticalShip(arr)) {
    if (min < 0) {
      const n = arr.filter(el => el < 0).length
      return arr.map(el => el + n * 10)
    } else if (max > 99) {
      const n = arr.filter(el => el > 99).length
      return arr.map(el => el - n * 10)
    } else return arr
  } else {
    const tempArr = arr.map(el => getDecades(el))
    const current = tempArr[arr.indexOf(arr[n])]
    if (tempArr[0] < current) {
      const len = tempArr.filter(el => el !== tempArr[tempArr.length - 1]).length
      return arr.map(el => el + len)
    } else if (current < tempArr[tempArr.length - 1]) {
      const len = tempArr.filter(el => el > current).length
      return arr.map(el => el - len)
    } else {
      return arr
    }
  }
}
