"use client"

import Link from "next/link"
import { MFImage } from "@/components/ui"
import Table from "../../ui/Table"

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

export function CharacterItem() {
  const charLink = "/dashboard/characters/edit/name"

  return (
    <Table.Row>
      <Table.Cell>chkbox</Table.Cell>
      <Table.Cell className="flex items-center gap-x-4">
        <Link href={charLink}>
          <MFImage
            src="/img/examples/ozzy/testing.png"
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
            Name
          </Link>
          <span className="mt-0.5 w-full">Char attrs</span>
        </div>
      </Table.Cell>
      <Table.Cell>Visibility field</Table.Cell>
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
