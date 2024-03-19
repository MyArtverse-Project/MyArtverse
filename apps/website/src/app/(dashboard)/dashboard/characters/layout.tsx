import CharDynamicLayout from "./CharDynamicLayout"

export default function CharactersLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return <CharDynamicLayout>{children}</CharDynamicLayout>
}
