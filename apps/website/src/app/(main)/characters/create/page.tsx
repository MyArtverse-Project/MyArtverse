import { Metadata } from "next"
import CreateCharacterForm from "./CreateCharacterForm"

export const metadata: Metadata = {
  title: "Create Fursona"
}

export default function Page() {
  return <CreateCharacterForm />
}
