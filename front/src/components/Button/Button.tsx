import React, {FC} from 'react'

import st from './Button.module.scss'

interface IButtonProps {
  text: string
  bg: string
}

export const Button: FC<IButtonProps> = ({text, bg}) => {
  return (
    <button
      style={{background: bg}}
      className={st.button}>
      {text}
    </button>
  )
}
