import { Context } from "../context/Context"
import { verify } from "jsonwebtoken"
import { MiddlewareFn } from "type-graphql"

export const isAuth: MiddlewareFn<Context> = ({ context }, next) => {
	const auth = context.req.headers["authorization"] as string
	if (!auth) throw new Error("Not authenticated")
	try {
		const token = auth.split(" ")[1]
		const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!)
		context.payload = payload as any
	} catch (err) {
		console.log(err)
		throw new Error("Not authenticated")
	}
	return next()
}
