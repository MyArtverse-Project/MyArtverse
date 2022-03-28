import {NextApiRequest, NextApiResponse} from "next";
import {fetcher} from "../../../utils/fetcher";
import {useRouter} from "next/router";
import {FursonasModel} from "../../../models/Fursonas";
import faker from "@faker-js/faker";
import {randomUUID} from "crypto";
import {dbConnect} from "../../../utils/connectMongo";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();
    const fursonas = await FursonasModel.find({}).limit(10);
    res.status(200).send(fursonas);
    return;
}