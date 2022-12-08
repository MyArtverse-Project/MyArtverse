import styles from "./Button.module.scss"

interface ButtonProps {
  children?: React.ReactNode
  style?: React.CSSProperties
  onClick?: () => void
  type?: UIStates
}

export function Button(props: ButtonProps) {
  return (
    <button onClick={props.onClick} style={props.style}>
      {props.children}
    </button>
  )
}
