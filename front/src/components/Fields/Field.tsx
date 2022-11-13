import React, {FC} from 'react'
import {getArr10x10} from "../../utils/getArr10x10"
import st from './Field.module.scss'
import {MyCell} from "./MyCell";
import {IGame, MyFlotClass} from "../../classes/MyFlotClass";

interface IFieldProps {
  own: string
  hover: (id: string) => void
  leave: () => void
  game?: IGame
}

export const Field: FC<IFieldProps> = ({own, hover, leave, game}) => {
  if (game) console.log(game)
  return (
    <table
      onMouseLeave={leave}
      className={st.table}>
      <tbody>
      {getArr10x10().map((line, row) =>
        <tr key={`${own}${row}`}>
          {line.map((cell: string, i: number) =>
            <MyCell
              ship = {game?.sea[row * 10 + i].ship}
              attack = {game?.sea[row * 10 + i].attack}
              hover={hover}
              id={`${own}${cell}`}
              key={`${own}${cell}`}/>)}
        </tr>
      )}
      </tbody>
    </table>
  )
}
