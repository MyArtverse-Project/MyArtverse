import Link from "next/link"

import Logo from "../Logo"
import { version } from "../../../package.json"
import { CircleDotIcon } from "lucide-react"

export default function Footer() {
  return (
    <footer className="mx-40">
      <div className="flex flex-row justify-around">
        <div className="flex flex-col justify-between w-fit">
          <div className="flex flex-col ">
            <Logo />
            <Link
              href={"/"}
              className="flex flex-row px-2 py-1 my-3 border border-red-200 rounded-md w-fit"
            >
              <span>Status:</span>{" "}
              <span className="flex flex-row text-green-500">
                <CircleDotIcon className="mx-2" /> <p>All systems normal</p>
              </span>
            </Link>
          </div>

          <div>
            <p>Copyright &copy; 2022-2023 The MyFursona Project</p>
            <p>MyFursona v{version}</p>
          </div>
        </div>
        <div className="flex flex-row ">
          <div className="flex flex-col mx-16">
            <p className="my-2 font-semibold text-red-200">Explore</p>
            <Link className="my-2 font-bold" href="/" passHref>
              MyFursona+
            </Link>
            <Link className="my-2 font-bold" href="/" passHref>
              Developers
            </Link>
            <Link className="my-2 font-bold" href="/" passHref>
              Beta Testing
            </Link>
            <Link className="my-2 font-bold" href="/" passHref>
              Report an issue
            </Link>
          </div>
          <div className="flex flex-col mx-16">
            <p className="my-2 font-semibold text-red-200">About</p>
            <Link href="/" className="my-2 font-bold" passHref>
              Team
            </Link>
            <Link href="/" className="my-2 font-bold" passHref>
              FAQ
            </Link>
            <Link href="/" className="my-2 font-bold" passHref>
              Open Source
            </Link>
            <Link href="/" className="my-2 font-bold" passHref>
              Changelog
            </Link>
            <Link href="/" className="my-2 font-bold" passHref>
              Design
            </Link>
            <Link href="/" className="my-2 font-bold" passHref>
              Contact Us
            </Link>
          </div>
          <div className="flex flex-col mx-16">
            <p className="my-2 font-semibold text-red-200">Legal</p>
            <Link className="my-2 font-bold" href="/" passHref>
              Community Guidelines
            </Link>
            <Link className="my-2 font-bold" href="/" passHref>
              Terms of Service
            </Link>
            <Link className="my-2 font-bold" href="/" passHref>
              Privacy Policy
            </Link>
            <Link className="my-2 font-bold" href="/" passHref>
              DMCA Policy
            </Link>
            <Link className="my-2 font-bold" href="/" passHref>
              Code of Conduct
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
