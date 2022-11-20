import React, {FC, MouseEvent} from 'react'
import {getArr10x10} from "../../utils/getArr10x10"
import st from './Field.module.scss'
import {useAppDispatch, useAppSelector} from "../../hooks/useAppDispatch";
import {forgetShip, moveShip, rememberShip, turnShip} from "../../store/gameSlice";
import {MyCell} from "./MyCell";

export const MyField: FC = () => {
  const {sea, currentShip: {name, tempArr}} = useAppSelector(({game}) => game)

  const dispatch = useAppDispatch()

  const leaveHandler = () => {
    dispatch(forgetShip(false))
  }

  const downHandler = (e: MouseEvent<HTMLTableElement>) => {
    const begin = Number((e.target as Element).id)
    const ship = sea[begin].ship
    if (ship) {
      dispatch(rememberShip({ship, begin}))
    }
  }

  const upHandler = (e: MouseEvent<HTMLTableElement>) => {
    if (!e.button) {
      dispatch(forgetShip(true))
    }
  }

  const overCellHandler = (e: MouseEvent<HTMLTableElement>) => {
    if (name) {
      dispatch(moveShip(Number((e.target as Element).id)))
    }
  }

  const contextHandler = (e: MouseEvent<HTMLTableElement>) => {
    e.preventDefault()
    dispatch(turnShip(Number((e.target as Element).id)))
  }

  return (
    <table
      onContextMenu={contextHandler}
      onMouseDown={downHandler}
      onMouseOver={overCellHandler}
      onMouseUp={upHandler}
      onMouseLeave={leaveHandler}
      className={st.table}>
      <tbody>
      {getArr10x10().map((line, row) =>
        <tr key={`my${row}`}>
          {line.map((cell: string, i: number) =>
            <MyCell
              selectedShip={name}
              ship={sea ? sea[row * 10 + i].ship : ''}
              isMark={tempArr.includes(row * 10 + i) && !!sea}
              attack={sea ? sea[row * 10 + i].attack : false}
              id={`${row}${i}`}
              key={`my${cell}`}/>)}
        </tr>
      )}
      </tbody>
    </table>
  )
}
