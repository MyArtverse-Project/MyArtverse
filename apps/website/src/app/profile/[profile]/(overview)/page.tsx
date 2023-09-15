"use client"

import { useState } from "react"

import type { Metadata, ResolvingMetadata } from "next"
import { AlertOctagon, XIcon } from "lucide-react"
import { EmptySection, Modal } from "@/components/ui"
import { Button } from "@/components/ui/Buttons"

type Props = {
  params: {
    profile: string
    slug: string
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

// export async function generateMetadata(
//   { params, searchParams }: Props,
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   // !! NOTE: For testing only, actual user data is going to be fetched through the API
//   const decodeUserHandle = params.profile
//   return {
//     title: `User`,
//     description: `Follow ${decodeUserHandle} on MyFursona by creating an account!`
//   }
// }

export default function Page() {
  const [isModalOpen, setModalOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setModalOpen(!isModalOpen)}>
        Modal trigger test
      </Button>

      <Modal state={isModalOpen} toggler={() => setModalOpen(!isModalOpen)}>
        <Modal.Title>
          <div className="font-bold font-inter text-2xl">Title</div>
          <Button
            onClick={() => setModalOpen(!isModalOpen)}
            variant="tritery"
            aria-label="Close"
            iconOnly
            prefixIcon={<XIcon size={21} />}
            size="small"
          />
        </Modal.Title>
        <div>Content</div>
      </Modal>

      <EmptySection icon={AlertOctagon}>
        <EmptySection.Heading>This username is reserved</EmptySection.Heading>
        <p>
          We reserve names that are blacklisted, generally considered
          derogatory, offensive, inappropriate, or otherwise not in accordance
          to our Community Guidelines will be permanently barred from creation.
        </p>
        <p>
          In some cases, we can also reserve specific usernames for those
          looking to claim their profile on MyFursona.
        </p>
      </EmptySection>
    </>
  )
}
