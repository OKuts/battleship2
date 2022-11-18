import React, {FC, MouseEvent, useEffect, useState} from 'react'
import {getArr10x10} from "../../utils/getArr10x10"
import st from './Field.module.scss'
import {Cell} from "./Cell";
import {IGame} from "../../classes/MyFlotClass";
import {useAppDispatch, useAppSelector} from "../../hooks/useAppDispatch";
import {forgetShip, moveShip, rememberShip} from "../../store/gameSlice";

interface IFieldProps {
  own: 'my' | 'en'
  game?: IGame
}

export const Field: FC<IFieldProps> = ({own, game}) => {
  const selectedShip = useAppSelector(({game}) => game.currentShip.name)
  const [mouseCell, setMouseCell] = useState(-1)

  const dispatch = useAppDispatch()

  const leaveHandler = () => {
    dispatch(forgetShip())
    setMouseCell(-1)
  }

  const downHandler = () => {
    if (game && own === 'my') {
      const ship = game.sea[mouseCell].ship
      if (ship) {
        dispatch(rememberShip(ship))
      }
    }
  }

  const upHandler = () => {
    if (game && own === 'my') {
      dispatch(forgetShip())
    }
  }

  const overCellHandler = (e: MouseEvent<HTMLTableElement>) => {
    const id = (e.target as Element).id
    if (game && own === 'my' && id) {
      const coordinates = Number(id.slice(2))
      if (selectedShip && coordinates !== mouseCell) {
        const d = coordinates - mouseCell
        const dy = d > 0 ? Math.floor(d / 10) : - Math.floor(-d / 10)
        const dx = d % 10
        dispatch(moveShip({dy, dx}))
      }
      setMouseCell(coordinates)
    }
  }

  // useEffect(() => {
  //   console.log(selectedShip)
  // }, [selectedShip])

  return (
    <table
      onMouseDown={downHandler}
      onMouseOver={(e) => overCellHandler(e)}
      onMouseUp={upHandler}
      onMouseLeave={leaveHandler}
      className={st.table}>
      <tbody>
      {getArr10x10().map((line, row) =>
        <tr key={`${own}${row}`}>
          {line.map((cell: string, i: number) =>
            <Cell
              selectedShip={selectedShip}
              ship={game?.sea[row * 10 + i].ship}
              plan={game?.sea[row * 10 + i].plan}
              attack={game?.sea[row * 10 + i].attack}
              id={`${own}${cell}`}
              key={`${own}${cell}`}/>)}
        </tr>
      )}
      </tbody>
    </table>
  )
}
