import type { NextApiRequest, NextApiResponse } from "next";
import connect from "../../../lib/mongoose";
import { GetUsersService, PostUserService } from "../../../services/api/user";

export default async function Users(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await connect()

    switch(req.method){
        case "POST": {
            PostUserService(req.body)
            break
        }
    }

    const users = await GetUsersService()
    res.json(users)
}