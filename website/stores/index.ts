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

/**
 * Accent color of a user's profile
 * @default "blue"
 */
type AccentColors =
	| "orange"
	| "yellow"
	| "cyan"
	| "blue"
	| "green"
	| "purple"
	| "red"
	| "gray"

interface Fursona {
	name: string
	species: string
	bio: string
}

interface ProfileStore {
	accountName: string
	accountStatus: string
	accountCreated: Date | string
	fursonas: Fursona[] & never[]
	followers: number
	following: number
	profileAccentColor: AccentColors
	isPrivateProfile: boolean
	isSuspended: boolean
	isBlocked: boolean
}

export const useProfileStore = defineStore("profile", () => {
	state: (): Partial<ProfileStore> => {
		return {
			accountName: "",
			accountStatus: "",
			profileAccentColor: "blue",
			fursonas: [],
			isSuspended: false,
		}
	}
})
