import React, {FC, MouseEvent, useEffect, useState} from 'react'
import {getArr10x10} from "../../utils/getArr10x10"
import st from './Field.module.scss'
import {Cell} from "./Cell";
import {IGame} from "../../classes/MyFlotClass";

interface IFieldProps {
  own: 'my' | 'en'
  game?: IGame
}

export const Field: FC<IFieldProps> = ({own, game}) => {
  const [currentCell, setCurrentCell] = useState('')
  const [selectShip, setSelectedShip] = useState<string>('')
  const [selectShipArr, setSelectedShipArr] = useState<number[]>([])

  const leave = () => {
    setCurrentCell('')
  }
  const hover = (id: string) => {
    setCurrentCell(id)
  }

  const downHandler = (e: MouseEvent<HTMLTableElement>) => {
    if (game && own === 'my') {
      const coordinates = Number((e.target as Element).id.slice(2))
      const ship = game.sea[coordinates].ship
      if (ship) {
        setSelectedShip(ship)
        game.sea.forEach((cell, i) =>
          cell.ship === ship && setSelectedShipArr(state => [...state, i]))
      }
    }
  }

  const upHandler = (e: MouseEvent<HTMLTableElement>) => {
    if (game && own === 'my') {
      setSelectedShip('')
      setSelectedShipArr([])
    }
  }

  return (
    <table
      onMouseDown={(e) => downHandler(e)}
      onMouseUp={(e) => upHandler(e)}
      onMouseLeave={leave}
      className={st.table}>
      <tbody>
      {getArr10x10().map((line, row) =>
        <tr key={`${own}${row}`}>
          {line.map((cell: string, i: number) =>
            <Cell
              selectedShip={selectShip}
              ship={game?.sea[row * 10 + i].ship}
              attack={game?.sea[row * 10 + i].attack}
              hover={hover}
              id={`${own}${cell}`}
              key={`${own}${cell}`}/>)}
        </tr>
      )}
      </tbody>
    </table>
  )
}
