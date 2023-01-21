import { defineStore } from "pinia"

interface UserSettingsStore {
  theme: "light" | "dark" | "system"
  colorProfile: string
  nsfwEnabled: boolean
  status: string
}

export const useUserSettingsStore = defineStore("settings", () => {
  state: (): UserSettingsStore => {
    return {
      theme: "system",
      colorProfile: "#fff",
      nsfwEnabled: false,
      status: "",
    }
  }
})
