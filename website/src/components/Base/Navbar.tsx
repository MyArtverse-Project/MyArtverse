"use client"

import {
  MenuIcon,
  BellIcon,
  SearchIcon,
  ChevronDown,
  PlusIcon
} from "lucide-react"
import Link from "next/link"

import { Avatar, Button } from "../ui"

export default function Navbar() {
  return (
    <>
      <nav className="flex items-center justify-between px-4 py-3 text-sm font-medium select-none">
        <div className="flex items-center gap-x-2.5">
          {/* Skip nav accessibility */}
          <a
            href="#skip-navigation"
            className="rounded-2xl bg-white fixed top-2 left-2 px-3.5 py-1.5 opacity-0 pointer-events-none focus:pointer-events-auto focus:opacity-100"
            aria-label="Skip to content"
          >
            Skip to content
          </a>
          <Button iconOnly>
            <MenuIcon size={20} />
          </Button>
          <Link href="/" aria-label="Home" title="Home">
            MyFursona
          </Link>
        </div>
        <div className="flex items-center gap-x-2.5">
          <Button prefixIcon={<SearchIcon size={20} />}>Search</Button>
          <Button iconOnly variant="secondary" aria-label="Notifications">
            <BellIcon size={20} />
          </Button>
          <Button
            iconOnly
            variant="secondary"
            aria-label="Add or create item"
            suffixIcon={<ChevronDown size={19} />}
          >
            <PlusIcon size={20} />
          </Button>
          <Avatar name="cutie" src="/img/hero/vulpo.jpg" />
          <Button>Sign in</Button>
        </div>
      </nav>
    </>
  )
}
