import { fetchCharacterById } from '@/utils/api'
import EditCharacter from './EditCharacter'

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const character = await fetchCharacterById(id)
  return <EditCharacter character={character} />
}
