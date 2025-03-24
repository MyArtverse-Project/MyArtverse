import { furrySpeciesOptions, genderOptions, pronounOptions } from "./constants"

const fallbackValue = "Unknown"

const displayOption = (options: { value: string; label: string }[], value: string) => {
  return options.find((option) => option.value === value)?.label || fallbackValue
}

export const displaySpecies = (species: string) => {
  return displayOption(furrySpeciesOptions, species)
}

export const displayPronouns = (pronouns: string) => {
  return displayOption(pronounOptions, pronouns)
}

export const displayGender = (gender: string) => {
  return displayOption(genderOptions, gender)
}
