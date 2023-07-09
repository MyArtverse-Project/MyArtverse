import { ReactElement } from "react"
import { LucideIcon } from "lucide-react"
import { ChildrenNode } from "@/types"

interface ChipProps extends ChildrenNode {
	prefixIcon?: ReactElement<LucideIcon>
	text?: string
}

export default function Chip({ prefixIcon, text }: ChipProps) {
	return (
		<div data-component="chip">
			{prefixIcon}
			{text}
		</div>
	)
}
