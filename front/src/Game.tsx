import React, {FC, useEffect} from 'react'
import {Field} from "./components/Fields/Field";
import {Control} from "./components/Control/Control";
import {useAppDispatch, useAppSelector} from "./hooks/useAppDispatch";

export const Game: FC = () => {
  const {sea} = useAppSelector(state => state.game)

  useEffect(()=>{
    console.log(sea)
  },[])

  return (
    <div className={'wrap'}>
      <Field sea={sea} own={'my'}/>
      <Control/>
      <Field own={'en'}/>
    </div>
  )
}
