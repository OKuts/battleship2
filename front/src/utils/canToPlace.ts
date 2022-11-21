import {ICell} from "../classes/MyFlotClass";
import {getAroundArr} from "./getAroundArr";

export const canToPlace = (tempArr: number[], sea: ICell[]): boolean => {
  return !getAroundArr(tempArr).some(el => sea[el].ship)
}
