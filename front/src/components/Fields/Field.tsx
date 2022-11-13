import React, {FC} from 'react'
import {getArr10x10} from "../../utils/getArr10x10"
import st from './Field.module.scss'
import {Cell} from "./Cell";

interface IFieldProps {
  own: string
  hover: (id: string) => void
  leave: () => void
}

export const Field: FC<IFieldProps> = ({own, hover, leave}) => {
  return (
    <table
      onMouseLeave={leave}
      className={st.table}>
      <tbody>
      {getArr10x10().map((line, row) =>
        <tr key={`${own}${row}`}>
          {line.map((cell: string) =>
            <Cell
              hover={hover}
              id={`${own}${cell}`}
              key={`${own}${cell}`}/>)}
        </tr>
      )}
      </tbody>
    </table>
  )
}
