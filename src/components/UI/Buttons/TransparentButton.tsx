import Link from "next/link"
import styles from "./Button.module.scss"

interface TransparentButtonProps extends ButtonTypes {
  label?: string
}

export function TransparentButton(props: TransparentButtonProps) {
  const handleNewTab = {
    target: !props.newTab ? undefined : "_blank",
    rel: !props.newTab ? undefined : "noopenner noreferrer"
  }

  return (
    <Link
      role="button"
      href={props.href ?? "#"}
      target={handleNewTab.target}
      className={props.className}
			id={styles["transparent-button"]}
      rel={handleNewTab.rel}
      aria-label={props.label}
      title={props.label}
    >
      {props.children}
    </Link>
  )
}
