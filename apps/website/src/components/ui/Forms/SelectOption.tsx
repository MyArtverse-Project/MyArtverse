import type { LucideIcon } from "lucide-react"

export default function SelectOption({
  label,
  value,
  prefixIcon,
  suffixIcon
}: {
  label: string
  value: string
  prefixIcon: React.ReactElement<LucideIcon>
  suffixIcon: React.ReactElement<LucideIcon>
}) {
  return (
    <option value={value}>
      {prefixIcon}
      {label}
      {suffixIcon}
    </option>
  )
}
