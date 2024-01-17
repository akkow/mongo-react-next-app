import type { NextApiRequest, NextApiResponse } from "next";
import connect from "../../../lib/mongoose"
import { GetUserService } from "../../../services/api/user/GetUserService";
import { PutUserService } from "../../../services/api/user";
import { DeleteSavedOfferService } from "../../../services/api/savedOffers";

export default async function User(req: NextApiRequest, res: NextApiResponse) {

    await connect()
    switch (req.method) {
        case "GET": {
            const users = await GetUserService(req?.query?.user.toString())
            res.json(users)
            break
        }
        case "PUT": {
            const user = await PutUserService(req.body)
            res.json(user)
            break
        }
    }

    res.end()
}