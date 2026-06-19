"use client"

import Avatar from "@/components/Avatar"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"

export type LinkedCharacter = {
  id: string
  name: string
  avatarUrl: string
  mainCharacter?: boolean
}

function CharacterOption({ character }: { character: LinkedCharacter }) {
  return (
    <div className="flex items-center gap-2">
      <Avatar
        size={24}
        src={character.avatarUrl}
        username={character.name}
        imageKey={character.id}
        className="shrink-0"
      />
      <span className="truncate">{character.name}</span>
      {character.mainCharacter && (
        <Badge variant="secondary" className="ml-auto shrink-0">
          Default
        </Badge>
      )}
    </div>
  )
}

export default function LinkedCharacterSelect({
  characters,
  value,
  onChange,
}: {
  characters: LinkedCharacter[]
  value: string
  onChange: (characterId: string) => void
}) {
  const selected =
    characters.find((entry) => entry.id === value) ?? characters[0]

  return (
    <div className="space-y-2">
      <Label className="text-muted-foreground text-xs font-bold uppercase tracking-wide">
        Linked to
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-auto py-2">
          {selected ? <CharacterOption character={selected} /> : null}
        </SelectTrigger>
        <SelectContent>
          {characters.map((character) => (
            <SelectItem key={character.id} value={character.id}>
              <CharacterOption character={character} />
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
