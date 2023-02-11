import { generateAccessToken, generateRefreshToken } from "./../utils/auth"
import { prisma } from "../index"
import * as bcrypt from "bcryptjs"
import {
	Resolver,
	Query,
	Arg,
	Int,
	ObjectType,
	Field,
	Mutation,
	Ctx,
	UseMiddleware,
} from "type-graphql"
import { randomInt } from "crypto"
import { Context } from "../context/Context"
import { isAuth } from "../middlewares/isAuthenticated"

@ObjectType()
class LoginResponse {
	@Field()
	accessToken: string
}

@ObjectType()
class Profile {
	@Field(() => Int)
	id: number
	@Field()
	email: string
	@Field()
	username: string
	@Field()
	bio: string
	@Field(() => Int)
	age: number
	@Field(() => Int)
	likes: number
	@Field()
	status: string
	@Field()
	createdAt: Date
	@Field()
	updatedAt: Date
}

@Resolver()
export class ProfileResolver {
	@Query(() => Profile)
	async getProfileById(@Arg("userID", () => Int) userID: number) {
		const profile = prisma.profile.findFirst({
			where: {
				id: userID,
			},
		})
		return profile
	}

	@Query(() => Profile)
	async getProfileByUsername(@Arg("username", () => String) username: string) {
		username = username.toLowerCase()
		const profile = await prisma.profile.findFirst({
			where: {
				username: username,
			},
		})
		return profile
	}

	@Mutation(() => Profile)
	async register(
		@Arg("username", () => String) username: string,
		@Arg("email", () => String) email: string,
		@Arg("password", () => String) password: string,
		@Arg("age", () => Int) age: number
	) {
		const hashedPassword = await bcrypt.hash(password, 12)
		const profile = await prisma.profile.create({
			data: {
				email,
				username,
				password: hashedPassword,
				age: age,
				id: randomInt(999999),
			},
		})
		return profile
	}

	@Mutation(() => LoginResponse)
	async login(
		@Arg("username", () => String) username: string,
		@Arg("password", () => String) password: string,
		@Ctx() { res }: Context
	) {
		const user = await prisma.profile.findFirst({
			where: {
				username: username,
			},
		})
		if (!user) throw new Error("User not found")
		const valid = await bcrypt.compare(password, user.password)
		if (!valid) throw new Error("Incorrect password")
		res.cookie("jid", generateRefreshToken(user), { httpOnly: true })
		return {
			accessToken: generateAccessToken(user),
		}
	}

	@Query(() => Profile)
	@UseMiddleware(isAuth)
	async me(@Ctx() { payload }: Context) {
		if (!payload) throw new Error("Not authenticated")
		const user = await prisma.profile.findFirst({
			where: {
				id: payload.userId,
			},
		})
		if (!user) throw new Error("User not found idk how you fucked that up")
		return user
	}
}
