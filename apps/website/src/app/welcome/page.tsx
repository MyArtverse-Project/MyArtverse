import type { Metadata } from "next"
import CreateProfileForm from "./CreateProfileForm"

export const metadata: Metadata = {
  title: {
    absolute: "Welcome to MyFursona!"
  }
}

export default function Page() {
  return <CreateProfileForm />
}
