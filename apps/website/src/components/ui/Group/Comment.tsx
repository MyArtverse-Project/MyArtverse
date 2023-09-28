"use client"

export default function Comment({
  children,
  author,
  badges,
  time,
  editable,
  favCount
}: {
  children?: React.ReactNode
  author?: string
  badges: string[]
  time?: Date | string
  editable?: boolean
  favCount?: number
}) {
  return <div id="comment">{children}</div>
}
