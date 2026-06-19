import { BRAND } from "@mav/shared"

export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

export const USER_DEFAULT_AVATAR = "/UserProfile.png"

export const isRemoteImageUrl = (url: string) =>
  url.startsWith("http://") || url.startsWith("https://")

export const emailRegex =
  /^[^@#$%^&*()_+=\[{\\};:<>|\s,\/?]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/

export const config = {
  description: `${BRAND} is a social platform where you manage and keep track of your fursonas, art commissions, trades, and character adoptables!`
}

export const furrySpeciesOptions = [
  { label: "Fox", value: "fox" },
  { label: "Wolf", value: "wolf" },
  { label: "Rabbit", value: "rabbit" },
  { label: "Cat", value: "cat" },
  { label: "Dog", value: "dog" },
  { label: "Bear", value: "bear" },
  { label: "Otter", value: "otter" },
  { label: "Raccoon", value: "raccoon" },
  { label: "Dragon", value: "dragon" }, // Mythical creatures included
  { label: "Lion", value: "lion" },
  { label: "Tiger", value: "tiger" },
  { label: "Deer", value: "deer" },
  { label: "Skunk", value: "skunk" },
  { label: "Hyena", value: "hyena" },
  { label: "Cheetah", value: "cheetah" },
  { label: "Leopard", value: "leopard" },
  { label: "Panda", value: "panda" },
  { label: "Red Panda", value: "redpanda" },
  { label: "Squirrel", value: "squirrel" },
  { label: "Kangaroo", value: "kangaroo" },
  { label: "Koala", value: "koala" },
  { label: "Bat", value: "bat" },
  { label: "Giraffe", value: "giraffe" },
  { label: "Horse", value: "horse" },
  { label: "Zebra", value: "zebra" },
  { label: "Elephant", value: "elephant" },
  { label: "Hippopotamus", value: "hippopotamus" },
  { label: "Rhino", value: "rhino" },
  { label: "Griffin", value: "griffin" },
  { label: "Pegasus", value: "pegasus" },
  { label: "Rat", value: "rat" },
  { label: "Unicorn", value: "unicorn" }
]

export const pronounOptions = [
  { label: "He/Him", value: "hehim" },
  { label: "She/Her", value: "sheher" },
  { label: "They/Them", value: "theythem" },
  { label: "Ze/Hir", value: "zehir" },
  { label: "Ze/Zir", value: "zezir" },
  { label: "Xe/Xem", value: "xexem" },
  { label: "Ey/Em", value: "eyem" },
  { label: "Any Pronouns", value: "any" },
  { label: "Prefer Not to Say", value: "prefernot" }
]

export const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Non-Binary", value: "nonbinary" },
  { label: "Genderfluid", value: "genderfluid" },
  { label: "Agender", value: "agender" },
  { label: "Transgender", value: "transgender" },
  { label: "Genderqueer", value: "genderqueer" },
  { label: "Two-Spirit", value: "twospirit" },
  { label: "Prefer Not to Say", value: "prefernot" },
  { label: "Other", value: "other" }
]

export const folderColors = [
  "#9ca3af",
  "#f87171",
  "#fb923c",
  "#facc15",
  "#4ade80",
  "#60a5fa",
  "#a78bfa",
  "#c084fc",
  "#f472b6",
] as const
