import { Metadata } from "next"
import CreateProfileForm from "./CreateProfileForm"

export const metadata: Metadata = {
  title: "Create profile"
}

export default function Page() {
  return <CreateProfileForm />
}
