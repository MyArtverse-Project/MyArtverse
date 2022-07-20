import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faExclamationTriangle
} from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"

export default function UnderConstruction() {
  const [showWIP, setShowWIP] = useState(false)
  useEffect(() => {
    setShowWIP(true)
  }
  , [])

  const toggleWIP = () => {
    setShowWIP(!showWIP)
  }

  return (
    <div
      className={
        showWIP !== false
          ? "wip-notice"
          : "wip-notice hidden"
      }
    >
      <FontAwesomeIcon icon={faExclamationTriangle} size="lg" />
      <strong>This project is currently under construction.</strong>
      <span>
        <em>MyFursona</em> is an open-source project — help us out by
        contributing the project on{" "}
        <Link href="https://github.com/MyFursona-Project/MyFursona" passHref>
          <a target="_blank">GitHub</a>
        </Link>
        !
      </span>
      <button id="dismiss-btn" onClick={toggleWIP}>
        Close
      </button>
    </div>
  )
}
