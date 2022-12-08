import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"

export default function UnderConstruction() {
  const [showWIP, setShowWIP] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("hide-wip-notice") !== "true") {
      setShowWIP(true)
    }
  }, [])

  const hideNotice = () => {
    setShowWIP(false)
    localStorage.setItem("hide-wip-notice", "true")
  }

  return (
    <div className={showWIP !== false ? "wip-notice" : "wip-notice hidden"}>
      <FontAwesomeIcon icon={faExclamationTriangle} size="lg" />
      <strong>This project is currently under construction.</strong>
      <span>
        <em>MyFursona</em> is an open-source project — help us out by
        contributing the project on{" "}
        <Link
          href="https://github.com/MyFursona-Project/MyFursona"
          target="_blank"
        >
          GitHub
        </Link>
        !
      </span>
      <button id="dismiss-btn" onClick={hideNotice}>
        Close
      </button>
    </div>
  )
}
