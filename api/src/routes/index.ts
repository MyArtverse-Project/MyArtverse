import { generateRefreshToken } from "./../utils/auth"
import express from "express"
import { verify } from "jsonwebtoken"
import { prisma } from "../index"
import { generateAccessToken } from "../utils/auth"
const router = express.Router()

router.get("/", (_, res) => {
	res.send("Hello World!")
})

router.post("/refresh", async (req, res) => {
	const token = req.cookies.jid
	if (!token) return res.send({ ok: false, accessToken: "" })
	let payload: any = null
	try {
		payload = verify(token, process.env.REFRESH_TOKEN_SECRET!)
	} catch (e) {
		return res.send({ ok: false, accessToken: "" })
	}
	const user = await prisma.profile.findFirst({
		where: { id: payload.userId },
	})
	if (!user) return res.send({ ok: false, accessToken: "" })
	res.cookie("jid", generateRefreshToken(user), { httpOnly: true })
	return res.send({ ok: true, accessToken: generateAccessToken(user) })
})

export default router
