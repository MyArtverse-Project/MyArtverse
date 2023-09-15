import { Metadata } from "next"
import CreateCharacterForm from "./CreateProfileForm"

export const metadata: Metadata = {
  title: "Create Fursona"
}

export default function Page() {
  return <CreateCharacterForm />
}
