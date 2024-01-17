import { OfferDto } from "../../../dto/offer.dto";
import { Offer } from "../../../schemas/offer.schema";

export async function GetOffersService(): Promise<OfferDto[]> {
    const offers = await Offer.find({})
    return offers
}