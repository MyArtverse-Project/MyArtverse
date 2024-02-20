import type { Metadata } from "next"
import { BRAND } from "@myfursona-internal/config"
import CreateProfileForm from "./CreateProfileForm"

export const metadata: Metadata = {
  title: {
    absolute: `Welcome to ${BRAND}!`
  }
}

export default function Page() {
  return <CreateProfileForm />
}
