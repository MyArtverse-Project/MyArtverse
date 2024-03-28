"use client"

import Link from "next/link"
import { MFImage } from "@/components/ui"
import Table from "@/components/ui/Table"
import { LuGlobe, LuLock, LuUsers } from "react-icons/lu"
import type { Character } from "@/types/characters"

const VisibilityIcons = {
  public: <LuGlobe size={20} className="mr-2" />,
  follower: <LuUsers size={20} className="mr-2" />,
  private: <LuLock size={20} className="mr-2" />
}

export function CharacterTable({ children }: { children?: React.ReactNode }) {
  return (
    <Table>
      <Table.ColGroup>
        <Table.Col width="0.1%" />
        <Table.Col width="33%" />
        <Table.Col width="15%" />
        <Table.Col width="12.75%" />
        <Table.Col width="12.75%" />
      </Table.ColGroup>
      <Table.Header>
        <Table.Row>
          <Table.Head colSpan={2}>Character</Table.Head>
          <Table.Head>Visibility</Table.Head>
          <Table.Head>Date</Table.Head>
          <Table.Head>Ownership</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body hoverItems>{children}</Table.Body>
    </Table>
  )
}

export function CharacterItem({ character }: { character: Character }) {
  const charLink = `/dashboard/characters/edit/${character.name}`

  return (
    <Table.Row>
      <Table.Cell>
        <input type="checkbox" />
      </Table.Cell>
      <Table.Cell className="flex items-center gap-x-4">
        <Link href={charLink}>
          <MFImage
            src={character.avatarUrl || "/UserProfile.png"}
            aspectRatio="1"
            alt=""
            rounded={8}
            objectFit="cover"
            width="3.75rem"
          />
        </Link>
        <div>
          <Link
            href={charLink}
            className="font-inter block w-full text-lg font-bold hover:underline"
          >
            {character.name} {character.mainCharacter && "(Main)"}
          </Link>
          <span className="mt-0.5 w-full">
            {character.species ? character.species : `Needs Attention`}
          </span>
        </div>
      </Table.Cell>
      <Table.Cell>
        <span className="flex flex-row items-center">
          {VisibilityIcons[character.visibility]} {character.visibility.toUpperCase()}
        </span>
      </Table.Cell>
      <Table.Cell>Date field</Table.Cell>
      <Table.Cell>
        <span>Full</span>
      </Table.Cell>
    </Table.Row>
  )
}

export function CharacterItemSkeleton() {
  return (
    <Table.Row className="hover:!bg-transparent">
      <Table.Cell>
        <div
          aria-hidden
          className="bg-skeleton size-7 animate-pulse rounded-md bg-opacity-100"
        />
      </Table.Cell>
      <Table.Cell className="flex items-center gap-x-4">
        <div
          aria-hidden
          className="bg-skeleton size-[3.75rem] animate-pulse rounded-md bg-opacity-100"
        />
        <div>
          <div
            aria-hidden
            className="bg-skeleton mb-2.5 h-5 w-40 animate-pulse rounded-sm bg-opacity-100"
          />
          <div
            aria-hidden
            className="bg-skeleton h-3 w-56 animate-pulse rounded-sm bg-opacity-100"
          />
        </div>
      </Table.Cell>
      <Table.Cell>
        <div
          aria-hidden
          className="bg-skeleton h-5 w-24 animate-pulse rounded-sm bg-opacity-100"
        />
      </Table.Cell>
      <Table.Cell>
        <div>
          <div
            aria-hidden
            className="bg-skeleton mb-2 h-4 w-32 animate-pulse rounded-sm bg-opacity-100"
          />
          <div
            aria-hidden
            className="bg-skeleton h-3 w-28 animate-pulse rounded-sm bg-opacity-100"
          />
        </div>
      </Table.Cell>
      <Table.Cell>
        <div
          aria-hidden
          className="bg-skeleton h-5 w-24 animate-pulse rounded-sm bg-opacity-100"
        />
      </Table.Cell>
    </Table.Row>
  )
}
