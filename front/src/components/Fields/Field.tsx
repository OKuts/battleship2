import React, {FC, MouseEvent, useEffect} from 'react'
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
  const {name, tempArr} = useAppSelector(({game}) => game.currentShip)

  const dispatch = useAppDispatch()

  const leaveHandler = () => {
    dispatch(forgetShip(false))
  }

  const downHandler = (e: MouseEvent<HTMLTableElement>) => {
    const begin = Number((e.target as Element).id.slice(2))
    if (game && own === 'my') {
      const ship = game.sea[begin].ship
      if (ship) {
        dispatch(rememberShip({ship, begin}))
      }
    }
  }

  const upHandler = () => {
    if (game && own === 'my') {
      dispatch(forgetShip(true))
    }
  }

  const overCellHandler = (e: MouseEvent<HTMLTableElement>) => {
    if (game && own === 'my') {
      if (name) {
        dispatch(moveShip(Number((e.target as Element).id.slice(2))))
      }
    }
  }

  // useEffect(() => {
  //   console.log(selectedShip)
  // }, [selectedShip])

  return (
    <table
      onMouseDown={(e) => downHandler(e)}
      onMouseOver={(e) => overCellHandler(e)}
      onMouseUp={upHandler}
      onMouseLeave={leaveHandler}
      className={st.table}>
      <tbody>
      {getArr10x10().map((line, row) =>
        <tr key={`${own}${row}`}>
          {line.map((cell: string, i: number) =>
            <Cell
              selectedShip={name}
              ship={game?.sea[row * 10 + i].ship}
              isMark={tempArr.includes(row * 10 + i) && !!game}
              attack={game?.sea[row * 10 + i].attack}
              id={`${own}${cell}`}
              key={`${own}${cell}`}/>)}
        </tr>
      )}
      </tbody>
    </table>
  )
}
