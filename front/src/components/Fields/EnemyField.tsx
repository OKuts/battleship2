import React, {FC, memo, useEffect} from 'react'
import {getArr10x10} from "../../utils/getArr10x10"
import {EnemyCell} from "./EnemyCell";
import st from './Field.module.scss'
import {useAppDispatch, useAppSelector} from "../../hooks/useAppDispatch";
import {changeCanToStep, markHit, saveAttack, sendStep, setGamers} from "../../store/gameSlice";
import io from "socket.io-client";

const socket = io()

export const EnemyField: FC = memo(() => {

  const {enSea, sea, myId, enemyId, canToStep} = useAppSelector(({game}) => game)
  const dispatch = useAppDispatch()
  const nextStep = (id: string): void => {
    if (canToStep) {
      dispatch(sendStep(id))
      dispatch(changeCanToStep(false))
      socket.emit('step', [myId, id])
    }
  }

  useEffect(() => {
    socket.on('back', ([id, step]) => {
      if (id === enemyId) {
        dispatch(saveAttack(step))
        if (sea[step].ship) {
          socket.emit('hit', step)
          // dispatch(changeCanToStep(true))
        } else {
          socket.emit('give')
          dispatch(changeCanToStep(false))
        }
      }
    })

    socket.on('mark', (data) => {
      dispatch(markHit(data))
    })

    socket.on('getStep', () => {
      dispatch(changeCanToStep(true))
    })

    socket.on('start', (data) => {
      dispatch(setGamers(data))
    })
  }, [socket, myId, enemyId])


  return (
    <table className={st.table}>
      <tbody>
      {getArr10x10().map((line, row) =>
        <tr key={`en${row}`}>
          {line.map((cell: string, i: number) =>
            <EnemyCell
              nextStep={nextStep}
              attack={enSea[row * 10 + i]}
              id={`${row}${i}`}
              key={`en${row}${i}`}/>
          )}
        </tr>
      )}
      </tbody>
    </table>
  )
})
