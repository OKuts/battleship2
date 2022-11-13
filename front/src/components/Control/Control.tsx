import React, { FC } from 'react'
import st from './Control.module.scss'
import {Button} from "../Button/Button";

export const Control: FC = () => {

  return (
    <div className={st.control}>
        <Button text={'Auto'} bg={'gray'}/>
        <Button text={'Start'} bg={'red'}/>
    </div>
  )
}
