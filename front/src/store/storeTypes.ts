import {ICell} from "../classes/MyFlotClass";

interface ICurrentShip {
  name: string,
  arr: number[],
  begin: number,
  tempArr: number[]
}


export interface IInitialState {
  sea: ICell[],
  currentShip: ICurrentShip
}
