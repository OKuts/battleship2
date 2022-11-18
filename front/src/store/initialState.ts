import {IGame, MyFlotClass} from "../classes/MyFlotClass";

export interface ICurrentShip {
  name: string,
  arr: number[],
}


interface IInitialState {
  game: IGame,
  currentShip: ICurrentShip
}


export const initialState: IInitialState = {
  game: new MyFlotClass().getGame(),
  currentShip: {
    name: '',
    arr: [],
  }
}
