import React, {FC, useEffect, useState} from 'react'
import {Field} from "./components/Fields/Field";
import {Control} from "./components/Control/Control";
import {MyFlotClass} from "./classes/MyFlotClass";

export const Game: FC = () => {
  const [currentCell, setCurrentCell] = useState('')
  const [game, setGame] = useState(new MyFlotClass().getGame())

  const leave = () => {
    setCurrentCell('')
  }
  const hover = (id: string) => {
    setCurrentCell(id)
  }

  return (
    <div className={'wrap'}>
      <Field game={game} hover={hover} leave={leave} own={'my'}/>
      <Control/>
      <Field hover={hover} leave={leave} own={'en'}/>
    </div>
  )
}
