import React, {FC, useEffect} from 'react'
import {EnemyField} from "./Fields/EnemyField";
import {Control} from "./Control/Control";
import {MyField} from "./Fields/MyField";
// import io from "socket.io-client";

export const Game: FC = () => {
  // useEffect(()=> {
  //   // dispatch(initConnection())
  //   io().on('back', (data)=> {
  //     console.log('data', data)
  //   })
  // }, [])
  return (
    <div className={'wrap'}>
      <MyField />
      <Control/>
      <EnemyField />
    </div>
  )
}
