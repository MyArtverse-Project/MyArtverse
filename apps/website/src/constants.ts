import { BRAND } from "@myfursona-internal/config/index"

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const config = {
  description: `${BRAND} is a social platform where you manage and keep track of your fursonas, art commissions, trades, and character adoptables!`
}

export const FOOTER_ITEMS = [
  {
    heading: "Explore",
    links: [
      { text: "Download client" },
      { text: "MyFursona+", link: "/plus" },
      { text: "Beta testing" },
      { text: "Contact" }
    ]
  },
  {
    heading: "Resources",
    links: [
      { text: "Blog" },
      { text: "FAQ" },
      { text: "Brand" },
      { text: "Developers" },
      { text: "Contributing" },
      { text: "Open Source" },
      { text: "Licenses" }
    ]
  },
  {
    heading: "Legal",
    links: [
      { text: "About MyFursona" },
      { text: "Community Guidelines" },
      { text: "Terms of Service" },
      { text: "Privacy Policy" }
    ]
  }
]
