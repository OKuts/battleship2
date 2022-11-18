import React, {FC, useEffect, useState} from 'react'

import st from './Field.module.scss'

interface ICellProps {
  id: string
  ship?: string
  attack?: boolean
  selectedShip: string
  plan?: string
}

export const Cell: FC<ICellProps> = (
  {
    id,
    ship,
    attack,
    selectedShip,
    plan
  }) => {
  const [cn, setCn] = useState('')
  const [, , y, x] = id

  const overHandler = () => {
    setCn('hover')
  }

  const leaveHandler = () => {
    setCn('')
  }

  useEffect(() => {
    setCn( selectedShip === ship && ship ? 'hover' : '')
  }, [selectedShip])

  return (
    <td
      className={st[cn]}
      onMouseLeave={leaveHandler}
      onMouseOver={overHandler}
      style={{background: ship ? 'deepskyblue' : plan ? 'red' : ''}}
      id={id}>
      {y === '0' && <div className={st.coordinateX}>{String.fromCharCode(+x + 65)}</div>}
      {x === '0' && <div className={st.coordinateY}>{y}</div>}
      {attack && <>&bull;</>}
    </td>
  )
}
