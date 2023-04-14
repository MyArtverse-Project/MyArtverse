import "reflect-metadata"
import express from "express"
import routes from "./routes/index"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient
import { ApolloServer } from "apollo-server-express"
import { buildSchema } from "type-graphql"
import { HelloResolver, ProfileResolver } from "./resolvers/"
import * as dotenv from "dotenv"
import cookieParser from "cookie-parser"
dotenv.config()

const main = async () => {
	const app = express()
	app.use(cookieParser())
	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [HelloResolver, ProfileResolver],
			validate: false,
		}),
		context: ({ req, res }) => ({ req, res }),
	})
	await apolloServer.start()
	apolloServer.applyMiddleware({ app })
	app.use("/", routes)
	app.listen(8080, () => {
		console.log("MyFursona is Listening in port 8080")
	})
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})

export { prisma }
