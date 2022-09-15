import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"

const Footer = () => {
  return (
    <footer id="wrapper-desktop">
      <div className="container">
        <span>&copy; {new Date().getFullYear()} MyFursona</span>
        <nav>
          <ul>
            <li>Copyright</li>
            <li>Contact</li>
            <li>
              <Link
                href="https://github.com/MyFursona-Project/MyFursona"
                passHref
              >
                <FontAwesomeIcon icon={faGithub} />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}

export default Footer