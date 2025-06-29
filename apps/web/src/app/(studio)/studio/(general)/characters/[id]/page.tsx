import { fetchCharacterById } from '@/utils/api'
import EditCharacter from './EditCharacter'

export default async function Page({ params }: { params: { id: string } }) {
  const character = await fetchCharacterById(params.id)
  return <EditCharacter character={character} />
}
