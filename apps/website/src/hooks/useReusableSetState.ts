import type { MapElement } from "@/types/utils"

export function useReusableSetState<S>(stateFn: React.Dispatch<React.SetStateAction<S>>) {
  return (event: React.ChangeEvent<MapElement<"input">>) => {
    const { name, value } = event.currentTarget

    stateFn((prevValue) => ({ ...prevValue, [name]: value }))
  }
}
