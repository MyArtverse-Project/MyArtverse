"use client"

interface DashboardTableColumns {
  header: string
  ref: string
  width?: string
}

export default function Table({
  cols,
  data
}: {
  cols: DashboardTableColumns[] | never[]
  data: string[] | never[]
}) {
  return <table>...</table>
}
