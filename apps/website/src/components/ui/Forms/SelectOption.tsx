import type { IconType } from "react-icons"

export default function SelectOption({
  label,
  value,
  prefixIcon,
  suffixIcon
}: {
  label: string
  value: string
  prefixIcon: React.ReactElement<IconType>
  suffixIcon: React.ReactElement<IconType>
}) {
  return (
    <option value={value}>
      {prefixIcon}
      {label}
      {suffixIcon}
    </option>
  )
}
