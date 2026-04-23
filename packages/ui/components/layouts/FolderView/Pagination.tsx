"use client"

interface FolderViewPaginationProps {
  maxPage: number
  /**
   * Default value is '1' unless explicitly overidden
   */
  currentPage?: number
  /**
   * Default value is '25'
   */
  displayItems?: 25 | 50 | 75
}

export function FolderViewPagination(_props: FolderViewPaginationProps) {
  return <></>
}
