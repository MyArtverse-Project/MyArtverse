import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faExclamation,
  faExclamationTriangle
} from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"
import styles from "@/styles/WIP.module.scss"

export default function UnderConstruction() {
  return (
    <div id={styles["under-construction-notice"]}>
      <FontAwesomeIcon icon={faExclamationTriangle} size="2x" />
      <h2>Under construction</h2>
      <p>
        This site is currently under construction. <i>MyFursona</i> is an
        open-source project and help us out by contributing the project on{" "}
        <Link href="https://github.com/MyFursona-Project/MyFursona" passHref>
          <a target="_blank">GitHub</a>
        </Link>
        !
      </p>
    </div>
  )
}
