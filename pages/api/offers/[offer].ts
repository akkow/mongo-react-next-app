import connect from "../../../lib/mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import { GetOfferService } from "../../../services/api/offer/GetOfferService";

export default async function Offer(req: NextApiRequest, res: NextApiResponse) {

    await connect()

    switch (req.method) {
        case "GET": {
            const offer = await GetOfferService(req?.query?.offer.toString())
            res.json(offer)
            break
        }
    }

    res.end()
}