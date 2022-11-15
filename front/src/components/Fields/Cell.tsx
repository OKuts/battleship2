import React, {FC, useEffect, useState} from 'react'

import st from './Field.module.scss'

interface ICellProps {
  id: string
  hover: (id: string) => void
  ship?: string | null
  attack?: boolean
  selectedShip: string
}

export const Cell: FC<ICellProps> = (
  {
    id,
    hover,
    ship,
    attack,
    selectedShip,
  }) => {
  const [cn, setCn] = useState('')
  const [, , y, x] = id

  const overHandler = () => {
    hover(id)
    setCn('hover')
  }

  const leaveHandler = () => {
    if (selectedShip !== ship) setCn('')
  }

  useEffect(() => { setCn( selectedShip === ship ? 'hover' : '')}, [selectedShip])

  return (
    <td
      className={st[cn]}
      onMouseLeave={leaveHandler}
      onMouseOver={overHandler}
      style={{background: ship ? attack ? 'red' : 'deepskyblue' : ''}}
      id={id}>
      {y === '0' && <div className={st.coordinateX}>{String.fromCharCode(+x + 65)}</div>}
      {x === '0' && <div className={st.coordinateY}>{y}</div>}
      {attack && <>&bull;</>}
    </td>
  )
}
