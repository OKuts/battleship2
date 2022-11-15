import React, {FC} from 'react'
import st from './Control.module.scss'
import {Button} from "../Button/Button";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {reset} from "../../store/gameSlice";

export const Control: FC = () => {
  const dispatch = useAppDispatch()

  return (
    <div className={st.control}>
      <Button text={'Auto'} bg={'gray'}/>
      <Button text={'Start'} bg={'blue'}/>
      <Button handler={() => dispatch(reset())} text={'Reset'} bg={'red'}/>
    </div>
  )
}
