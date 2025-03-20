import { furrySpeciesOptions, genderOptions, pronounOptions } from "./constants"

export const displaySpecies = (species: string) => {
  return (
    furrySpeciesOptions.find((option) => option.value === species)?.label || "Unknown"
  )
}

export const displayPronouns = (pronouns: string) => {
  return pronounOptions.find((option) => option.value === pronouns)?.label || "Unknown"
}

export const displayGender = (gender: string) => {
  return genderOptions.find((option) => option.value == gender)?.label || "Unknown"
}
