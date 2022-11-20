import React, {FC, useState} from 'react'

import st from './Field.module.scss'

interface ICellProps {
  id: string
  attack: boolean | null
  nextStep: (id: string) => void
}

export const EnemyCell: FC<ICellProps> = ({id, attack, nextStep}) => {
  const [cn, setCn] = useState('')
  const [y, x] = id

  const overHandler = () => {
    setCn('hover')
  }

  const leaveHandler = () => {
    setCn('')
  }

  return (
    <td
      className={st[cn]}
      onMouseLeave={leaveHandler}
      onMouseOver={overHandler}
      onClick={() => nextStep(id)}
      style={{background: attack ? 'red': '' }}
      id={id}>
      {y === '0' && <div className={st.coordinateX}>{String.fromCharCode(+x + 65)}</div>}
      {x === '0' && <div className={st.coordinateY}>{y}</div>}
      {attack === false && <>&bull;</>}
    </td>
  )
}
