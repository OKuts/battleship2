import React, {FC} from 'react'
import st from './Control.module.scss'
import {Button} from "../Button/Button";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {resetEnemyField, resetMyField} from "../../store/gameSlice";

export const Control: FC = () => {
  const dispatch = useAppDispatch()

  const handler = () => {
    dispatch(resetMyField())
    dispatch(resetEnemyField())
  }

  return (
    <div className={st.control}>
      <Button text={'Auto'} bg={'gray'}/>
      <Button text={'Start'} bg={'blue'}/>
      <Button handler={handler} text={'Reset'} bg={'red'}/>
    </div>
  )
}
