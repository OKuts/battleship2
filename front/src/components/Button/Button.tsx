import React, {FC} from 'react'

import st from './Button.module.scss'

interface IButtonProps {
  text: string
  bg: string
  handler?: () => void
}

export const Button: FC<IButtonProps> = ({text, bg, handler = ()=>{}}) => {

  const clickHandler = () => {
    if (handler) handler()
  }

  return (
    <button
      onClick={handler}
      style={{background: bg}}
      className={st.button}>
      {text}
    </button>
  )
}
