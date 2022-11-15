import React, {FC, useEffect, useState} from 'react'
import {Field} from "./components/Fields/Field";
import {Control} from "./components/Control/Control";
import {useAppDispatch, useAppSelector} from "./hooks/useAppDispatch";

export const Game: FC = () => {
  const dispatch = useAppDispatch()
  const {game} = useAppSelector(state => state.game)

  useEffect(()=>{
    // dispatch(printGame())
    console.log(game)
  },[])

  return (
    <div className={'wrap'}>
      <Field game={game} own={'my'}/>
      <Control/>
      <Field own={'en'}/>
    </div>
  )
}
