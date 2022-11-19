import {ICell, MyFlotClass} from "../classes/MyFlotClass";

export interface ICurrentShip {
  name: string,
  arr: number[],
  begin: number,
  tempArr: number[]
}


interface IInitialState {
  sea: ICell[],
  currentShip: ICurrentShip
}


export const initialState: IInitialState = {
  sea: new MyFlotClass().getSea(),
  currentShip: {
    name: '',
    arr: [],
    begin: 0,
    tempArr: []
  }
}
