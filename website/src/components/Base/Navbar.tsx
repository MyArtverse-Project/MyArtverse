import dynamic from "next/dynamic"

import { MenuIcon, BellIcon, SearchIcon, LogInIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "../ui"

const SidebarClient = dynamic(
	() => import("../Sidebar").then((c) => c.Sidebar),
	{ ssr: false }
)

export default function Navbar() {
	return (
		<>
			{/* Skip to content accessibility */}
			<a
				href="#skip-to-main-content"
				className="fixed top-0 left-0"
				aria-label="Skip to content"
			>
				Skip to content
			</a>
			{/* Header */}
			<header className="flex items-center justify-between px-10 py-5">
				<div className="flex items-center gap-x-3">
					<button>
						<MenuIcon />
					</button>
					<Link href="/" aria-label="Home" title="Home">
						MyFursona
					</Link>
				</div>
				<div className="flex items-center gap-x-4">
					<button className="flex items-center relative gap-x-2 px-4 py-1.5 border border-red-200 rounded-md">
						<SearchIcon size={20} />
						<span className="font-medium">Search</span>
					</button>
					<button>
						<BellIcon />
					</button>
					<button>Avatar</button>
					<Button prefixIcon={<LogInIcon />}>Log in</Button>
				</div>
			</header>
			<SidebarClient />
		</>
	)
}
