import { NextApiRequest, NextApiResponse } from "next"
import dbConnect from "../../../utils/connectMongo"
import { FursonasModel } from "../../../models/Fursonas"
import { randomUUID } from "crypto"
import faker from "@faker-js/faker"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect()
  // Creates a new sona with dummy data
  const newFursona = await FursonasModel.create({
    fursonaUUID: "123456789",
    name: faker.name.firstName(),
    bio: "I give cuddles and stuffies",
    info: "I cuddled Vulpo last night... He is very, very floofy :3",
    artworksCDNLinks: [faker.image.avatar()]
  })
  res.send(newFursona)
}
