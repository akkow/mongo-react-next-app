import connect from "../../../lib/mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import { GetOfferService } from "../../../services/api/offer/GetOfferService";
import { DeleteOfferService, PutOfferService } from "../../../services/api/offer";

export default async function Offer(req: NextApiRequest, res: NextApiResponse) {

    await connect()

    switch (req.method) {
        case "GET": {
            const offer = await GetOfferService(req?.query?.offer.toString())
            res.json(offer)
            break
        }
        case "DELETE": {
            const offer = await DeleteOfferService(req?.query?.offer.toString())
            res.json(offer);
            break;
        }
        case "PUT": {
            const offer = await PutOfferService(req.body)
            res.json(offer);
            break;
        }
    }
    res.end()
}