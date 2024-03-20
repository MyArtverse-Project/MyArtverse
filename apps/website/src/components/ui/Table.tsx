import cn from "@/utils/cn"
import type { ReactMapElement } from "@/types/utils"

function TRoot({ children }: { children?: React.ReactNode }) {
  return <table>{children}</table>
}

function TColGroup({ children }: { children?: React.ReactNode }) {
  return <colgroup>{children}</colgroup>
}

function TCol({ width }: { width?: string }) {
  return <col style={{ width }} />
}

function THeader({ children }: { children?: React.ReactNode }) {
  return <thead>{children}</thead>
}

function THead({
  children,
  ...attrs
}: { children?: React.ReactNode } & Pick<ReactMapElement<"th">, "colSpan">) {
  return (
    <th className="border-separator h-11 border-b px-5 text-left" {...attrs}>
      {children}
    </th>
  )
}

function TFooter({ children }: { children?: React.ReactNode }) {
  return <tfoot>{children}</tfoot>
}

function TBody({
  children,
  hoverItems
}: {
  children?: React.ReactNode
  hoverItems?: boolean
}) {
  return (
    <tbody
      className={cn(hoverItems ? "[&_tr:hover]:bg-300 [&_tr:hover]:bg-opacity-40" : null)}
    >
      {children}
    </tbody>
  )
}

function TRow({
  children,
  className
}: { children?: React.ReactNode } & Pick<ReactMapElement<"tr">, "className">) {
  return <tr className={cn("border-mute border-0 border-b", className)}>{children}</tr>
}

function TCell({
  children,
  className,
  ...attrs
}: { children?: React.ReactNode } & Pick<
  ReactMapElement<"td">,
  "colSpan" | "className"
>) {
  return (
    <td className={cn("px-5 py-2.5", className)} {...attrs}>
      {children}
    </td>
  )
}

const Table = Object.assign(TRoot, {
  ColGroup: TColGroup,
  Col: TCol,
  Header: THeader,
  Head: THead,
  Body: TBody,
  Row: TRow,
  Cell: TCell,
  Footer: TFooter
})

export default Table
