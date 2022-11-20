import React, {FC, MouseEvent} from 'react'
import {getArr10x10} from "../../utils/getArr10x10"
import st from './Field.module.scss'
import {Cell} from "./Cell";
import {useAppDispatch, useAppSelector} from "../../hooks/useAppDispatch";
import {forgetShip, moveShip, rememberShip, turnShip} from "../../store/gameSlice";
import {ICell} from "../../classes/MyFlotClass";

interface IFieldProps {
  own: 'my' | 'en'
  sea?: ICell[]
}

export const Field: FC<IFieldProps> = ({own, sea}) => {
  const {name, tempArr} = useAppSelector(({game}) => game.currentShip)

  const dispatch = useAppDispatch()

  const leaveHandler = () => {
    dispatch(forgetShip(false))
  }

  const downHandler = (e: MouseEvent<HTMLTableElement>) => {
    const begin = Number((e.target as Element).id.slice(2))
    if (sea && own === 'my') {
      const ship = sea[begin].ship
      if (ship) {
        dispatch(rememberShip({ship, begin}))
      }
    }
  }

  const upHandler = (e: MouseEvent<HTMLTableElement>) => {
    if (sea && own === 'my' && !e.button) {
      dispatch(forgetShip(true))
    }
  }

  const overCellHandler = (e: MouseEvent<HTMLTableElement>) => {
    if (sea && own === 'my') {
      if (name) {
        dispatch(moveShip(Number((e.target as Element).id.slice(2))))
      }
    }
  }

  const contextHandler = (e: MouseEvent<HTMLTableElement>) => {
    e.preventDefault()

    dispatch(turnShip(Number((e.target as Element).id.slice(2))))
  }

  return (
    <table
      onContextMenu={contextHandler}
      onMouseDown={downHandler}
      onMouseOver={overCellHandler}
      onMouseUp={upHandler }
      onMouseLeave={leaveHandler}
      className={st.table}>
      <tbody>
      {getArr10x10().map((line, row) =>
        <tr key={`${own}${row}`}>
          {line.map((cell: string, i: number) =>
            <Cell
              selectedShip={name}
              ship={sea ? sea[row * 10 + i].ship : ''}
              isMark={tempArr.includes(row * 10 + i) && !!sea}
              attack={sea ? sea[row * 10 + i].attack : false}
              id={`${own}${cell}`}
              key={`${own}${cell}`}/>)}
        </tr>
      )}
      </tbody>
    </table>
  )
}
