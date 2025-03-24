export function useReusableSetState<S>(
  stateFn: React.Dispatch<React.SetStateAction<S>>
) {
  return (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget

    stateFn((prevValue) => ({ ...prevValue, [name]: value }))
  }
}
