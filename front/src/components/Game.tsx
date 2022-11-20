import React, {FC} from 'react'
import {EnemyField} from "./Fields/EnemyField";
import {Control} from "./Control/Control";
import {MyField} from "./Fields/MyField";

export const Game: FC = () => {
  return (
    <div className={'wrap'}>
      <MyField />
      <Control/>
      <EnemyField />
    </div>
  )
}
