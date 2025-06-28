import { fetchCharacterById } from '@/utils/api'

export default async function Page({ params }: { params: { id: string } }) {
  const character = await fetchCharacterById(params.id)
  return <div>character page</div>
}
