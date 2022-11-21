import React, {FC, MouseEvent, useEffect} from 'react'
import {getArr10x10} from "../../utils/getArr10x10"
import {EnemyCell} from "./EnemyCell";
import st from './Field.module.scss'
import {useAppDispatch, useAppSelector} from "../../hooks/useAppDispatch";
import {initConnection, sendStep} from "../../store/userSlice";

export const EnemyField: FC = () => {
  const {enSea} = useAppSelector(({user}) => user)
  const dispatch = useAppDispatch()

  const nextStep = (id: string): void => {
    dispatch(sendStep(id))
  }

  useEffect(()=> {
    dispatch(initConnection())
  }, [])

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
