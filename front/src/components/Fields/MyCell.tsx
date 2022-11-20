import React, {FC, useEffect, useState} from 'react'

import st from './Field.module.scss'

interface ICellProps {
  id: string
  ship?: string
  attack?: boolean
  selectedShip: string
  isMark?: boolean
}

export const MyCell: FC<ICellProps> = (
  {
    id,
    ship,
    attack,
    selectedShip,
    isMark
  }) => {
  const [cn, setCn] = useState('')
  const [y, x] = id

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
      style={{background: isMark ? 'red' : ship ? 'deepskyblue' : ''}}
      id={id}>
      {y === '0' && <div className={st.coordinateX}>{String.fromCharCode(+x + 65)}</div>}
      {x === '0' && <div className={st.coordinateY}>{y}</div>}
      {attack && <>&bull;</>}
    </td>
  )
}
