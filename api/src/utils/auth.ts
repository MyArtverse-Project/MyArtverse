import { Profile } from "@prisma/client"
import { sign } from "jsonwebtoken"

export const generateRefreshToken = (user: Profile) => {
	return sign({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET!, {
		expiresIn: "30d",
	})
}

export const generateAccessToken = (user: Profile) => {
	return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
		expiresIn: "10m",
	})
}
