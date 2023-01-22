import {ICell} from "../classes/MyFlotClass";
import {Socket} from "socket.io-client";

interface ICurrentShip {
  name: string,
  arr: number[],
  begin: number,
  tempArr: number[],
}


export interface IInitialState {
  // socket: Socket
  sea: ICell[],
  currentShip: ICurrentShip
  enSea: Array <boolean | null>
  enemyId: string
  myId: string
  canToStep: boolean
}
