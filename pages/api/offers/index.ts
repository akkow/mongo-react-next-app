import type { NextApiRequest, NextApiResponse } from "next";
import connect from "../../../lib/mongoose";
import { GetOffersService, PostOfferService } from "../../../services/api/offer";

export default async function Offers(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await connect()

    switch(req.method){
        case "POST": {
            PostOfferService(req.body)
            break
        }
    }

    const offers = await GetOffersService()
    res.json(offers)
}