import React, {FC, MouseEvent} from 'react'
import {getArr10x10} from "../../utils/getArr10x10"
import {EnemyCell} from "./EnemyCell";
import st from './Field.module.scss'
import {useAppDispatch, useAppSelector} from "../../hooks/useAppDispatch";
import {doStep} from "../../store/gameSlice";

export const EnemyField: FC = () => {
  const {enSea} = useAppSelector(({game}) => game)
  const dispatch = useAppDispatch()

  const nextStep = (id: string): void => {
    dispatch(doStep(Number(id)))
  }

  return (
    <table className={st.table}>
      <tbody>
      {getArr10x10().map((line, row) =>
        <tr key={`en${row}`}>
          {line.map((cell: string, i: number) =>
            <EnemyCell
              nextStep = {nextStep}
              attack={enSea[row * 10 + i]}
              id={`${row}${i}`}
              key={`en${row}${i}`}/>
          )}
        </tr>
      )}
      </tbody>
    </table>
  )
}
